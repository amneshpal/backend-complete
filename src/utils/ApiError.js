// src/utils/ApiError.js

export class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message; // Fixed typo here (was 'massage')
        this.success = false;
        this.errors = errors;

        // Set stack trace only if it's not provided (to ensure cleaner error stack)
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // Optional: You could override toString() for more readable error output
    toString() {
        return `${this.statusCode} - ${this.message} ${this.errors.length ? `Errors: ${JSON.stringify(this.errors)}` : ''}`;
    }
}
