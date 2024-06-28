import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createVenda, deleteVenda, selectVenda } from './controller/VendaController';

dotenv.config();

const app = express();
app.use(cors({origin:"*"}));
app.use(express.json());
const port = process.env.SERVICE_PORT;

app.post('/Venda', async (req: Request, res: Response) => {
    const venda = req.body;
    const response = await createVenda(venda);
    console.log(response.msg)
    return res.status(response.status).json({msg:response.msg});
});

app.delete('/Venda', async (req: Request, res: Response) => {
    const id = req.query.id as string;
    const response = await deleteVenda(parseInt(id), true);
    console.log(response)
    return res.status(response.status).json(response);
});

app.get('/Venda', async (req: Request, res: Response) => {
    const id = req.query.id as string;
    const response = await selectVenda(parseInt(id));
    return res.status(200).json(response);
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});