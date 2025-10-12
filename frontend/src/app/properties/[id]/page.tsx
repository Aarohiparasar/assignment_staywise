"use client";
import { useEffect, useState } from "react";
import { PropertyAPI, BookingAPI } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [prop, setProp] = useState<any>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await PropertyAPI.get(id);
        setProp(res.data);
      } catch (e) {
        setError("Failed to load property");
      }
    })();
  }, [id]);

  const book = async () => {
    setError(null); setOk(null);
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after check-in date");
      return;
    }
    
    setLoading(true);
    try {
      await BookingAPI.create({ propertyId: id, checkIn, checkOut });
      setOk("Booking created successfully!");
      setTimeout(() => router.push("/bookings"), 2000);
    } catch (e: any) { 
      setError(e.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!prop) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading property...</p>
      </div>
    </div>
  );

  const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = nights * prop.pricePerNight;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Property Images */}
          <div className="space-y-4">
            {prop.images && prop.images.length > 0 && (
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={prop.images[0]}
                  alt={prop.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{prop.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{prop.location}</p>
              <p className="text-gray-700 leading-relaxed">{prop.description}</p>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      type="date" 
                      value={checkIn} 
                      onChange={e => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      type="date" 
                      value={checkOut} 
                      onChange={e => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {nights > 0 && (
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex justify-between text-sm">
                      <span>${prop.pricePerNight} × {nights} nights</span>
                      <span className="font-semibold">${totalPrice}</span>
                    </div>
                  </div>
                )}

                {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>}
                {ok && <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">{ok}</div>}

                <button 
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={book}
                  disabled={loading || !checkIn || !checkOut}
                >
                  {loading ? "Creating Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


