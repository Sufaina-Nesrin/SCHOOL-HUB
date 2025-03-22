from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import pickle

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific frontend domain(s) for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example grade mappings (replace with actual mappings)
grade_mapping = {
    'A+': 8, 'A': 7, 'B+': 6, 'B': 5,
    'C+': 4, 'C': 3, 'D+': 2, 'D': 1, 'F': 0,
}
reverse_grade_mapping = {v: k for k, v in grade_mapping.items()}

# Load the trained model
try:
    with open("model0.pkl", "rb") as pickle_in:
        model = pickle.load(pickle_in)
except FileNotFoundError:
    print("Error: Model file 'model0.pkl' not found.")
    model = None  # Set model to None to avoid errors

# Input schema for request validation
class Exam(BaseModel):
    Exam1: list[str]
    Exam2: list[str]

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/predict")
def predict_mark(data: Exam):
    data_dict = data.dict()  # Convert Pydantic model to dictionary
    print("Received data:", data_dict)

    try:
        # Convert grades to numerical values
        G1 = [grade_mapping[g] for g in data_dict["Exam1"]]
        G2 = [grade_mapping[g] for g in data_dict["Exam2"]]

        # Compute the average
        avg = [(e1 + e2) / 2 for e1, e2 in zip(G1, G2)]

        # Create DataFrame
        test_data = pd.DataFrame({
            "G1": G1,
            "G2": G2,
            "avg": avg
        })

        print("\nDataFrame representation of input:\n", test_data)

        # Ensure model is loaded
        if model is None:
            return JSONResponse(content={"error": "Model not loaded. Check 'model0.pkl' file."}, status_code=500)

        # Predict grades using the model
        new_predictions = model.predict(test_data)

        # Round predictions and clamp between 0 and 8
        new_predictions_rounded = np.round(new_predictions).astype(int)
        new_predictions_clamped = np.clip(new_predictions_rounded, 0, 8)

        # Decode predictions back to grades
        new_predictions_grades = [reverse_grade_mapping[g] for g in new_predictions_clamped]

        # Add predicted grades to the DataFrame
        test_data['PredictedGrades'] = new_predictions_grades

        print("\nPredictions with grades:\n", test_data)

        # Return predictions as JSON
        return JSONResponse(content={"success": True, "data": test_data.to_dict(orient="records")})

    except KeyError as e:
        return JSONResponse(content={"error": f"Invalid grade input: {str(e)}"}, status_code=400)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
#  uvicorn app:app --reload 