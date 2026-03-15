import React, { useState, useEffect } from 'react';

// 8 products with real product images from Unsplash (specific photo IDs)
const initialProducts = [
  {
    id: 1,
    name: 'Classic Leather Watch',
    price: '39.99',
    originalPrice: '89.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop', // watch
    stock: 0,
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: '49.99',
    originalPrice: '99.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop', // headphones
    stock: 0,
  },
  {
    id: 3,
    name: 'Premium Backpack',
    price: '59.99',
    originalPrice: '129.99',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop', // backpack
    stock: 0,
  },
  {
    id: 4,
    name: 'Sneakers Running',
    price: '69.99',
    originalPrice: '149.99',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop', // sneakers
    stock: 0,
  },
  {
    id: 5,
    name: 'Smartphone Stand',
    price: '19.99',
    originalPrice: '39.99',
    image: 'https://images.unsplash.com/photo-1527443224154-c46a3940fcf7?w=300&h=200&fit=crop', // phone stand
    stock: 0,
  },
  {
    id: 6,
    name: 'Leather Wallet',
    price: '29.99',
    originalPrice: '59.99',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop', // wallet
    stock: 0,
  },
  {
    id: 7,
    name: 'Sunglasses',
    price: '24.99',
    originalPrice: '79.99',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=200&fit=crop', // sunglasses
    stock: 0,
  },
  {
    id: 8,
    name: 'Coffee Mug',
    price: '14.99',
    originalPrice: '29.99',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=300&h=200&fit=crop', // mug
    stock: 0,
  },
];

const Buy = () => {
  const [timeLeft, setTimeLeft] = useState(50); // 50 seconds countdown
  const [logs, setLogs] = useState([]);
  const [products] = useState(initialProducts); // products remain static (sold out)

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Fake real-time statistic generator
  useEffect(() => {
    const userNames = [
      "alex_92",
      "maria_shop",
      "tech_sam",
      "lisa_c",
      "john_doe",
      "flash_hunter",
      "emma_k",
      "ray_m",
      "nina_ray",
      "this_user", // special: represents "you"
    ];

    const messages = [
      "attempted to buy - rejected (stock empty)",
      "payment failed: inventory negative",
      "saw 'out of stock' after checkout",
      "refund triggered: item already sold",
      "stock alert: -1 items recorded",
      "was rejected due to oversell",
    ];

    const interval = setInterval(() => {
      const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Create a new log entry
      const newLog = `[${timestamp}] ${randomUser}: ${randomMsg}`;

      setLogs((prevLogs) => {
        const updated = [newLog, ...prevLogs].slice(0, 6); // keep last 6 entries
        return updated;
      });
    }, 2500); // new log every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Format countdown as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Fake button handlers (just for show)
  const fakeClickHandler = (action) => {
    console.log(`Fake action: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with sale timer */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            ⚡ Flash Sale ⚡
          </h1>
          <div className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <span className="text-2xl font-mono">{formatTime(timeLeft)}</span>
            <span className="ml-2 text-lg">remaining</span>
          </div>
          {timeLeft === 0 && (
            <p className="text-red-600 font-semibold mt-2">Sale has ended!</p>
          )}
        </div>

        {/* 8 Product Grid - all sold out */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Fallback in case an Unsplash image fails (rare)
                  e.target.src = `https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=${encodeURIComponent(
                    product.name
                  )}`;
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-2xl font-bold text-red-600">
                    ${product.price}
                  </span>
                  <span className="ml-2 text-sm line-through text-gray-400">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                </div>
                <button
                  disabled
                  className="mt-4 w-full bg-gray-300 text-gray-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                >
                  Sold Out
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fake action buttons below the product grid */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => fakeClickHandler('Apply Coupon')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105 focus:outline-none"
          >
            Apply Coupon (fake)
          </button>
          <button
            onClick={() => fakeClickHandler('Checkout Now')}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition transform hover:scale-105 focus:outline-none"
          >
            Checkout Now (fake)
          </button>
          <button
            onClick={() => fakeClickHandler('Notify Me')}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition transform hover:scale-105 focus:outline-none"
          >
            Notify Me (fake)
          </button>
          <button
            onClick={() => fakeClickHandler('View More')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition transform hover:scale-105 focus:outline-none"
          >
            View More (fake)
          </button>
        </div>

        {/* Fake real-time statistics panel */}
        <div className="bg-gray-900 text-gray-100 rounded-xl p-6 shadow-2xl border border-gray-700">
          <div className="flex items-center mb-4">
            <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <h2 className="text-xl font-bold">LIVE STOCK STATUS</h2>
            <span className="ml-auto text-sm text-gray-400">auto-refresh</span>
          </div>

          {/* Live log feed */}
          <div className="space-y-2 font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-green-400">⏳ Initializing live feed...</p>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 ${
                    log.includes("this_user")
                      ? "border-yellow-400 bg-yellow-400/10 pl-3"
                      : "border-red-500 pl-3"
                  } py-1`}
                >
                  <span
                    className={
                      log.includes("this_user") ? "text-yellow-300" : "text-gray-300"
                    }
                  >
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Special rejection message for "this user" */}
          <div className="mt-5 p-3 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-200 font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              ⚠️ You have been rejected: stock is now fully completed. Your payment could not be processed.
            </p>
          </div>

          {/* Additional stat summary */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-800 p-2 rounded">
              <span className="text-gray-400">Current stock:</span>{" "}
              <span className="text-red-400 font-bold">-2 (oversold)</span>
            </div>
            <div className="bg-gray-800 p-2 rounded">
              <span className="text-gray-400">Failed orders:</span>{" "}
              <span className="text-red-400 font-bold">1,247</span>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-xs text-gray-500 text-center mt-6">
          * Simulated incident: inventory negative, users charged for unavailable items.
        </p>
      </div>
    </div>
  );
};

export default Buy;