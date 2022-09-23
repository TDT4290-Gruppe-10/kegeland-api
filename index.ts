import express, { Application, Request, Response } from "express";
import { initializeApp } from 'firebase/app';

const app: Application = express();
const port = 3000;

var firebaseConfig = {
    apiKey: "YOUR KEY",
    authDomain: "YOUR PROJECT.firebaseapp.com",
    projectId: "YOUR PROJECT ID",
    storageBucket: "YOUR PROJECT.appspot.com",
    messagingSenderId: "MESSAGING ID",
    appId: "YOUR APP ID"
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/users",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Welcome to Kegeland!",
        });
    }
);

app.post("/",
    async (req: Request, res: Response): Promise<Response> => {
        const data = req.body
        console.log(data)
        return res.status(200).send(
            data,
        );
})

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}