-- CreateTable
CREATE TABLE "Venda" (
    "id" SERIAL NOT NULL,
    "produtoid" INTEGER NOT NULL,
    "qtdade" INTEGER NOT NULL,
    "valorproduto" DECIMAL(17,2) NOT NULL,
    "valortotal" DECIMAL(17,2) NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);
