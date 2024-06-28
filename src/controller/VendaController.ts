import Decimal from 'decimal.js';
import prisma from '../conn/Prisma';
import { VendaDTO, reqVendaDTO } from '../model/Interface';
import axios from 'axios';

async function createVenda(venda: VendaDTO): Promise<{status: number, msg: string}> {
    try {
        const valorProd: Decimal = new Decimal(venda.valorproduto);
        const qtdaProd: Decimal = new Decimal(venda.qtdade);
        const valor = valorProd.mul(qtdaProd);
        const result = await prisma.$transaction(async (prismaTransacition) => {
            const novo = await prismaTransacition.venda.create({ 
                data: { 
                    produtoid: venda.produtoid, 
                    qtdade: venda.qtdade, 
                    valorproduto: venda.valorproduto,
                    valortotal: valor
                }
            });
            if (!novo) {
                console.log(novo);
                throw new Error('Houve uma falha ao processar a venda.');
            }
            try {
                const produtoResp = await axios.put("http://54.200.107.107:3001/Produto", {
                    id: novo.produtoid,
                    qtd: novo.qtdade,
                    op: 'subtrair'
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
    
                if (!produtoResp || produtoResp.status !== 200) {
                    throw new Error('Houve uma falha ao processar a venda.');
                }
    
            } catch (axiosError) {
                console.error('Erro ao chamar o serviço de produto:', axiosError);
                throw new Error('Houve uma falha ao processar a venda.');
            }

            return {status: 200, msg: 'Venda processada.'};
        });
        return result;
    } catch (error) {
        console.log(error);
        return {status: 400, msg: 'Houve uma falha ao processar a venda.'};
    } finally {
        await prisma.$disconnect();
    };
};

async function deleteVenda(id: number, valor: boolean): Promise<{status: number, msg: string}> {
    try {
        const result = await prisma.$transaction(async (prismaTransaction) => {
            const response = await prismaTransaction.venda.findUnique({ where: { id: id }});
            if (!response) {
                console.log(response);
                throw new Error('Houve uma falha ao processar a venda.');
            }

            await prismaTransaction.venda.update({ where: { id: id }, data: { cancelada: valor }});
            
            try {
                const produtoResp = await axios.put("http://54.200.107.107:3001/Produto", {
                    id: response.produtoid,
                    qtd: response.qtdade,
                    op: 'soma'
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
    
                if (!produtoResp || produtoResp.status !== 200) {
                    throw new Error('Houve uma falha ao processar a venda.');
                }
    
            } catch (axiosError) {
                console.error('Erro ao chamar o serviço de produto:', axiosError);
                throw new Error('Houve uma falha ao processar a venda.');
            }
            
            return { status: 200, msg: 'Venda cancelada.' };
        });
        return result;
    } catch (error) {
        console.log(error);
        return { status: 400, msg: 'Houve uma falha ao processar a venda.' };
    } finally {
        await prisma.$disconnect();
    }    
};

async function selectVenda(id: number): Promise<reqVendaDTO[] | reqVendaDTO> {
    try {
        if(id > 0){
            const response = await prisma.venda.findUnique({ where: { id: id, cancelada: false }});
            if(!response){
                return [];
            };
            const venda: reqVendaDTO = {
                id: response.id,
                produtoid: response.produtoid,
                qtdade: response.qtdade,
                valorproduto: response.valorproduto,
                valortotal: response.valortotal
            };
            return venda;
        };
        const response = await prisma.venda.findMany({ where: { cancelada: false }});
        if(!response){
            return [];
        };
        const vendas: reqVendaDTO[] = response.map((c) => {
            return {
                id: c.id,
                produtoid: c.produtoid,
                qtdade: c.qtdade,
                valorproduto: c.valorproduto,
                valortotal: c.valortotal
            }
        });
        return vendas;
    } catch (error) {
        console.log(error);
        return [];
    };
};

export { createVenda, deleteVenda, selectVenda };