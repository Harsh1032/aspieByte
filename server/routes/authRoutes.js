const express = require('express');
const cors = require('cors');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const {registerUser,registerGuardian, loginUser, courses, getEnrolledCourses,getCourseDetails,getVideoContent,courseCurriculum, courseCurriculum2, progamPage, levelOne,
    inattention,
    mania,
    irritability,
    depression,
    anger,
    anxiety,
    video,saveBehavior} = require('../controllers/authControllers');

//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

// Define an API endpoint to fetch inattention data
router.get('/inattention', inattention);

// Define an API endpoint to fetch mania data
router.get('/mania', mania);

// Define an API endpoint to fetch irritability data
router.get('/irritability', irritability);

// Define an API endpoint to fetch depression data
router.get('/depression', depression);

// Define an API endpoint to fetch anger data
router.get('/anger', anger);

// Define an API endpoint to fetch anxiety data
router.get('/anxiety', anxiety);

// Define an API endpoint to fetch MCQ data
router.get('/levelone', levelOne);

// API endpoint to fetch courses
router.get('/courses', courses);

// API endpoint to fetch program details
router.get('/program', progamPage);

// API endpoint to fetch curriculum
router.get('/courseCurriculum', courseCurriculum);

// API endpoint to fetch curriculum
router.get('/courseCurriculum2', courseCurriculum2);

//signup route
router.post('/signUp', registerUser);

//guardian Sign Up
router.post('/guardianSignUp', registerGuardian);

//login route
router.post('/login', loginUser);

//behavior type
router.post('/saveBehavior', saveBehavior);

//get enrollment course
router.get('/getEnrolledCourses/:userID', getEnrolledCourses);

//get course detail
router.get('/courseDetails/:courseID', getCourseDetails);

//get video content
router.get('/getVideoContent/:contentID', getVideoContent);


module.exports = router;