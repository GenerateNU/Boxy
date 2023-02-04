/*
  Warnings:

  - You are about to alter the column `longitude` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(65,30)`.
  - You are about to alter the column `latitude` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(65,30)`.
  - Changed the type of `requested_on` on the `reservations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "requested_on",
ADD COLUMN     "requested_on" DATE NOT NULL;
