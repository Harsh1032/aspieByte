const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err){
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}


const comparePassword = async (providedPassword, storedPassword) => {
    return bcrypt.compare(providedPassword, storedPassword);
};
module.exports = {
    hashPassword,
    comparePassword
}