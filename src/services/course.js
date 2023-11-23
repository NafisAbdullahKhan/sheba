import Model from "../models"

export default class Course {
    static async get_courses(con) {
        try {
            const Course = Model.Course.getModel(con);
            return await Course.find({});
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async create_course({ con, title, description, instructor, duration, price }) {
        try {
            const Course = Model.Course.getModel(con);
            const res = await Course.create({ title: title, description: description, instructor: instructor, duration: duration, price: price });
            // console.log(res);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    static async get_course_by_id(con, id) {
        try {
            const Course = Model.Course.getModel(con);
            return await Course.findById(id);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static filter_courses() {

    }
}