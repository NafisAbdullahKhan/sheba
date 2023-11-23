import express from "express";
import Service from "../services";
const router = express.Router();

router.get('/courses', async (req, res) => {
    try {
        const courses = await Service.Course.get_courses(req.con);
        // console.log(courses);
        await req.con.close();
        if (courses) res.json({ success: true, courses });
        else res.status(404).json({ success: false });
    } catch (err) {
        await req.con.close();
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.get('/courses/:id', async (req, res) => {
    try {
        const course = await Service.Course.get_course_by_id(req.con, req.params.id);
        await req.con.close();
        if (course) res.json({ success: true, course });
        else res.status(404).json({ success: false });
    } catch (err) {
        await req.con.close();
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

router.post('/courses', async (req, res) => {
    try {
        if (req.body.title === undefined) {
            await req.con.close();
            res.status(400).json({ success: false });
        } else if (await Service.Course.create_course({ con: req.con, title: req.body.title, description: req.body.description, instructor: req.body.instructor, duration: req.body.duration, price: req.body.price })) {
            await req.con.close();
            res.json({ success: true });
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