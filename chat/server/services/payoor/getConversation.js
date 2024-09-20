const Message = require("../../models/message");

import getPayloadFromToken from './getPayloadFromToken';

async function getConversation(jwt) {
    try {
        const payload = getPayloadFromToken(jwt);

        let page = 1;
        let limit = 20;

        const conversation = await Message.find({ user: payload._id }).sort('-timestamp')
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('user', 'username');

        //console.log('conversation get:', conversation, 'conversation get:')
        return conversation;
    } catch (error) {
        console.log(error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
    }
}

export default getConversation;