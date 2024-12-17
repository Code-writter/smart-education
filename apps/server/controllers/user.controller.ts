import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMails";
config();

interface IRegisteraionBody{
    name: string;
    email: string;
    password: string;  
    avatar?:string
}

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password }: IRegisteraionBody = req.body;

        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const user:IRegisteraionBody = {
            name,
            email,
            password,
        }
        const activaionToken = createActivationToken(user);

        const activationCode = activaionToken.activationCode;

        const data = {user : {name : user.name}, activationCode}

        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

        try {
            await sendMail({
                email : user.email,
                subject : "Account Activation",
                template : "activation-mail.ejs",
                data
            })

            res.status(201).json({
                success: true,
                message: `Account registered successfully. Please check your email : ${user.email} for activation code`,
                activaionToken : activaionToken.token
            });
        } catch (error  : any) {
            return next(new ErrorHandler(error.message, 500));
        }

        res.status(201).json({
            success: true,
            user
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user : any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET as Secret , {
        expiresIn: "10m",
    });

    return { token, activationCode };
};

interface IActivationRequest{
    activation_token: string;
    activation_code: string;
}

export const activateUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       const { activation_token, activation_code }: IActivationRequest = req.body; 

       const newUser : {user :IUser, activationCode : string} = jwt.verify(
            activation_token, 
            process.env.ACTIVATION_SECRET as Secret
        ) as {user :IUser, activationCode : string};

        if(newUser.activationCode !== activation_code){
            return next(new ErrorHandler("Invalid activation code", 400));
        }

        const {name, email, password} = newUser.user;

        const alreadyExists = await User.findOne({email});

        if(alreadyExists){
            return next(new ErrorHandler("User already exists", 400));
        }


        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success : true,
            message : "Account activated successfully",
            user
        });

    } catch (error : any) {
        return next(new ErrorHandler(error.message, 400));
    }
})