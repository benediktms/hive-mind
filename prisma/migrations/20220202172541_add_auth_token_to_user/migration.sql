/*
  Warnings:

  - A unique constraint covering the columns `[authToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authToken" VARCHAR(40);

-- CreateIndex
CREATE UNIQUE INDEX "User_authToken_key" ON "User"("authToken");
