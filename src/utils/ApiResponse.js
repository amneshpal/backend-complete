class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }

    // Optional: Override toString() for more readable logs
    toString() {
        return `${this.success ? 'Success' : 'Error'}: ${this.statusCode} - ${this.message}`;
    }
}

export { ApiResponse };
