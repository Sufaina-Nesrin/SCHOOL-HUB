import React, { useEffect, useState } from "react";
import "./AddMark.css";
import { GetMarksOfSingSub, MarkScore, UpdateMarks } from "../../../Actions/handlers/teacherHandler";
import { useLoader } from "../../../utils/context/LoaderContext";

function AddMarkCom({ student, classData, examData, subjectId }) {
  const { showLoader, hideLoader } = useLoader();
  const [mark, setMark] = useState("");
  const [exist, setExist] = useState(0);

  const handleChange = (e) => {
    setMark(e.target.value);
  };

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const data = {
          classId: classData._id,
          examId: examData._id,
          subjectId,
          studentId: student._id,
        };
        const res = await GetMarksOfSingSub(data);

        if (res && res.length > 0) {
          setMark(res[0].score);
          setExist(1);
          console.log("Fetched marks:", res[0].score);
        } else {
          setExist(0);
          console.log("No marks found");
        }
      } catch (error) {
        console.error("Error fetching marks:", error);
      }
    };

    fetchMarks();
  }, [exist]);

  const handleAdd = async () => {
    showLoader();
    try {
      const res = await MarkScore({
        studentId: student._id,
        classId: classData._id,
        score: mark,
        subjectId,
        examId: examData._id,
      });
      console.log(res);
      setExist(1)
    } catch (error) {
      console.error("Error adding marks:", error);
    } finally {
      hideLoader();
    }
  };

  const handleEdit = async () => {
    showLoader();
    try {
      const data = {
        studentId: student._id,
        score: mark,
        subjectId,
        examId: examData._id,
      };
      const res = await UpdateMarks(data);
      console.log(res);
    } catch (error) {
      console.error("Error editing marks:", error);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="add-mark-com" style={{ display: "flex" }}>
      <td>{student.name}</td>
      <td>
        <input
          className="add-mark-input"
          type="number"
          min={0}
          max={examData?.mark}
          value={mark}
          onChange={handleChange}
        />
      </td>
      <td>
        {!exist ? (
          <button className="button-add-mark" id="add-button-add-mark" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <button className="button-add-mark" id="edit-button-add-mark" onClick={handleEdit}>
            Edit
          </button>
        )}
      </td>
    </div>
  );
}

export default AddMarkCom;
