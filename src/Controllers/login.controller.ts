import { Request, Response } from 'express';
import { checkLoginData } from 'Services/login.service';
import { User } from 'Types/User';
import jswonwebtoken from 'jsonwebtoken';

export const loginController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userData: User = req.body;

        const user = await checkLoginData(userData);

        if (user === null) {
            res.sendStatus(401);
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            res.sendStatus(500);
            return;
        }

        const accessToken = jswonwebtoken.sign(user.login, jwtSecret);

        res.json({ userData: user, jwt_token: accessToken });
        return;
    } catch (e) {
        res.sendStatus(500);
        return;
    }
};
