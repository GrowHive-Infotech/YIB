from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List

# Initialize FastAPI app
app = FastAPI()

# Load the pre-trained embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Define JobDescription model
class JobDescription(BaseModel):
    description: str
    skills: str  # Comma-separated skills
    job_title: str
    company_name: str
    job_url: str  # New field for job URL

# Define JobMatchRequest model
class JobMatchRequest(BaseModel):
    resume: str
    skills: str  # Comma-separated skills
    jobs: List[JobDescription]

def get_embedding(text: str):
    """Convert text to an embedding vector."""
    return model.encode(text, convert_to_numpy=True)

def calculate_match_percent(embedding1, embedding2):
    """Calculate the cosine similarity between two embeddings."""
    similarity = cosine_similarity([embedding1], [embedding2])[0][0]
    return float(similarity * 100)  # Convert numpy.float32 to standard float

def normalize_skills(skills: str):
    """Normalize skills by splitting, trimming, and converting to lowercase."""
    return [skill.strip().lower() for skill in skills.split(",")]

def calculate_skill_match(resume_skills: str, job_skills: str):
    """Calculate how much of the job's required skills are present in the resume."""
    # Normalize skills
    resume_skill_list = normalize_skills(resume_skills)
    job_skill_list = normalize_skills(job_skills)

    # Calculate overlap
    overlap = set(resume_skill_list).intersection(set(job_skill_list))
    skill_match_percent = (len(overlap) / len(job_skill_list)) * 100
    return round(skill_match_percent, 2)

@app.post("/match-resume/")
async def match_resume_endpoint(request: JobMatchRequest):
    """Match a resume + skills against job descriptions + required skills."""

    if not request.resume or not request.skills or not request.jobs:
        raise HTTPException(status_code=400, detail="Input fields cannot be empty.")

    # Prepare resume embedding for description matching
    resume_embedding = get_embedding(request.resume.strip())

    job_match_scores = []

    for job in request.jobs:
        if not job.description or not job.skills:
            continue  # Skip invalid job entries

        # Calculate skill match
        skill_match_percent = calculate_skill_match(request.skills, job.skills)

        # Calculate job description match
        job_desc_embedding = get_embedding(job.description.strip())
        job_desc_match_percent = calculate_match_percent(resume_embedding, job_desc_embedding)

        # Append match scores to the list
        job_match_scores.append({
            "job_title": job.job_title,
            "company_name": job.company_name,
            "job_url": job.job_url,  # Include job URL in response
            "skill_match": skill_match_percent,
            "job_desc_match": round(job_desc_match_percent, 2)
        })

    # Sort jobs by skill match percentage in descending order
    job_match_scores.sort(key=lambda x: x["skill_match"], reverse=True)

    return {"matched_jobs": job_match_scores}