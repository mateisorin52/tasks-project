/*
  Warnings:

  - You are about to drop the column `iname` on the `User` table. All the data in the column will be lost.
  - Added the required column `lname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "iname",
ADD COLUMN     "lname" TEXT NOT NULL;
