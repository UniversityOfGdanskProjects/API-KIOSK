import { Response } from 'express';

export const mockResponse = () => {
    const res: Partial<Response> = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);

    return res;
};
