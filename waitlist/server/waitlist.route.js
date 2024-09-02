import express from 'express';

const waitlistroute = express();

import Waitlist from './waitlist.model';
import send from './waitlist.send';

waitlistroute.post('/waitlist', async (req, res) => {
    try {
        const { firstname, lastname, email, phonenumber, state, city, selectedoptions } = req.body;

        const registered = await Waitlist.findOne({ email });

        if (registered) {
            res.status(405).send({ alreadyregistered: 'already registered' });
            return
        }

        const waitlistitem = new Waitlist({
            firstname,
            lastname,
            email: email.toLowerCase(),
            phonenumber,
            state,
            city,
            selectedoptions
        });

        await send({ email: email.toLowerCase(), firstname })
            .then(async (message) => {
                console.log(message, 'done here')
                waitlistitem.emailsent = true;
                await waitlistitem.save();
                res.status(201).send({ successmessage: 'email sent, user added' });
            })
            .catch(error => {
                console.log(error)
                console.log(error)
            });

        console.log(waitlistitem);
    } catch (error) {
        console.log(error);
        throw new Error();
    }
});

waitlistroute.get('/waitlist/HS3zHSv7F3zHS3zB%B%v7F', async (req, res) => {
    const waitlst = await Waitlist.find();
    res.status(200).send({ waitlst });
})

export default waitlistroute;