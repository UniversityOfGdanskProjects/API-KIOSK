/**
 * ErrorHandler to handle error and their relevant messages
 * @param error used to handle that error
 * @param defaultMessage optional,used to display message on every status code
 * @param notFoundMessage optional, used to display message on status code === 404
 * @param internalServerMessage  optional, used to display message on status code === 500
 */

const errorHandler = (
    error: any,
    defaultMessage: string,
    notFoundMessage?: string,
    internalServerMessage?: string
) => {
    switch (error.status) {
        case 404:
            return { status: 404, message: notFoundMessage || defaultMessage };
        case 500:
            return {
                status: 500,
                message: internalServerMessage || defaultMessage,
            };
        default:
            return { status: error.status, message: defaultMessage };
    }
};

export default errorHandler;
