from pydantic import BaseModel

class Exam(BaseModel):
    G1: list[str]
    G2: list[str]