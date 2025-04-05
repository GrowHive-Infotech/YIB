import azure.functions as func
import logging
import json
from pydantic import BaseModel, ValidationError
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List

# Load model globally
model = SentenceTransformer('all-MiniLM-L6-v2')

class JobDescription(BaseModel):
    description: str
    skills: str
    job_title: str
    company_name: str
    job_url: str

class JobMatchRequest(BaseModel):
    resume: str
    skills: str
    jobs: List[JobDescription]

def get_embedding(text: str):
    return model.encode(text, convert_to_numpy=True)

def calculate_match_percent(embedding1, embedding2):
    similarity = cosine_similarity([embedding1], [embedding2])[0][0]
    return float(similarity * 100)

def normalize_skills(skills: str):
    return [skill.strip().lower() for skill in skills.split(",")]

def calculate_skill_match(resume_skills: str, job_skills: str):
    resume_skill_list = normalize_skills(resume_skills)
    job_skill_list = normalize_skills(job_skills)
    overlap = set(resume_skill_list).intersection(set(job_skill_list))
    skill_match_percent = (len(overlap) / len(job_skill_list)) * 100
    return round(skill_match_percent, 2)

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        req_body = req.get_json()
        data = JobMatchRequest(**req_body)

        resume_embedding = get_embedding(data.resume.strip())
        job_match_scores = []

        for job in data.jobs:
            if not job.description or not job.skills:
                continue

            skill_match_percent = calculate_skill_match(data.skills, job.skills)
            job_desc_embedding = get_embedding(job.description.strip())
            job_desc_match_percent = calculate_match_percent(resume_embedding, job_desc_embedding)

            job_match_scores.append({
                "job_title": job.job_title,
                "company_name": job.company_name,
                "job_url": job.job_url,
                "skill_match": skill_match_percent,
                "job_desc_match": round(job_desc_match_percent, 2)
            })

        job_match_scores.sort(key=lambda x: x["skill_match"], reverse=True)

        return func.HttpResponse(
            json.dumps({"matched_jobs": job_match_scores}),
            status_code=200,
            mimetype="application/json"
        )

    except ValidationError as ve:
        return func.HttpResponse(f"Invalid input: {ve}", status_code=400)
    except Exception as e:
        logging.exception("Error processing request")
        return func.HttpResponse(f"Error: {str(e)}", status_code=500)
