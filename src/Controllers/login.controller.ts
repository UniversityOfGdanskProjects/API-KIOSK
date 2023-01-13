import { TypedRequestBody } from '../Types/TypedRequestBody';
import { checkLoginData } from '../Services/login.service';
import { Response } from 'express';
import { User } from 'Types/User';
import jswonwebtoken from 'jsonwebtoken';

export const loginController = async (
    req: TypedRequestBody<User>,
    res: Response
) => {
    try {
        const userData = req.body;

        const user = await checkLoginData(userData);

        if (user === null) {
            return res.status(401).send('Invalid login or password.');
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            return res.sendStatus(500);
        }

        const accessToken = jswonwebtoken.sign(user.login, jwtSecret);

        return res.json({ userData: user, jwt_token: accessToken });
    } catch (e) {
        return res.sendStatus(500);
    }
};
