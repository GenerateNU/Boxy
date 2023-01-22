-- CreateEnum
CREATE TYPE "amenity" AS ENUM ('Pest Controlled', 'Fire Alarm System', 'Smoke Free', 'Pet Free', 'Access to Elevator', 'Ground Floor', 'Climate Controlled', 'Private Storage', 'Party Free');

-- CreateEnum
CREATE TYPE "spacetype" AS ENUM ('Basement', 'Closet', 'Common Living Space', 'Bedroom', 'Cabinet', 'Unoccupied Room', 'Other');

-- CreateTable
CREATE TABLE "listings" (
    "listing_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "host_id" SERIAL NOT NULL,
    "dates_available" DATE[],
    "price" DECIMAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amenities" "amenity"[],
    "space_type" "spacetype" NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "editable" BOOLEAN NOT NULL,
    "created_on" DATE NOT NULL,
    "space_available" INTEGER[],

    CONSTRAINT "listings_pkey" PRIMARY KEY ("listing_id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "reservation_id" SERIAL NOT NULL,
    "host_id" SERIAL NOT NULL,
    "stasher_id" SERIAL NOT NULL,
    "listing_id" SERIAL NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "accepted_on" DATE,
    "requested_on" DATE[],
    "dates_requested" DATE[],

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "drivers_license_photo" VARCHAR(255) NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "verified_on" DATE,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
