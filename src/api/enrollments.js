import express from "express";
import Service from "../services";
const router = express.Router();

router.post('/enrollments', async (req, res) => {
    try {
        if (req.body.studentName === undefined) {
            await req.con.close();
            res.status(400).json({ success: false });
        } else if (await Service.Enrollment.validate_enrollment(req.con, req.body.studentName, req.body.courseId)) {
            if (await Service.Enrollment.enroll_student({ con: req.con, studentName: req.body.studentName, courseId: req.body.courseId })) {
                await req.con.close();
                res.json({ success: true });
            } else {
                await req.con.close();
                res.status(400).json({ success: false });
            }
        } else {
            await req.con.close();
            res.status(400).json({ success: false });
        }
    } catch (err) {
        await req.con.close();
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;