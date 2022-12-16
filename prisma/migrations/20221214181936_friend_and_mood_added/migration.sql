-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "friendName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "followedOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "userMood" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);
