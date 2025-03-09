from fastapi import FastAPI
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

@app.post("/match-resume/")
async def match_resume_endpoint(request: JobMatchRequest):
    """Match a resume + skills against job descriptions + required skills."""

    # Prepare candidate profile embedding
    combined_resume_text = request.resume.strip() + " " + " ".join([skill.strip() for skill in request.skills.split(",")])
    resume_embedding = get_embedding(combined_resume_text)

    job_match_scores = []

    for job in request.jobs:
        # Prepare job description embedding
        job_text = job.description.strip() + " " + " ".join([skill.strip() for skill in job.skills.split(",")])
        job_embedding = get_embedding(job_text)

        # Calculate skill match and job description match
        skill_match_percent = calculate_match_percent(resume_embedding, job_embedding)
        job_desc_match_percent = calculate_match_percent(job_embedding, resume_embedding)

        # Append match scores to the list
        job_match_scores.append({
            "job_title": job.job_title,
            "company_name": job.company_name,
            "skill_match": round(skill_match_percent, 2),
            "job_desc_match": round(job_desc_match_percent, 2)
        })

    return {"matched_jobs": job_match_scores}
