import express from 'express';

import getValidUser from '../services/payoor/getValidUser';

const authRoute = express();

authRoute.get('/auth/getuser', async (req, res) => {
    try {
        const { jwt } = req.query;

        const { _id, phoneNumber } = await getValidUser(jwt);

        if (_id && phoneNumber) {
            res.status(200).json({
                authenticated: true,
            });
        } else {
            res.status(404).json({
                authenticated: false,
            });
        }
    } catch (error) {
        console.log(error)
    }
});

export default authRoute