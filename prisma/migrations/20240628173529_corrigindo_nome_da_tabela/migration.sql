/*
  Warnings:

  - You are about to drop the `Venda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Venda";

-- CreateTable
CREATE TABLE "tbvenda" (
    "id" SERIAL NOT NULL,
    "produtoid" INTEGER NOT NULL,
    "qtdade" INTEGER NOT NULL,
    "valorproduto" DECIMAL(17,2) NOT NULL,
    "valortotal" DECIMAL(17,2) NOT NULL,
    "cancelada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbvenda_pkey" PRIMARY KEY ("id")
);
