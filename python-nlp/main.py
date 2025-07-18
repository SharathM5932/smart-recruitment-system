from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import CrossEncoder

app = FastAPI()
model = CrossEncoder("cross-encoder/stsb-roberta-base")

class QuestionsRequest(BaseModel):
    questions: list[str]

def normalize(text: str) -> str:
    return ' '.join(text.lower().strip().split())

@app.post("/deduplicate")
def deduplicate_questions(request: QuestionsRequest):
    questions = request.questions
    unique_questions = []

    for q in questions:
        q_norm = normalize(q)
        is_duplicate = False
        for uq in unique_questions:
            uq_norm = normalize(uq)
            score = model.predict([(q_norm, uq_norm)])[0]
            print(f"Comparing: '{q}' vs '{uq}' => Score: {score}")
            if score > 0.65:
                is_duplicate = True
                break
        if not is_duplicate:
            unique_questions.append(q)

    return {"unique_questions": unique_questions}
