import User from '../../models/user';
import Message from '../../models/message';

import getPayloadFromToken from './getPayloadFromToken';

async function saveMessage(msg) {
    try {
        const {
            jwt,
            userPhoneNumber,
            message,
            isUser,
            timestamp,
            isLoggedIn,
            isAdmin
        } = msg;

        let newMessage;

        if (isAdmin) {

        } else {
            const payload = getPayloadFromToken(jwt);

            const validUser = await User.findOne({ _id: payload._id });

            newMessage = new Message({
                user: validUser._id,
                content: message,
                userPhoneNumber: userPhoneNumber,
                isLoggedIn: isLoggedIn,
                isUser: isUser,
                timestamp: timestamp,
                isAdmin: !isUser
            });

            await newMessage.save();

            console.log(newMessage)
        }  
    } catch (error) {
        console.log(error);
    }
}

export default saveMessage;