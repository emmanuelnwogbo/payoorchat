import User from '../../models/user';
import Message from '../../models/message';

function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
        return '+234' + phoneNumber.slice(1);
    } else if (phoneNumber.startsWith('+234')) {
        return phoneNumber;
    } else {
        return '+234' + phoneNumber;
    }
}

async function saveMessage(msg) {
    try {
        const {
            jwt,
            userPhoneNumber,
            message,
            isSender,
            timestamp,
            isLoggedIn
        } = msg;

        const userItem = await User.findOne({ phoneNumber: formatPhoneNumber(userPhoneNumber) });

        if (userItem) {
            const specificToken = userItem.getToken(jwt);

            if (specificToken) {
                const newMsg = new Message({
                    message,
                    userPhoneNumber,
                    isSender,
                    timestamp,
                    isLoggedIn,
                });

                await newMsg.save();
            }
        } else {
            console.log('User not found.');
        }
    } catch (error) {
        console, log(error);
    }
}

export default saveMessage;