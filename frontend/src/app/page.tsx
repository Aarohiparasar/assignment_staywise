import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to StayWise</h1>
          <p className="text-xl text-gray-600">Your gateway to amazing properties and seamless bookings</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Find Your Perfect Stay</h2>
            <p className="text-gray-600 mb-4">Browse through our curated collection of properties</p>
            <Link href="/properties" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              View Properties
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Your Bookings</h2>
            <p className="text-gray-600 mb-4">Keep track of all your reservations in one place</p>
            <Link href="/bookings" className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              My Bookings
            </Link>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Get Started</h3>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800">
              Sign Up
            </Link>
            <Link href="/login" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
