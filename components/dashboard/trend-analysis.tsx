"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { useState } from "react"

export function TrendAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  const trendData = {
    "7d": [
      { day: "Mon", calls: 380, csat: 3.1, duration: 485 },
      { day: "Tue", calls: 420, csat: 2.8, duration: 465 },
      { day: "Wed", calls: 580, csat: 3.4, duration: 445 },
      { day: "Thu", calls: 650, csat: 3.7, duration: 420 },
      { day: "Fri", calls: 720, csat: 3.2, duration: 480 },
      { day: "Sat", calls: 480, csat: 3.9, duration: 395 },
      { day: "Sun", calls: 280, csat: 3.6, duration: 350 },
    ],
    "30d": [
      { day: "Week 1", calls: 3200, csat: 3.1, duration: 465 },
      { day: "Week 2", calls: 3650, csat: 2.9, duration: 485 },
      { day: "Week 3", calls: 4100, csat: 3.4, duration: 445 },
      { day: "Week 4", calls: 4205, csat: 3.6, duration: 420 },
    ],
    "90d": [
      { day: "Month 1", calls: 12800, csat: 3.2, duration: 475 },
      { day: "Month 2", calls: 14200, csat: 3.0, duration: 465 },
      { day: "Month 3", calls: 16155, csat: 3.6, duration: 435 },
    ],
  }

  const currentData = trendData[selectedPeriod as keyof typeof trendData]

  // Helper function to create SVG path for line chart
  const createLinePath = (values: number[], width: number, height: number) => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1 // Avoid division by zero

    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })

    return `M ${points.join(" L ")}`
  }

  // Helper function to create data points for circles
  const createDataPoints = (values: number[], width: number, height: number) => {
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1

    return values.map((value, index) => ({
      x: (index / (values.length - 1)) * width,
      y: height - ((value - min) / range) * height,
      value: value,
    }))
  }

  const chartWidth = 280
  const chartHeight = 80

  // Get data arrays
  const callsData = currentData.map((d) => d.calls)
  const csatData = currentData.map((d) => d.csat)
  const durationData = currentData.map((d) => d.duration)

  // Create paths and points
  const callsPath = createLinePath(callsData, chartWidth, chartHeight)
  const csatPath = createLinePath(csatData, chartWidth, chartHeight)
  const durationPath = createLinePath(durationData, chartWidth, chartHeight)

  const callsPoints = createDataPoints(callsData, chartWidth, chartHeight)
  const csatPoints = createDataPoints(csatData, chartWidth, chartHeight)
  const durationPoints = createDataPoints(durationData, chartWidth, chartHeight)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Trend Analysis</h2>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-sm border rounded-md px-2 py-1"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call Volume Trend */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Call Volume</h3>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>

          {/* Y-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{Math.max(...callsData).toLocaleString()}</span>
            <span>{Math.min(...callsData).toLocaleString()}</span>
          </div>

          {/* Line Chart */}
          <div className="relative mb-4">
            <svg width={chartWidth} height={chartHeight} className="overflow-visible">
              {/* Grid lines */}
              <defs>
                <pattern id="grid-calls" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-calls)" />

              {/* Area under the line */}
              <defs>
                <linearGradient id="callsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path d={`${callsPath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`} fill="url(#callsGradient)" />

              {/* Main line */}
              <path
                d={callsPath}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {callsPoints.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth="2"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                  {/* Tooltip on hover */}
                  <title>{`${currentData[index].day}: ${point.value.toLocaleString()} calls`}</title>
                </g>
              ))}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            {currentData.map((data, index) => (
              <span key={index} className="text-center">
                {data.day}
              </span>
            ))}
          </div>

          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">
              {currentData[currentData.length - 1].calls.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600 ml-2">calls today</span>
          </div>
        </div>

        {/* CSAT Trend */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">CSAT Score</h3>
            <div className="flex items-center space-x-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">-8.2%</span>
            </div>
          </div>

          {/* Y-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{Math.max(...csatData).toFixed(1)}</span>
            <span>{Math.min(...csatData).toFixed(1)}</span>
          </div>

          {/* Line Chart */}
          <div className="relative mb-4">
            <svg width={chartWidth} height={chartHeight} className="overflow-visible">
              {/* Grid lines */}
              <rect width="100%" height="100%" fill="url(#grid-calls)" />

              {/* Area under the line */}
              <defs>
                <linearGradient id="csatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path d={`${csatPath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`} fill="url(#csatGradient)" />

              {/* Main line */}
              <path
                d={csatPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {csatPoints.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#f59e0b"
                    stroke="white"
                    strokeWidth="2"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                  <title>{`${currentData[index].day}: ${point.value.toFixed(1)}/5.0 CSAT`}</title>
                </g>
              ))}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            {currentData.map((data, index) => (
              <span key={index} className="text-center">
                {data.day}
              </span>
            ))}
          </div>

          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">
              {currentData[currentData.length - 1].csat.toFixed(1)}
            </span>
            <span className="text-sm text-gray-600 ml-2">/ 5.0</span>
          </div>
        </div>

        {/* Duration Trend */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Avg Duration</h3>
            <div className="flex items-center space-x-1 text-red-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+15.3%</span>
            </div>
          </div>

          {/* Y-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>
              {Math.floor(Math.max(...durationData) / 60)}m {Math.max(...durationData) % 60}s
            </span>
            <span>
              {Math.floor(Math.min(...durationData) / 60)}m {Math.min(...durationData) % 60}s
            </span>
          </div>

          {/* Line Chart */}
          <div className="relative mb-4">
            <svg width={chartWidth} height={chartHeight} className="overflow-visible">
              {/* Grid lines */}
              <rect width="100%" height="100%" fill="url(#grid-calls)" />

              {/* Area under the line */}
              <defs>
                <linearGradient id="durationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d={`${durationPath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`}
                fill="url(#durationGradient)"
              />

              {/* Main line */}
              <path
                d={durationPath}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {durationPoints.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#8b5cf6"
                    stroke="white"
                    strokeWidth="2"
                    className="hover:r-6 transition-all cursor-pointer"
                  />
                  <title>{`${currentData[index].day}: ${Math.floor(point.value / 60)}m ${point.value % 60}s`}</title>
                </g>
              ))}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            {currentData.map((data, index) => (
              <span key={index} className="text-center">
                {data.day}
              </span>
            ))}
          </div>

          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900">
              {Math.floor(currentData[currentData.length - 1].duration / 60)}m{" "}
              {currentData[currentData.length - 1].duration % 60}s
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
