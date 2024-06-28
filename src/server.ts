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
    try{
        const venda = req.body;
        const response = await createVenda(venda);
        console.log(response.msg)
        return res.status(response.status).json({msg:response.msg});
    } catch (error){
        return res.status(500).json({msg: 'Houve um erro no servidor.'});
    }
});

app.delete('/Venda', async (req: Request, res: Response) => {
    try{
        const id = req.query.id as string;
        const response = await deleteVenda(parseInt(id), true);
        console.log(response)
        return res.status(response.status).json(response);
    } catch (error){
        return res.status(500).json({msg: 'Houve um erro no servidor.'});
    }
});

app.get('/Venda', async (req: Request, res: Response) => {
    try{
        const id = req.query.id as string;
        const response = await selectVenda(parseInt(id));
        return res.status(200).json(response);
    } catch (error){
        return res.status(500).json({msg: 'Houve um erro no servidor.'});
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});