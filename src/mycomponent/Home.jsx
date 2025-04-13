import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="bg-amber-50 py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6 leading-tight">
            Share a Plate, <br /> Change a Life 🍽️
          </h1>

          <p className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto mb-8">
            Plates4All connects <strong>NGOs</strong> with food donors — individuals, restaurants, and other NGOs — to fight hunger and prevent food waste.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link
              to="/list-food"
              className="bg-amber-900 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-full transition"
            >
              List Surplus Food
            </Link>
            <Link
              to="/find-food"
              className="border border-amber-900 text-amber-900 hover:bg-amber-100 font-semibold py-3 px-6 rounded-full transition"
            >
              Request Food Support
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto text-left">
          <h2 className="text-2xl font-semibold text-amber-900 mb-3">About Us</h2>
          <p className="text-amber-800 leading-relaxed">
            We believe that no food should be wasted while people go hungry. Plates4All is a bridge between food providers and NGOs that serve communities in need. Whether you're a restaurant with leftovers or an NGO helping the homeless — we’re here to help you connect and make a real difference.
          </p>
        </div>
      </section>

      {/* Aim & Help Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-left">
          {/* Our Aim */}
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">🎯 Our Aim</h2>
            <p className="text-amber-800 leading-relaxed text-lg">
              Our mission is simple: <strong>zero hunger, zero waste.</strong> We aim to create a strong, reliable network where no meal goes to waste and no person goes to bed hungry. Whether it’s leftover food from a wedding or daily unsold meals from a restaurant — it all has the power to feed someone in need.
            </p>
          </div>

          {/* How We Help */}
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">🙌 How We Help</h2>
            <ul className="list-disc list-inside text-amber-800 text-lg space-y-2">
              <li>🔗 Match food donors with nearby NGOs</li>
              <li>📦 Coordinate food pickups and drop-offs</li>
              <li>📲 Provide real-time tools for NGOs to request food</li>
              <li>👨‍🍳 Let restaurants and individuals list excess meals easily</li>
              <li>📉 Reduce food waste through a caring community</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
