import jwt from 'jsonwebtoken';

const User = require("../../models/user");

async function generateJWT(phoneNumber) {
    try {
        let user = await User.findOne({ phoneNumber });
        let isNewUser = false;

        if (!user) {
            isNewUser = true;
            user = new User({
                phoneNumber,
                isVerified: true,
            });
        }

        const user_payload = {
            _id: user._id,
            phoneNumber: user.phoneNumber,
            isNewUser
        };

        const token = jwt.sign(user_payload, process.env.SECRET_KEY, { expiresIn: '1h' });

        user.tokens.push({ token });
        await user.save();

        const updatedUser = await User.findById(user._id);

        const latestToken = updatedUser.tokens[updatedUser.tokens.length - 1].token;

        return { token: latestToken, user: updatedUser, isNewUser };
    } catch (error) {
        console.error("Error generating JWT:", error);
        throw error;
    }
}

export default generateJWT;