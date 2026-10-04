-- CreateTable
CREATE TABLE "HotelBooking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "hotelId" INTEGER NOT NULL,
    "hotelName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "checkIn" TEXT NOT NULL,
    "checkOut" TEXT NOT NULL,
    "nights" INTEGER NOT NULL,
    "pricePerNight" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "guestName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HotelBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HotelBooking" ADD CONSTRAINT "HotelBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
