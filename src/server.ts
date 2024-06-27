import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
const port = process.env.SERVICE_PORT;

app.post('/Produto', async (req: Request, res: Response) => {
    const produto = req.body;
    //const response = await createProduto(produto);
    //return res.status(response.status).json({msg:response.msg});
});

app.delete('/Produto', async (req: Request, res: Response) => {
    const id = req.query.id as string;
    //const response = await deleteProduto(parseInt(id));
    //return res.status(response.status).json({msg:response.msg});
});

app.get('/Produto', async (req: Request, res: Response) => {
    const id = req.query.id as string;
    //const response = await selectProduto(parseInt(id));
    //return res.status(200).json(response);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});