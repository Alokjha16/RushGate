import React, { useState, useEffect, useRef } from 'react';

// Helper to generate random increments
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Settings = () => {
  // Core metrics
  const [incoming, setIncoming] = useState(12500);
  const [queue, setQueue] = useState(7400);
  const [processing, setProcessing] = useState(200);
  const [success, setSuccess] = useState(100);
  const [rejected, setRejected] = useState(12400);
  const [inventory] = useState(0); // fixed at 0
  const [systemStatus] = useState('Stable (oversold)');

  // For visual queue animation – we'll simulate little request blocks
  const [queueBlocks, setQueueBlocks] = useState([]);
  const containerRef = useRef(null);

  // Simulate real-time traffic
  useEffect(() => {
    const interval = setInterval(() => {
      setIncoming(prev => prev + randomInt(20, 70));
      setQueue(prev => {
        // Queue fluctuates: some move to processing, some new arrive
        const newArrivals = randomInt(10, 40);
        const processed = randomInt(15, 45);
        return Math.max(0, prev + newArrivals - processed);
      });
      setProcessing(prev => randomInt(180, 240)); // processing hovers around
      setSuccess(prev => prev + randomInt(0, 2)); // a few succeed
      setRejected(prev => prev + randomInt(30, 80)); // many rejected
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Update queue blocks to visualize the queue length (max 20 blocks for UI)
  useEffect(() => {
    // Show up to 20 blocks, each representing ~500 requests
    const blocksCount = Math.min(20, Math.ceil(queue / 500));
    setQueueBlocks(Array(blocksCount).fill('⬜'));
  }, [queue]);

  // Format numbers with commas
  const formatNumber = (num) => num.toLocaleString();

  // Success/Reject icons for visual
  const successIcons = Array(5).fill('✅');
  const rejectIcons = Array(5).fill('❌');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
            ⚡ FLASH SALE SYSTEM MONITOR ⚡
          </h1>
          <p className="text-gray-400 mt-2">Real‑time purchase queue visualization</p>
        </div>

        {/* Main stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Incoming */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="text-sm text-gray-400 uppercase">Incoming Requests</div>
            <div className="text-4xl font-bold text-blue-400 mt-2">
              {formatNumber(incoming)}
            </div>
            <div className="text-xs text-gray-500 mt-1">+ per sec</div>
          </div>

          {/* Queue */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="text-sm text-gray-400 uppercase">Queue Length</div>
            <div className="text-4xl font-bold text-yellow-400 mt-2">
              {formatNumber(queue)}
            </div>
            <div className="w-full bg-gray-700 h-2 mt-3 rounded-full overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (queue / 15000) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Processing */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="text-sm text-gray-400 uppercase">Processing Now</div>
            <div className="text-4xl font-bold text-purple-400 mt-2">
              {formatNumber(processing)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Workers active: 8</div>
          </div>

          {/* Final Results */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="text-sm text-gray-400 uppercase">Successful</div>
            <div className="text-2xl font-bold text-green-400">{formatNumber(success)}</div>
            <div className="text-sm text-gray-400 uppercase mt-2">Rejected</div>
            <div className="text-2xl font-bold text-red-400">{formatNumber(rejected)}</div>
          </div>
        </div>

        {/* Inventory & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between">
            <span className="text-xl text-gray-300">Inventory Left:</span>
            <span className="text-3xl font-bold text-red-500">{inventory}</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between">
            <span className="text-xl text-gray-300">System Status:</span>
            <span className="text-3xl font-bold text-green-400">{systemStatus}</span>
          </div>
        </div>

        {/* Visual Queue Animation */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></span>
            LIVE REQUEST QUEUE (each ⬜ ≈ 500 requests)
          </h2>
          <div className="flex flex-wrap gap-2 text-3xl mb-4" ref={containerRef}>
            {queueBlocks.map((block, idx) => (
              <div
                key={idx}
                className="transform transition-all duration-500 hover:scale-110"
                style={{ animation: `fadeIn 0.5s ease-in-out ${idx * 0.05}s` }}
              >
                {block}
              </div>
            ))}
            {queueBlocks.length === 0 && (
              <span className="text-gray-500 text-lg">Queue empty</span>
            )}
          </div>

          {/* Processing visualization: some blocks moving to success/reject */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-900 p-4 rounded-lg border border-green-800">
              <div className="text-green-400 font-bold mb-2">✅ Success (last 5)</div>
              <div className="flex gap-2 text-2xl">
                {successIcons.map((icon, i) => (
                  <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-red-800">
              <div className="text-red-400 font-bold mb-2">❌ Rejected (last 5)</div>
              <div className="flex gap-2 text-2xl">
                {rejectIcons.map((icon, i) => (
                  <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Flowing animation description */}
          <p className="text-xs text-gray-500 mt-4 border-t border-gray-700 pt-3">
            ⏳ Incoming → Queue → Processing → Success/Rejected. Simulated real‑time traffic.
          </p>
        </div>

        {/* Extra stats: Workers, throughput */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-3">System Throughput</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-gray-400">Incoming rate</div>
              <div className="text-2xl text-blue-400">~50/s</div>
            </div>
            <div>
              <div className="text-gray-400">Queue drain</div>
              <div className="text-2xl text-yellow-400">~30/s</div>
            </div>
            <div>
              <div className="text-gray-400">Success rate</div>
              <div className="text-2xl text-green-400">~1/s</div>
            </div>
            <div>
              <div className="text-gray-400">Reject rate</div>
              <div className="text-2xl text-red-400">~55/s</div>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-gray-600 text-xs mt-6">
          * Simulated visualization for demonstration — numbers change every second.
        </p>
      </div>

      {/* Global styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Settings;