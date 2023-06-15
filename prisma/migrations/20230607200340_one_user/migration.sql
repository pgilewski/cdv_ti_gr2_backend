/*
  Warnings:

  - You are about to drop the column `systemUserId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `systemUserId` on the `TaskHour` table. All the data in the column will be lost.
  - You are about to drop the column `systemUserId` on the `WorkDay` table. All the data in the column will be lost.
  - You are about to drop the `CurrentUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_systemUserId_fkey";

-- DropForeignKey
ALTER TABLE "TaskHour" DROP CONSTRAINT "TaskHour_systemUserId_fkey";

-- DropForeignKey
ALTER TABLE "WorkDay" DROP CONSTRAINT "WorkDay_systemUserId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "systemUserId",
ADD COLUMN     "UserId" INTEGER;

-- AlterTable
ALTER TABLE "TaskHour" DROP COLUMN "systemUserId",
ADD COLUMN     "UserId" INTEGER;

-- AlterTable
ALTER TABLE "WorkDay" DROP COLUMN "systemUserId",
ADD COLUMN     "UserId" INTEGER;

-- DropTable
DROP TABLE "CurrentUser";

-- DropTable
DROP TABLE "SystemUser";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Pracownik',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TaskHour" ADD CONSTRAINT "TaskHour_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
