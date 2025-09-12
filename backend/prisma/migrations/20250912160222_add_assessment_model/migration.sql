-- CreateTable
CREATE TABLE "public"."assessments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bodyFrame" TEXT,
    "skinHair" TEXT,
    "digestion" TEXT,
    "energy" TEXT,
    "sleep" TEXT,
    "climate" TEXT,
    "mind" TEXT,
    "vataScore" DOUBLE PRECISION NOT NULL,
    "pittaScore" DOUBLE PRECISION NOT NULL,
    "kaphaScore" DOUBLE PRECISION NOT NULL,
    "dominantDosha" TEXT NOT NULL,
    "balanceStatus" TEXT NOT NULL,
    "recommendations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."assessments" ADD CONSTRAINT "assessments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
