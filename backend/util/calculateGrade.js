module.exports =  calculateGrade = (score, totalMarks) =>{
  const percentage = (score / totalMarks) * 100;

  // Determine grade based on percentage
  if (percentage >= 91) return "A+";
  if (percentage >= 81) return "A";
  if (percentage >= 71) return "B+";
  if (percentage >= 61) return "B";
  if (percentage >= 51) return "C+";
  if (percentage >= 41) return "C";
  if (percentage >= 31) return "D";
  if (percentage >= 21) return "F";
  return "F";

  }
  