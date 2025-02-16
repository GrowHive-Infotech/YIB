from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np

app = FastAPI()

class ResumeRequest(BaseModel):
    resumes: List[str]
    job_description: str

class RankedResume(BaseModel):
    resume: str
    skill_match: float
    job_desc_match: float

@app.post("/rank-resumes/")
async def rank_resumes(request: ResumeRequest):
    resumes = request.resumes
    job_description = request.job_description

    if not resumes or not job_description:
        raise HTTPException(status_code=400, detail="Resumes and job description cannot be empty")

    resume_scores = []

    for resume in resumes:
        # Dummy similarity calculations (Replace with actual NLP/ML-based scoring)
        skill_match_percent = np.random.uniform(0, 100)  # Fake score between 0-100
        job_desc_match_percent = np.random.uniform(0, 100)  # Fake score between 0-100

        # Ensure percentages don't exceed 100
        skill_match_percent = min(max(skill_match_percent, 0), 100)
        job_desc_match_percent = min(max(job_desc_match_percent, 0), 100)

        resume_scores.append({
            "resume": resume,
            "skill_match": round(float(skill_match_percent), 2),  # Convert numpy.float32 to float
            "job_desc_match": round(float(job_desc_match_percent), 2)
        })

    return {"ranked_resumes": resume_scores}
