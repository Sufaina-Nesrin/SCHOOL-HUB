const Attendance = require('../../../model/attendance');

module.exports = async(req, res)=> {
    const classId = req.params.id;

    try {
        // Get today's date in UTC
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        // Get tomorrow’s date to filter within a range
        const tomorrow = new Date(today);
        tomorrow.setUTCDate(today.getUTCDate() + 1);

        // Query to find attendance records for today
        const attendanceRecords = await Attendance.find({
            "records.date": { $gte: today, $lt: tomorrow } // Filter by today's date
        }).populate({
            path: 'studentId', // Populate student details
            match: { class: classId } // Filter by class
        });

        // Filter out null students (those who do not belong to the class)
        const filteredAttendance = attendanceRecords.filter(record => record.studentId !== null);

        console.log("Today's Attendance for Class:", filteredAttendance);
        return res.status(200).json({success: true, data: filteredAttendance});
    } catch (error) {
        console.error("Error fetching attendance:", error);
    }
}