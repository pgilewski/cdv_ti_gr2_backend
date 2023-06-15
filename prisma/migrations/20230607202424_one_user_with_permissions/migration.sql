/*
  Warnings:

  - You are about to drop the column `UserId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `TaskHour` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `WorkDay` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_UserId_fkey";

-- DropForeignKey
ALTER TABLE "TaskHour" DROP CONSTRAINT "TaskHour_UserId_fkey";

-- DropForeignKey
ALTER TABLE "WorkDay" DROP CONSTRAINT "WorkDay_UserId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "UserId";

-- AlterTable
ALTER TABLE "TaskHour" DROP COLUMN "UserId";

-- AlterTable
ALTER TABLE "WorkDay" DROP COLUMN "UserId";

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPermission" (
    "permissionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("userId","permissionId")
);

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskHour" ADD CONSTRAINT "TaskHour_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
