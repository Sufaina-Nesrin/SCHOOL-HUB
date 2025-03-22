import React from 'react';
import './Table.css';

function Table({attendence}) {
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
      };

      const sortedAttendence = [...attendence].sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <div style={{ borderRadius: '7px', overflow: 'hidden', border: '1px solid #ddd' }}>
            <table border='1' style={{ width: '100%', textAlign: 'center', borderCollapse: 'separate', borderSpacing: '0' }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Day</th>
                        <th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAttendence.map((att, index)=>(
                        <tr>
                        <td>{index+1}</td>
                        <td>{formatDate(att.date)}</td>
                        <td>{att.present?"Present": "Absent"}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    );
}

export default Table;
