# sheba
Online Learning Platform

Docker commands:
    For development environment: $env:ENV="development";docker-compose up
    For production environment: $env:ENV="production";docker-compose up

For testing environment:
    docker-compose up -d mongo
    $env:ENV="test";docker-compose up web

Webpack commands:
    For development environment with file change watching: yarn webpack:dev
    For production environment with file change watching: yarn webpack:prod
    For production build: yarn build

System requirements:

    NodeJS 20.x LTS
    Yarn 1.x (Optional)
    Docker (latest)

How to run and test:

    open two shell windows. On one, run: yarn webpack:dev
    On another shell, run:
        docker-compose up -d mongo
        $env:ENV="test";docker-compose up web (For PowerShell)
            or
        ENV="test";docker-compose up web (Other shells)

    after a while, all the tests will run and show up on the second shell.

API documentation:

    POST /courses
        - Inputs
            {
                title: String,
                description: String,
                instructor: String,
                duration: Integer,
                price: Float
            }
        - Response
            { success: Boolean }
        - Purpose: Creates a new course

    GET /courses
        - Inputs
            None
        - Response
            { success: Boolean, courses: [Object] }
        - Purpose: Gets all the courses

    GET /courses/:id
        - Inputs
            None
        - Response
            { success: Boolean, course: Object }
        - Purpose: Gets a course by id

    POST /enrollments
        - Inputs
            {
                studentName: String,
                courseId: String
            }
        - Response
            { success: Boolean }
        - Purpose: Enrolls a student in a course