import express, { Request, Response, NextFunction } from 'express';

export const app = express();
import ErrorHandlerMiddleware from './middlewares/error';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';

dotenv.config();

// middlewares
app.use(express.json({limit : '50mb'}));

// cookie parser
app.use(cookieParser());

// cors
app.use(cors({
    origin: process.env.ORIGIN
}));


// routes
app.use('/api/v1/', userRouter);

app.get('/test', (req : Request , res : Response, next : NextFunction) => {  
    res.status(200).json({
        success : true,
        message : 'Hello World'
    });
});    


// global catches error handler
app.all('*', (req : Request, res : Response, next : NextFunction) => {
    res.status(404).json({
        success : false,
        message : 'Resource not found'
    });
});

app.use(ErrorHandlerMiddleware);