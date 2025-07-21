-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('DOG', 'CAT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "whats_app" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sizes" (
    "level" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "energy_levels" (
    "level" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "energy_levels_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "independence_levels" (
    "level" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "independence_levels_pkey" PRIMARY KEY ("level")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "gender" "Genders" NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "age_classification" TEXT NOT NULL,
    "size_level_id" INTEGER NOT NULL,
    "energy_level_id" INTEGER NOT NULL,
    "independence_level_id" INTEGER NOT NULL,
    "environment" TEXT NOT NULL,
    "photos" TEXT[],
    "donation_requirements" TEXT[],
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_user_id_key" ON "organizations"("user_id");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_size_level_id_fkey" FOREIGN KEY ("size_level_id") REFERENCES "sizes"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_energy_level_id_fkey" FOREIGN KEY ("energy_level_id") REFERENCES "energy_levels"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_independence_level_id_fkey" FOREIGN KEY ("independence_level_id") REFERENCES "independence_levels"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
