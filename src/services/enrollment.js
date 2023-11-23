import mongoose from "mongoose";
import Model from "../models"
import Service from "../services";

export default class Enrollment {
    static async enroll_student({ con, studentName, courseId }) {
        try {
            const Enrollment = Model.Enrollment.getModel(con);
            const res = await Enrollment.create({ studentName: studentName, courseId: new mongoose.Types.ObjectId(courseId), enrollmentDate: Date.now() });
            // console.log(res);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    static async validate_enrollment(con, studentName, courseId) {
        try {
            if (!studentName) return false;
            const course = await Service.Course.get_course_by_id(con, courseId);
            if (course) return true;
            else return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}