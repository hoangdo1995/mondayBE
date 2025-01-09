export enum HttpStatus {
    ERROR = 404,
    SUCCESS = 200,
    BAD_REQUEST = 400
}

export enum HttpMessage {
    ERROR = "Server Internal Error",
    SUCCESS = "Server Response Success",
    BAD_REQUEST = "Invalid or malformed request"
}

export enum Role {
    ADMIN = "admin",
    USER = "user",
    GUESS = "guess"
}

export enum MemberRole {
    ADMIN = "admin",
    MEMBER = "member",
}
