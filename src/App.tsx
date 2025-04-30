import React from 'react';
import Chatbot from './components/chatbot/Chatbot';
import { ShoppingBag } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sample E-commerce Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-500" />
              <span className="ml-2 font-bold text-xl text-gray-800">ShopSmart</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Shop</a>
              <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Deals</a>
              <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Sample E-commerce Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ShopSmart</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our latest products and get personalized assistance from our AI chatbot.
            Click the chat button in the bottom right corner to get started.
          </p>
        </div>
        
        {/* Featured Products Grid */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg" 
                alt="Wireless Headphones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Wireless Headphones</h3>
              <p className="text-gray-600 text-sm mb-2">Premium Sound Quality</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">$129.99</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Product 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg" 
                alt="Smart Watch"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Smart Watch</h3>
              <p className="text-gray-600 text-sm mb-2">Fitness Tracking & Notifications</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">$199.99</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Product 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg" 
                alt="Organic Cotton T-Shirt"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Organic Cotton T-Shirt</h3>
              <p className="text-gray-600 text-sm mb-2">Eco-Friendly Materials</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">$34.99</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Product 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-64 bg-gray-200">
              <img 
                src="https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg" 
                alt="Premium Skincare Set"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Premium Skincare Set</h3>
              <p className="text-gray-600 text-sm mb-2">Natural Ingredients</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">$89.99</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}

export default App;