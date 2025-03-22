from pydantic import BaseModel

class Exam(BaseModel):
    Exam1: list[str]
    Exam2: list[str]

