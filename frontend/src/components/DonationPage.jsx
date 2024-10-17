import React from 'react';
import { Link } from 'react-router-dom';

const DonationPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-700 text-white py-4 px-6 rounded-b-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Heart Charity</h1>
          <div className="space-x-4">
            <Link to="/login" className="border border-white text-white hover:bg-gray-600 px-4 py-2 rounded">Login</Link>
            <Link to="/login"assName="bg-gray-400 text-gray-900 hover:bg-gray-300 px-4 py-2 rounded">Register</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-12 px-6 bg-gradient-to-b from-gray-500 to-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Your Donation, Our Mission</h2>
            <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
              Join us in making a difference. Every donation, no matter how small, helps us create positive change in communities worldwide.
            </p>
          </div>
        </section>

        {/* <section className="py-12 px-6">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">The Impact of Your Generosity</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-100 border-gray-300 p-6 rounded">
                <div className="flex items-center text-gray-700 mb-4">
                  <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3 0-4 3-4 3v4h8v-4s-1-3-4-3zm-4 3H6s-2 1-2 3v4h12v-4s0-2-2-3h-2" />
                  </svg>
                  <span>Lives Touched</span>
                </div>
                <p className="text-4xl font-bold mb-2 text-gray-800">50,000+</p>
                <p className="text-gray-600">People directly benefited from donations last year</p>
              </div>
              <div className="bg-emerald-100 border-emerald-300 p-6 rounded">
                <div className="flex items-center text-emerald-700 mb-4">
                  <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3 0-4 3-4 3v4h8v-4s-1-3-4-3zm-4 3H6s-2 1-2 3v4h12v-4s0-2-2-3h-2" />
                  </svg>
                  <span>Funds Raised</span>
                </div>
                <p className="text-4xl font-bold mb-2 text-emerald-800">$2M+</p>
                <p className="text-emerald-600">Donated by our generous supporters in 2023</p>
              </div>
              <div className="bg-lime-100 border-lime-300 p-6 rounded">
                <div className="flex items-center text-lime-700 mb-4">
                  <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3 0-4 3-4 3v4h8v-4s-1-3-4-3zm-4 3H6s-2 1-2 3v4h12v-4s0-2-2-3h-2" />
                  </svg>
                  <span>Global Reach</span>
                </div>
                <p className="text-4xl font-bold mb-2 text-lime-800">30+</p>
                <p className="text-lime-600">Countries where your donations have made an impact</p>
              </div>
            </div>
          </div>
        </section> */}

        <section className="py-12 px-6 bg-gray-200">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Where Your Donation Goes</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-teal-100 border-teal-300 p-6 rounded">
                <h4 className="text-teal-700">Education Support</h4>
                <p className="text-teal-600">Providing educational resources and scholarships to underprivileged children.</p>
              </div>
              <div className="bg-cyan-100 border-cyan-300 p-6 rounded">
                <h4 className="text-cyan-700">Healthcare Initiatives</h4>
                <p className="text-cyan-600">Funding medical camps and healthcare facilities in underserved areas.</p>
              </div>
              <div className="bg-gray-100 border-gray-300 p-6 rounded">
                <h4 className="text-gray-700">Community Development</h4>
                <p className="text-gray-600">Building infrastructure and supporting local businesses in rural communities.</p>
              </div>
              <div className="bg-emerald-100 border-emerald-300 p-6 rounded">
                <h4 className="text-emerald-700">Emergency Relief</h4>
                <p className="text-emerald-600">Providing immediate assistance to areas affected by natural disasters.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Every Donation Matters</h3>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Whether it's ₹25 or ₹100, your contribution can make a real difference in someone's life. Join us in our mission to create a better world for all.
            </p>
            <Link to="/login" className="bg-gray-600 text-white hover:bg-gray-700 text-lg px-8 py-4 rounded">
              Make a Donation
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-700 text-white py-6 px-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Heart Charity. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DonationPage;
