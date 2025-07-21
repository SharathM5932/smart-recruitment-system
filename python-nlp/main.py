from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util
import re
from typing import List, Dict

app = FastAPI()
model = SentenceTransformer("BAAI/bge-small-en-v1.5")  

class QuestionsRequest(BaseModel):
    questions: List[str]

def normalize(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^\w\s]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def classify_intent(text: str) -> str:
    text = text.lower()
    if any(kw in text for kw in ["who uses", "used by", "commonly used", "user of", "audience"]):
        return "audience"
    elif any(text.startswith(kw) for kw in ["why", "what's the reason", "reason for", "purpose of", "benefit of"]) or "importance" in text or "need" in text:
        return "purpose"
    elif any(text.startswith(kw) for kw in ["define", "what is", "what's", "explain", "meaning of"]):
        return "definition"
    elif any(kw in text for kw in ["how to", "how can i", "write a function", "code to", "program to", "script to", "method to"]):
        return "implementation"
    elif any(kw in text for kw in ["result", "output", "calculate", "compute", "plus", "+", "sum", "evaluate"]):
        return "computation"
    elif any(kw in text for kw in ["train", "speed", "platform", "km", "meter", "length", "time", "distance"]):
        return "time-distance"
    else:
        return "other"

def contains_different_numbers(s1: str, s2: str) -> bool:
    nums1 = re.findall(r"\d+", s1)
    nums2 = re.findall(r"\d+", s2)
    return nums1 != nums2

@app.post("/deduplicate")
def deduplicate_questions(request: QuestionsRequest):
    raw_questions = request.questions
    questions = [normalize(q) for q in raw_questions]
    embeddings = model.encode(questions, convert_to_tensor=True)

    seen = set()
    clusters = []
    unique_questions = []
    intent_clusters: Dict[str, List[List[str]]] = {}
    threshold = 0.7

    for i in range(len(questions)):
        if i in seen:
            continue

        cluster = [raw_questions[i]]
        seen.add(i)
        intent_i = classify_intent(questions[i])

        for j in range(i + 1, len(questions)):
            if j in seen:
                continue

            sim = util.cos_sim(embeddings[i], embeddings[j]).item()
            intent_j = classify_intent(questions[j])

            if (
                sim >= threshold
                and intent_i == intent_j
                and not contains_different_numbers(raw_questions[i], raw_questions[j])
            ):
                cluster.append(raw_questions[j])
                seen.add(j)

        clusters.append(cluster)
        unique_questions.append(cluster[0])

        if intent_i not in intent_clusters:
            intent_clusters[intent_i] = []
        intent_clusters[intent_i].append(cluster)

    return {
        "clusters": clusters,
        "unique_questions": unique_questions,
        "intent_clusters": intent_clusters,
        "message": f"{len(raw_questions) - len(unique_questions)} duplicates removed",
        "threshold": threshold
    }
