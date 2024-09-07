import User from '../../models/user';

import getPayloadFromToken from './getPayloadFromToken';

async function getValidUser(jwt) {
    try {
        const payload = getPayloadFromToken(jwt);

        const validUser = await User.findOne({ _id: payload._id });

        //console.log(validUser);
        return validUser;
    } catch (error) {
        console.log(error)
    }
}

export default getValidUser;