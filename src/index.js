import express from "express";
import mongoose from "mongoose";
import courses from "./api/courses";
import enrollments from "./api/enrollments";


const app = express()
const port = process.env.PORT || 8000

app.use(async (req, res, next) => {
    try {
        const dburl = "mongodb://test:test@mongo:27017/sheba?authSource=admin";
        req.con = await mongoose.createConnection(dburl).asPromise();
        if (!req.con) throw new Error("Couldn't connect db");
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use("/", courses);
app.use("/", enrollments);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

export default server;