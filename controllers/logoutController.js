const User = require("../model/User");

const handleLogout = async (req, res) => {
    // on client, also delete accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    const result = foundUser.save();
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'});
    res.sendStatus(204);
}

module.exports = { handleLogout };