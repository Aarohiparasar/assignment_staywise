"use client";
import Link from "next/link";
import { Carousel, Card, Button, Rate } from "antd";
import { motion } from "framer-motion";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    alt: "Luxury Villa",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    alt: "City Apartment",
  },
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    alt: "Beach House",
  },
  {
    src: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
    alt: "Mountain Cabin",
  },
];

const featuredProperties = [
  {
    name: "Skyline Apartment",
    location: "New York, USA",
    price: "$120/night",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    name: "Beachfront Villa",
    location: "Malibu, California",
    price: "$340/night",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  },
  {
    name: "Modern Studio",
    location: "London, UK",
    price: "$150/night",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
];

const testimonials = [
  {
    name: "Sophia Patel",
    review:
      "StayWise made finding my dream holiday home effortless! The platform is smooth, modern, and easy to navigate.",
    rating: 5,
  },
  {
    name: "James Miller",
    review:
      "Excellent service and amazing properties. Booking was simple and transparent — highly recommend!",
    rating: 5,
  },
  {
    name: "Aarav Sharma",
    review:
      "I booked a villa in Goa for my family vacation. The experience was seamless and the property was exactly as shown!",
    rating: 4,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7.1xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to StayWise</h1>
          <p className="text-lg text-gray-600">
            Find your dream property and manage bookings effortlessly
          </p>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Carousel autoplay autoplaySpeed={2500} dotPosition="bottom" className="rounded-lg overflow-hidden shadow-lg">
            {carouselImages.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[450px] object-cover"
                />
              </div>
            ))}
          </Carousel>

          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">Explore our top-rated stays</h2>
            <p className="text-gray-500">
              Discover beautiful properties across cities, beaches, and mountains.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card
            title={<h2 className="text-xl font-semibold">Find Your Perfect Stay</h2>}
            bordered={false}
            className="shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-gray-600 mb-4">
              Browse through our curated collection of premium properties that fit your budget.
            </p>
            <Link href="/properties">
              <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
                View Properties
              </Button>
            </Link>
          </Card>

          <Card
            title={<h2 className="text-xl font-semibold">Manage Your Bookings</h2>}
            bordered={false}
            className="shadow-md rounded-xl hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-gray-600 mb-4">
              Keep track of your upcoming and past stays in one convenient dashboard.
            </p>
            <Link href="/bookings">
              <Button type="primary" size="large" className="bg-green-600 hover:bg-green-700">
                My Bookings
              </Button>
            </Link>
          </Card>
        </div>

        {/* Featured Properties */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProperties.map((p, i) => (
              <Card
                key={i}
                hoverable
                cover={<img src={p.image} alt={p.name} className="h-56 object-cover rounded-t-xl" />}
                className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-gray-600 text-sm">{p.location}</p>
                <p className="font-medium text-blue-600 mt-2">{p.price}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Guests Say</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-4 rounded-xl shadow-md">
                <p className="text-gray-700 mb-4 italic">"{t.review}"</p>
                <Rate disabled defaultValue={t.rating} />
                <p className="mt-3 font-semibold text-gray-800">{t.name}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Join StayWise Today</h2>
          <p className="text-lg mb-6">
            Sign up now and unlock access to exclusive properties and discounts.
          </p>
          <Link href="/signup">
            <Button
              type="primary"
              size="large"
              className="bg-white text-blue-700 hover:bg-gray-200 px-8 rounded-lg"
            >
              Create Account
            </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t pt-6">
          <p>© {new Date().getFullYear()} StayWise. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/about" className="hover:underline mr-3">About</Link>
            <Link href="/contact" className="hover:underline mr-3">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
