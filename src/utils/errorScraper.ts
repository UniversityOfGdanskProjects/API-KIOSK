import { ErrorType } from 'Types/error.type';

export const returnScraperError = (error: any): ErrorType => {
    if (error?.response?.status === 404) {
        return {
            status: error.response.status,
            message: 'Sorry! Could not find majors',
        };
    }

    if (error?.response?.status) {
        return {
            status: error.response.status,
            message: 'Something went wrong',
        };
    }

    return { status: 500, message: 'Something went wrong' };
};
