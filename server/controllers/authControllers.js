const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();



let db = new sqlite3.Database('aspieByteGrad.db', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("database connected");
    }
})

let behaviordb = new sqlite3.Database('behavior.db', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("database connected");
    }
})

//getting the behavior questions
const levelOne = async (req, res) => {
    behaviordb.all('SELECT * FROM levelOne', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//getting the irritability dataset
const inattention = async (req, res) => {
    behaviordb.all('SELECT * FROM inattention', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//getting the irritability dataset
const depression = async (req, res) => {
    behaviordb.all('SELECT * FROM depression', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//getting the irritability dataset
const anxiety = async (req, res) => {
    behaviordb.all('SELECT * FROM anxiety', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//getting the irritability dataset
const anger = async (req, res) => {
    behaviordb.all('SELECT * FROM anger', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//getting the irritability dataset
const mania = async (req, res) => {
    behaviordb.all('SELECT * FROM mania', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//getting the irritability dataset
const irritability = async (req, res) => {
    behaviordb.all('SELECT * FROM irritability', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//saving behaviornType 
const saveBehavior = async (req, res) => {
    const { userID, behaviorType } = req.body;
  
    const query = 'INSERT INTO userBehavior (userID, behaviorType) VALUES (?, ?)';
    
    db.run(query, [userID, behaviorType], (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error saving behavior' });
      }
      res.json({ message: 'Behavior saved successfully' });
    });
  };
  
//getting video content
const video = async (req, res) => {
    db.all('SELECT * FROM videoContent', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

//registering the users
const registerUser = async (req, res, next) =>{
    try {
        const {firstName,lastName, gender, age, phoneNumber, email, password} = req.body; 
        
        if (!firstName || !lastName || !gender || !age || !phoneNumber || !email || !password) {
            return res.status(400).send('Please fill all the required fields');
        }

        
        // Check if email already exists
        const emailExists = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(row);
            });
        });

        if (emailExists) {
            return res.status(400).send('Email already exists');
        }

         //hashing the password i.e., creating extra layer of protection
        const hashedPassword = await hashPassword(password);

        // Insert user into the database
        await new Promise((resolve, reject) => {
            db.run(`INSERT INTO user (firstName, lastName, gender, age, phoneNumber, email, password) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`, [firstName, lastName, gender, age, phoneNumber, email, hashedPassword], function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                console.log(`A row has been inserted with id ${this.lastID}`);
                resolve();
            });
        });

        return res.status(200).send('User registered successfully');

    } catch (error) {
        console.log(error);
    }
}
//guardianSign Up
const registerGuardian = async (req, res) => {
    const { guardianFirstName, guardianLastName, typeOfKinship, gemail, password, userEmail } = req.body;
    
    try {
        // Fetch userID based on userEmail
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT userID FROM user WHERE email = ?', [userEmail], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userID = user.userID;
        const hashedPassword = await hashPassword(password);

        // Insert guardian data with userID into the guardianPortal table
        db.run('INSERT INTO guardianPortal (userID, gFirstname, gLastname, kinship, gEmail) VALUES (?, ?, ?, ?, ?)', 
                [userID, guardianFirstName, guardianLastName, typeOfKinship, gemail], 
                function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Error registering guardian' });
            }
            res.status(200).json({ message: 'Guardian registered successfully', userID }); 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error registering guardian' });
    }
};

//login for the users
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            // 400 Bad Request for missing email or password.
            return res.status(400).send('Please fill all the required fields');
        }
        
        // Query the database for the user with the provided email.
        db.get('SELECT userID, email, firstName, password FROM user WHERE email = ?', [email], async (err, user) => {
            if (err) {
                console.error(err);
                // 500 Internal Server Error for database errors.
                return res.status(500).send('Internal Server Error');
            }

            if (!user) {
                // 401 Unauthorized for incorrect email or password.
                return res.status(401).send('User email or password is incorrect');
            }
            
            // Compare the provided password with the stored one.
            const match = await comparePassword(password, user.password);
            if (!match) {
                // 401 Unauthorized for incorrect email or password.
                return res.status(401).send('User email or password is incorrect');
            }
            
            // Return user information without password.
            res.status(200).json({
                user: {
                    id: user.userID,
                    email: user.email,
                    firstName: user.firstName // Assuming firstName exists in the user table.
                }
            });
        });

    } catch (err) {
        console.error(err);
        // 500 Internal Server Error for unexpected errors.
        return res.status(500).send('Internal Server Error');
    }
};


//getting the courses
const courses = async (req, res) => {
    db.all('SELECT * FROM course', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}
// enrolled course
const getEnrolledCourses = async (req, res) => {
    const { userID } = req.params;
    
    const query = `
        SELECT e.progressBar, c.courseName , v.coverPath , e.courseID
        FROM enrollment e
        JOIN course c ON e.courseID = c.courseID
        JOIN cover v ON e.courseID = v.courseID
        WHERE e.userID = ?`;

    db.all(query, [userID], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.json(rows);
    });
};
 
//course details
const getCourseDetails = async (req, res) => {
    const { courseID } = req.params;
    
    const query = `
      SELECT c.courseName, p.progName, m.moduleName, m.moduleID, ct.contentName, ct.contentID, ct.contentType
      FROM course c
      JOIN program p ON c.courseID = p.courseID
      JOIN module m ON p.programID = m.programID
      JOIN content ct ON m.moduleID = ct.moduleID
      WHERE c.courseID = ?`;

    db.all(query, [courseID], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        
        if (rows.length === 0) {
            res.status(404).send('Course not found');
            return;
        }

        // Aggregate the query results into a structured format.
        const courseDetails = {
            courseName: rows[0].courseName,
            program: {
                progName: rows[0].progName,
                modules: []
            }
        };

        // Use a map to track unique modules and associate contents accordingly.
        const modulesMap = new Map();

        rows.forEach(row => {
            if (!modulesMap.has(row.moduleID)) {
                const newModule = {
                    moduleName: row.moduleName,
                    contents: []
                };
                modulesMap.set(row.moduleID, newModule);
                courseDetails.program.modules.push(newModule);
            }

            const module = modulesMap.get(row.moduleID);
            module.contents.push({
                contentID: row.contentID,
                contentName: row.contentName,
                contentType: row.contentType
            });
        });

        res.json(courseDetails);
    });
};

// video content
const getVideoContent = async (req, res) => {
    const { contentID } = req.params;
    console.log('Backend receiving request for contentID:', contentID);
    const query = `
        SELECT v.videoFile, s.scriptSource, v.videoName
        FROM videoContent v
        JOIN script s ON v.videoID = s.videoID
        WHERE v.contentID = ?`;
        
    db.get(query, [contentID], (err, row) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (!row) {
            return res.status(404).send('Content not found');
        }
        console.log(row);
        res.json(row);
    });
};


//getting course curriculum
const courseCurriculum = async (req, res) => {
    db.all('SELECT m.moduleName FROM module m JOIN program p ON m.programID = p.programID JOIN course c ON c.courseID = p.courseID WHERE c.courseID = 101', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    })
}

//getting course curriculum 2
const courseCurriculum2 = async (req, res) => {
    db.all('SELECT m.moduleName FROM module m JOIN program p ON m.programID = p.programID JOIN course c ON c.courseID = p.courseID WHERE c.courseID = 102', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    })
}

//getting the program name
const progamPage = async (req, res) => {
    db.all('SELECT * FROM program', (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(rows);
    });
}

module.exports = {
    registerUser,
    registerGuardian,
    loginUser,
    courses,
    getEnrolledCourses,
    getCourseDetails,
    getVideoContent,
    courseCurriculum,
    courseCurriculum2,
    progamPage,
    levelOne,
    inattention,
    mania,
    irritability,
    depression,
    anger,
    anxiety,
    video,
    saveBehavior
}