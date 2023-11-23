import mongoose from "mongoose";

export default class Course {
    static modelName = "courses";
    static schema = new mongoose.Schema({
        title: String,
        description: String,
        instructor: String,
        duration: Number,
        price: Number
    });
    static getModel(con) {
        return con.model(this.modelName, this.schema);
    }
}