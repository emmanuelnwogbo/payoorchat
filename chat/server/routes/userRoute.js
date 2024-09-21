import express from 'express';

import User from '../models/user';

const userRoute = express();

userRoute.get('/getusers', async (req, res) => {
    const users = await User.find();

   // console.log(users);
    res.status(200).json(users);
});

userRoute.get('/getuser', async (req, res) => {
    const { user_id } = req.query;

    const user = await User.find({ _id: user_id });

   // console.log(user);
})

export default userRoute;