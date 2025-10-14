"use client";
import { useEffect, useState } from "react";
import { BookingAPI } from "@/lib/api";
import Image from "next/image";
import { message, Modal } from "antd";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await BookingAPI.mine();
        setBookings(res.data);
      } catch (e: any) {
        setError(e.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
  try {
    setCanceling(bookingId);
    await BookingAPI.cancel(bookingId);
    message.success("Booking canceled successfully!");
    setBookings(prev => prev.filter(b => b._id !== bookingId));
  } catch (err: any) {
    message.error(err.message || "Failed to cancel booking");
  } finally {
    setCanceling(null);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          🏡 My Bookings
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start exploring our properties to make your first booking!</p>
            <a href="/properties" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Browse Properties
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="md:flex">
                  {booking.property?.images?.[0] && (
                    <div className="md:w-1/3 relative h-52 md:h-auto">
                      <Image
                        src={booking.property.images[0]}
                        alt={booking.property.title}
                        fill
                        className="object-cover"
                        priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                        {booking.property?.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{booking.property?.location}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Check-in</p>
                          <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Check-out</p>
                          <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="text-2xl font-bold text-blue-600">${booking.totalPrice}</p>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
