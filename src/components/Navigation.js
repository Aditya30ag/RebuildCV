import React from 'react'

export default function Navigation(handleonchange) {
  return (
    <div>
          <nav className="border-b border-gray-800 backdrop-blur-lg bg-gray-900 z-50 fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                RebuildCV
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Blog</a>
              <button
                onClick={handleonchange}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
              >
                Try for Free
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
