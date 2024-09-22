const Message = require("../../models/message");

import getPayloadFromToken from './getPayloadFromToken';

async function getConversation(jwt) {
    try {
        const payload = getPayloadFromToken(jwt);

        let page = 1;
        let limit = 20;

        const conversation = await Message.find({ user: payload._id })
            .sort('-timestamp')
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('user', 'username');

        conversation.length = limit;

        return conversation.reverse();
    } catch (error) {
        console.log(error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
    }
}

export default getConversation;

//66ef967b76797cc0e2bd991f