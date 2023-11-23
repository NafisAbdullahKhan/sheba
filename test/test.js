import mongoose from "mongoose";
import chai, { assert, expect } from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";
import Model from "../src/models";
import Service from "../src/services";
let should = chai.should();

chai.use(chaiHttp);

let testCourseId = null;

describe('API tests', () => {

    before(async () => { //Before starting test we empty the database
        const dburl = "mongodb://test:test@mongo:27017/sheba?authSource=admin";
        const con = await mongoose.createConnection(dburl).asPromise();
        const Course = Model.Course.getModel(con);
        const Enrollment = Model.Enrollment.getModel(con);
        await Course.deleteMany({});
        await Enrollment.deleteMany({});
        await con.close();
    });

    describe('POST /courses', () => {
        it('it should create a new course', (done) => {
            chai.request(server)
                .post('/courses')
                .send({
                    title: "Course 1",
                    description: "Course description",
                    instructor: "Instructor name",
                    duration: 60,
                    price: 9.99
                })
                .end((err, res) => {
                    if (err) err.should.be.null;
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.success.should.be.eql(true);
                    done();
                });
        });
    });

    describe('GET /courses', () => {
        it('it should GET all the courses', (done) => {
            chai.request(server)
                .get('/courses')
                .end((err, res) => {
                    if (err) err.should.be.null;
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.success.should.be.eql(true);
                    testCourseId = res.body.courses[0]._id;
                    //res.body.courses.length.should.be.gt(0);
                    done();
                });
        });
    });

    describe('GET /courses/:id', () => {
        it('it should GET a course by id', (done) => {
            chai.request(server)
                .get(`/courses/${testCourseId}`)
                .end((err, res) => {
                    if (err) err.should.be.null;
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.success.should.be.eql(true);
                    res.body.course._id.should.be.eql(testCourseId);
                    done();
                });
        });
    });

    describe('POST /enrollments', () => {
        it('it should enroll a student in a course', (done) => {
            chai.request(server)
                .post('/enrollments')
                .send({
                    studentName: "Student 1",
                    courseId: testCourseId
                })
                .end((err, res) => {
                    if (err) err.should.be.null;
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.success.should.be.eql(true);
                    done();
                });
        });
    });
});

describe('Service tests', () => {
    let con = null;
    (async () => {
        const dburl = "mongodb://test:test@mongo:27017/sheba?authSource=admin";
        con = await mongoose.createConnection(dburl).asPromise();
    })();
    // const Course = Model.Course.getModel(con);
    // const Enrollment = Model.Enrollment.getModel(con);
    describe('create_course', () => {
        it('it should create a new course', async () => {
            const created = await Service.Course.create_course({ con: con, title: "Course 2", description: "Description", instructor: "Instructor", duration: 180, price: 5.99 })
            created.should.be.eql(true);
        });
    });

    describe('validate_enrollment', () => {
        it('it should validate an enrollment request before enrollment', async () => {
            const result = await Service.Enrollment.validate_enrollment(con, "Student 2", testCourseId)
            result.should.be.eql(true);
        });
    });

    describe('enroll_student', () => {
        it('it should enroll a student in a course', async () => {
            const enrolled = await Service.Enrollment.enroll_student({ con: con, studentName: "Student 2", courseId: testCourseId })
            enrolled.should.be.eql(true);
        });
    });
});