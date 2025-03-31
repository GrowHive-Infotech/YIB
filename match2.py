from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Optional

app = FastAPI()

# Load the pre-trained embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

class JobDescription(BaseModel):
    description: str
    skills: str  # Space-separated skills
    job_title: str
    company_name: str
    job_url: str  # New field added

class JobMatchRequest(BaseModel):
    resume: Optional[str] = None  # Now optional
    skills: str  # Space-separated skills
    jobs: List[JobDescription]

def get_embedding(text: str):
    """Convert text to an embedding vector."""
    return model.encode(text, convert_to_numpy=True)

def calculate_match_percent(embedding1, embedding2):
    """Calculate the cosine similarity between two embeddings."""
    similarity = cosine_similarity([embedding1], [embedding2])[0][0]
    return float(similarity * 100)

def normalize_skills(skills: str):
    """Normalize space-separated skills by splitting and cleaning."""
    return [skill.strip().lower() for skill in skills.split() if skill.strip()]

def calculate_skill_match(candidate_skills: str, job_skills: str):
    """Calculate skill match percentage."""
    candidate_skills_list = normalize_skills(candidate_skills)
    job_skills_list = normalize_skills(job_skills)
    
    if not job_skills_list:
        return 0.0
    
    overlap = set(candidate_skills_list) & set(job_skills_list)
    return round((len(overlap) / len(job_skills_list)) * 100, 2)

@app.post("/match-resume/")
async def match_resume_endpoint(request: JobMatchRequest):
    """Match skills against job descriptions."""
    
    if not request.skills or not request.jobs:
        raise HTTPException(status_code=400, detail="Skills and jobs fields cannot be empty.")

    job_match_scores = []
    resume_embedding = get_embedding(request.resume.strip()) if request.resume else None

    for job in request.jobs:
        if not job.skills:
            continue

        # Calculate skill match (always done)
        skill_match_percent = calculate_skill_match(request.skills, job.skills)

        # Calculate description match only if resume exists
        job_desc_match_percent = 0.0
        if request.resume and job.description:
            job_desc_embedding = get_embedding(job.description.strip())
            if resume_embedding is not None:
                job_desc_match_percent = calculate_match_percent(resume_embedding, job_desc_embedding)

        job_match_scores.append({
            "job_title": job.job_title,
            "company_name": job.company_name,
            "job_url": job.job_url,  # New field added to response
            "skill_match": skill_match_percent,
            "job_desc_match": round(job_desc_match_percent, 2)
        })

    # Sort by skill match first, then description match
    job_match_scores.sort(key=lambda x: (-x["skill_match"], -x["job_desc_match"]))
    
    return {"matched_jobs": job_match_scores}