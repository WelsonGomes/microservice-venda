import { Decimal } from "@prisma/client/runtime/library";

export interface VendaDTO {
    produtoid: number;
    qtdade: number;
    valorproduto: Decimal;
}

export interface reqVendaDTO {
    id: number;
    produtoid: number;
    qtdade: number;
    valorproduto: Decimal;
    valortotal: Decimal;
}