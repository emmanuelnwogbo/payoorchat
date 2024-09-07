const User = require("../../models/user");

import getPayloadFromToken from './getPayloadFromToken';

async function saveUserName(username, jwt) {
    try {
        console.log(username, jwt);

        // Decode JWT to get the user payload
        const payload = getPayloadFromToken(jwt);

        // Find the user by _id and update the username field
        const updatedUser = await User.findOneAndUpdate(
            { _id: payload._id },               // Find user by _id from JWT payload
            { username: username },              // Update the username field
            { new: true }                        // Return the updated document
        );

        console.log(updatedUser);
        return updatedUser; // Optionally return the updated user
    } catch (error) {
        console.log(error);
        throw error;  // Optionally rethrow the error to handle it elsewhere
    }
}

export default saveUserName;
