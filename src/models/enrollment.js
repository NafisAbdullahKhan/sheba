import mongoose from "mongoose";
import Course from "./course";

export default class Enrollment extends mongoose.Model {
    static modelName = "enrollments";
    static schema = new mongoose.Schema({
        studentName: String,
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: Course.modelName },
        enrollmentDate: Date
    });
    static getModel(con) {
        return con.model(this.modelName, this.schema);
    }
}