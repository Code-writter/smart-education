import { Request, Response , NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

const ErrorHandlerMiddleware = (err : any , req : Request , res : Response , next : NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Wrong Mongoose Object ID Error
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //dupicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT error

    if(err.name === 'JsonWebTokenError'){
        const message = 'JSON Web Token is invalid. Try Again!!!';
        err = new ErrorHandler(message, 401);
    }

    // wrong JWT expired error

    if(err.name === 'TokenExpiredError'){
        const message = 'JSON Web Token is expired. Try Again!!!';
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    });
}

export default ErrorHandlerMiddleware;