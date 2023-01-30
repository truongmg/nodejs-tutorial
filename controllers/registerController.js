const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({
        'message': 'user and password are required'
    });

    // check for duplicate username in db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict

    try {
        // encrypt password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // store the new user
        const newUser = {
            "username": user,
            "roles": { "User": 2001 },
            "password": hashedPwd
        };
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        res.status(201).json({ 'message': `New user ${user} created` });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = { handleNewUser };