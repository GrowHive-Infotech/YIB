from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List

# Initialize FastAPI app
app = FastAPI()

# Load the pre-trained embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

class ResumeMatchRequest(BaseModel):
    resume: str
    job_descriptions: List[str]

def get_embedding(text):
    """Convert text to an embedding vector."""
    return model.encode(text, convert_to_numpy=True)

def calculate_match_percent(resume_embedding, job_embedding):
    """Calculate the cosine similarity between two embeddings."""
    similarity = cosine_similarity([resume_embedding], [job_embedding])[0][0]
    return float(similarity * 100)  # Convert numpy.float32 to standard float

@app.post("/match-resume/")
async def match_resume_endpoint(request: ResumeMatchRequest):
    """Match a single resume against multiple job descriptions and return skill match percentages."""
    job_embeddings = [get_embedding(job) for job in request.job_descriptions]
    resume_embedding = get_embedding(request.resume)

    job_match_scores = []
    
    for job_embedding in job_embeddings:
        skill_match_percent = calculate_match_percent(resume_embedding, job_embedding)
        job_desc_percent = calculate_match_percent(job_embedding, resume_embedding)

        job_match_scores.append({
            "skill_match": round(skill_match_percent, 2),
            "job_desc_match": round(job_desc_percent, 2)
        })

    return {"matched_jobs": job_match_scores}

