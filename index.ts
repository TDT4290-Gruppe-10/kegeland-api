import express, { Application, Request, Response } from "express";
import firebaseClient from "./firebase.client";



const app: Application = express();
const port = 8000;





app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/users",
    async (req: Request, res: Response) => {
        const data = await firebaseClient.collection("users").get().then((col) => {
            return res.json(col.docs)
        }).catch((err) => console.log(err))
        res.status(200).json(data)
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