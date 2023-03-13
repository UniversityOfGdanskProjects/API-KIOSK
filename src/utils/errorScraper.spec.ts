import { AxiosError, AxiosResponse } from 'axios';
import { returnScraperError } from './errorScraper';
import { ErrorType } from '../Types/error.type';

describe('returnScraperError', () => {
    it('return error 404', () => {
        const errorData: ErrorType = {
            message: 'Not Found',
            status: 404,
        };
        const response: AxiosResponse<ErrorType> = {
            data: errorData,
            status: 404,
            statusText: 'Not Found',
            headers: {},
            config: {
                method: 'get',
                url: 'https://example.com/api/resource/123',
            },
        };
        const error: AxiosError = new AxiosError(
            'Request failed with status code 404',
            'NOT_FOUND',
            {
                method: 'get',
                url: 'https://example.com/api/resource/123',
            },
            null,
            response
        );

        expect(returnScraperError(error)).toEqual({
            status: 404,
            message: 'Sorry! Could not find majors',
        });
    });
    it('return error 400', () => {
        const errorData: ErrorType = {
            message: 'Bad Request',
            status: 400,
        };
        const response: AxiosResponse<ErrorType> = {
            data: errorData,
            status: 400,
            statusText: 'Bad Request',
            headers: {},
            config: {
                method: 'get',
                url: 'https://example.com/api/resource/123',
            },
        };
        const error: AxiosError = new AxiosError(
            'Request failed with status code 400',
            'BAD_REQUEST',
            {
                method: 'get',
                url: 'https://example.com/api/resource/123',
            },
            null,
            response
        );

        expect(returnScraperError(error)).toEqual({
            status: 400,
            message: 'Something went wrong',
        });
    });
    it('return error 500', () => {
        const errorData: ErrorType = {
            message: 'Internal Server Error',
            status: 500,
        };
        const response: AxiosResponse<ErrorType> = {
            data: errorData,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {
                method: 'get',
                url: 'https://example.com/api/resource/123',
            },
        };
        const error: AxiosError = new AxiosError(
            'Request failed with status code 500',
            'INTERNAL_SERVER_ERROR',
            {
                method: 'get',
                url: 'https://example.com/api/resource/123',
            },
            null,
            response
        );

        expect(returnScraperError(error)).toEqual({
            status: 500,
            message: 'Something went wrong',
        });
    });
});
