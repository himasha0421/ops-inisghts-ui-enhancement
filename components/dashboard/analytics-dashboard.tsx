"use client"

import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"

// Line Chart Component for Laivly Scores
function LaivlyScoreChart({
  title,
  positiveData,
  negativeData,
  selectedPeriod,
}: {
  title: string
  positiveData: number[]
  negativeData: number[]
  selectedPeriod: string
}) {
  const chartWidth = 400
  const chartHeight = 250
  const padding = { top: 20, right: 20, bottom: 40, left: 40 }

  // Create SVG path for line chart
  const createLinePath = (values: number[]) => {
    const maxValue = 100
    const minValue = 0
    const range = maxValue - minValue

    const points = values
      .map((value, index) => {
        const x = padding.left + (index / (values.length - 1)) * (chartWidth - padding.left - padding.right)
        const y =
          padding.top +
          (chartHeight - padding.top - padding.bottom) -
          ((value - minValue) / range) * (chartHeight - padding.top - padding.bottom)
        return `${x},${y}`
      })
      .join(" ")

    return points
  }

  const positivePoints = createLinePath(positiveData)
  const negativePoints = createLinePath(negativeData)

  // Get period labels
  const getPeriodLabels = () => {
    switch (selectedPeriod) {
      case "24h":
        return ["6AM", "12PM", "6PM", "12AM"]
      case "7d":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      case "30d":
        return ["Week 1", "Week 2", "Week 3", "Week 4"]
      case "90d":
        return ["Month 1", "Month 2", "Month 3"]
      case "6m":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      case "1y":
        return ["Q1", "Q2", "Q3", "Q4"]
      default:
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  }

  const labels = getPeriodLabels()
  const currentPositive = positiveData[positiveData.length - 1]
  const currentNegative = negativeData[negativeData.length - 1]

  // Y-axis values
  const yAxisValues = [100, 80, 60, 40, 20, 0]

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>

      {/* Legend */}
      <div className="flex justify-center mb-4 space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-green-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Positive</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-3 bg-red-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Negative</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white">
        <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
          {/* Grid lines - Horizontal */}
          {yAxisValues.map((value, index) => {
            const y = padding.top + (index / (yAxisValues.length - 1)) * (chartHeight - padding.top - padding.bottom)
            return (
              <line
                key={`h-grid-${index}`}
                x1={padding.left}
                y1={y}
                x2={chartWidth - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            )
          })}

          {/* Grid lines - Vertical */}
          {labels.map((_, index) => {
            const x = padding.left + (index / (labels.length - 1)) * (chartWidth - padding.left - padding.right)
            return (
              <line
                key={`v-grid-${index}`}
                x1={x}
                y1={padding.top}
                x2={x}
                y2={chartHeight - padding.bottom}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            )
          })}

          {/* Y-axis labels */}
          {yAxisValues.map((value, index) => {
            const y = padding.top + (index / (yAxisValues.length - 1)) * (chartHeight - padding.top - padding.bottom)
            return (
              <text
                key={`y-label-${index}`}
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-gray-500"
              >
                {value}
              </text>
            )
          })}

          {/* X-axis labels */}
          {labels.map((label, index) => {
            const x = padding.left + (index / (labels.length - 1)) * (chartWidth - padding.left - padding.right)
            return (
              <text
                key={`x-label-${index}`}
                x={x}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {label}
              </text>
            )
          })}

          {/* Positive trend line */}
          <polyline
            points={positivePoints}
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Negative trend line */}
          <polyline
            points={negativePoints}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points for positive line */}
          {positiveData.map((value, index) => {
            const x = padding.left + (index / (positiveData.length - 1)) * (chartWidth - padding.left - padding.right)
            const y =
              padding.top +
              (chartHeight - padding.top - padding.bottom) -
              ((value - 0) / 100) * (chartHeight - padding.top - padding.bottom)
            return (
              <circle
                key={`pos-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="#22c55e"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
              >
                <title>{`${labels[index]}: ${value}% positive`}</title>
              </circle>
            )
          })}

          {/* Data points for negative line */}
          {negativeData.map((value, index) => {
            const x = padding.left + (index / (negativeData.length - 1)) * (chartWidth - padding.left - padding.right)
            const y =
              padding.top +
              (chartHeight - padding.top - padding.bottom) -
              ((value - 0) / 100) * (chartHeight - padding.top - padding.bottom)
            return (
              <circle
                key={`neg-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="#ef4444"
                stroke="white"
                strokeWidth="2"
                className="hover:r-6 transition-all cursor-pointer"
              >
                <title>{`${labels[index]}: ${value}% negative`}</title>
              </circle>
            )
          })}
        </svg>
      </div>

      {/* Current Values */}
      <div className="flex justify-between mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Current Positive: {currentPositive}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Current Negative: {currentNegative}%</span>
        </div>
      </div>
    </div>
  )
}

// Enhanced Bar Chart Component with cleaner styling
function BarChart({ data, title, color = "#3b82f6" }: { data: any[]; title: string; color?: string }) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-gray-900">{item.value.toLocaleString()}</span>
            </div>
            <div className="relative bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out group-hover:shadow-lg"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || color,
                  background: item.color
                    ? `linear-gradient(90deg, ${item.color}, ${item.color}dd)`
                    : `linear-gradient(90deg, ${color}, ${color}dd)`,
                }}
              />
              <div
                className="absolute top-0 left-0 h-full rounded-full opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AnalyticsDashboard({ selectedPeriod = "7d" }: { selectedPeriod?: string }) {
  // Laivly Score data for different periods
  const laivlyScoreData = {
    "24h": {
      customerExperience: {
        positive: [72, 68, 75, 71],
        negative: [28, 32, 25, 29],
      },
      problemSolving: {
        positive: [65, 70, 78, 82],
        negative: [35, 30, 22, 18],
      },
      communicationSkills: {
        positive: [80, 75, 78, 85],
        negative: [20, 25, 22, 15],
      },
    },
    "7d": {
      customerExperience: {
        positive: [68, 72, 75, 71, 78, 82, 79],
        negative: [32, 28, 25, 29, 22, 18, 21],
      },
      problemSolving: {
        positive: [62, 65, 70, 68, 75, 78, 82],
        negative: [38, 35, 30, 32, 25, 22, 18],
      },
      communicationSkills: {
        positive: [75, 78, 82, 79, 85, 88, 86],
        negative: [25, 22, 18, 21, 15, 12, 14],
      },
    },
    "30d": {
      customerExperience: {
        positive: [65, 70, 75, 78],
        negative: [35, 30, 25, 22],
      },
      problemSolving: {
        positive: [60, 68, 72, 80],
        negative: [40, 32, 28, 20],
      },
      communicationSkills: {
        positive: [72, 78, 82, 85],
        negative: [28, 22, 18, 15],
      },
    },
    "90d": {
      customerExperience: {
        positive: [62, 68, 75],
        negative: [38, 32, 25],
      },
      problemSolving: {
        positive: [58, 65, 78],
        negative: [42, 35, 22],
      },
      communicationSkills: {
        positive: [70, 78, 85],
        negative: [30, 22, 15],
      },
    },
    "6m": {
      customerExperience: {
        positive: [58, 62, 68, 72, 75, 78],
        negative: [42, 38, 32, 28, 25, 22],
      },
      problemSolving: {
        positive: [55, 60, 65, 70, 75, 80],
        negative: [45, 40, 35, 30, 25, 20],
      },
      communicationSkills: {
        positive: [68, 72, 75, 78, 82, 85],
        negative: [32, 28, 25, 22, 18, 15],
      },
    },
    "1y": {
      customerExperience: {
        positive: [55, 65, 72, 78],
        negative: [45, 35, 28, 22],
      },
      problemSolving: {
        positive: [52, 62, 70, 80],
        negative: [48, 38, 30, 20],
      },
      communicationSkills: {
        positive: [65, 72, 78, 85],
        negative: [35, 28, 22, 15],
      },
    },
  }

  // Normalize selectedPeriod and provide fallback
  const normalizedPeriod = selectedPeriod?.toLowerCase().replace(/\s+/g, "") || "7d"

  // Map common period formats to our data keys
  const periodMapping: { [key: string]: string } = {
    today: "24h",
    yesterday: "24h",
    last7days: "7d",
    last30days: "30d",
    thismonth: "30d",
    lastmonth: "30d",
    "24h": "24h",
    "7d": "7d",
    "30d": "30d",
    "90d": "90d",
    "6m": "6m",
    "1y": "1y",
  }

  const mappedPeriod = periodMapping[normalizedPeriod] || "7d"
  const currentData = laivlyScoreData[mappedPeriod as keyof typeof laivlyScoreData] || laivlyScoreData["7d"]

  // Analytics data with sentiment drivers
  const analyticsData = {
    "24h": {
      callVolumeDrivers: [
        { label: "Packaging Quality Issues", value: 89, color: "#ef4444" },
        { label: "Payment Processing Delays", value: 67, color: "#f97316" },
        { label: "Account Management Issues", value: 45, color: "#eab308" },
        { label: "Gift Card System Problems", value: 32, color: "#22c55e" },
        { label: "Rewards Program Errors", value: 28, color: "#3b82f6" },
      ],
      negativeSentimentDrivers: [
        { label: "System Outages", value: 92, color: "#dc2626" },
        { label: "Long Wait Times", value: 87, color: "#ef4444" },
        { label: "Billing Errors", value: 78, color: "#f87171" },
        { label: "Product Defects", value: 65, color: "#fca5a5" },
        { label: "Poor Communication", value: 58, color: "#fecaca" },
      ],
      positiveSentimentDrivers: [
        { label: "Quick Resolution", value: 95, color: "#16a34a" },
        { label: "Helpful Agent", value: 89, color: "#22c55e" },
        { label: "Clear Instructions", value: 82, color: "#4ade80" },
        { label: "Follow-up Service", value: 76, color: "#86efac" },
        { label: "Product Knowledge", value: 71, color: "#bbf7d0" },
      ],
    },
    "7d": {
      callVolumeDrivers: [
        { label: "Packaging Quality Issues", value: 1667, color: "#ef4444" },
        { label: "Payment Processing Delays", value: 546, color: "#f97316" },
        { label: "Account Management Issues", value: 423, color: "#eab308" },
        { label: "Gift Card System Problems", value: 245, color: "#22c55e" },
        { label: "Rewards Program Errors", value: 198, color: "#3b82f6" },
      ],
      negativeSentimentDrivers: [
        { label: "System Outages", value: 1245, color: "#dc2626" },
        { label: "Long Wait Times", value: 987, color: "#ef4444" },
        { label: "Billing Errors", value: 756, color: "#f87171" },
        { label: "Product Defects", value: 623, color: "#fca5a5" },
        { label: "Poor Communication", value: 534, color: "#fecaca" },
      ],
      positiveSentimentDrivers: [
        { label: "Quick Resolution", value: 1456, color: "#16a34a" },
        { label: "Helpful Agent", value: 1234, color: "#22c55e" },
        { label: "Clear Instructions", value: 987, color: "#4ade80" },
        { label: "Follow-up Service", value: 823, color: "#86efac" },
        { label: "Product Knowledge", value: 756, color: "#bbf7d0" },
      ],
    },
    "30d": {
      callVolumeDrivers: [
        { label: "Packaging Quality Issues", value: 6234, color: "#ef4444" },
        { label: "Payment Processing Delays", value: 2156, color: "#f97316" },
        { label: "Account Management Issues", value: 1823, color: "#eab308" },
        { label: "Gift Card System Problems", value: 1045, color: "#22c55e" },
        { label: "Rewards Program Errors", value: 876, color: "#3b82f6" },
      ],
      negativeSentimentDrivers: [
        { label: "System Outages", value: 4567, color: "#dc2626" },
        { label: "Long Wait Times", value: 3456, color: "#ef4444" },
        { label: "Billing Errors", value: 2789, color: "#f87171" },
        { label: "Product Defects", value: 2234, color: "#fca5a5" },
        { label: "Poor Communication", value: 1987, color: "#fecaca" },
      ],
      positiveSentimentDrivers: [
        { label: "Quick Resolution", value: 5234, color: "#16a34a" },
        { label: "Helpful Agent", value: 4567, color: "#22c55e" },
        { label: "Clear Instructions", value: 3789, color: "#4ade80" },
        { label: "Follow-up Service", value: 3234, color: "#86efac" },
        { label: "Product Knowledge", value: 2876, color: "#bbf7d0" },
      ],
    },
    "90d": {
      callVolumeDrivers: [
        { label: "Packaging Quality Issues", value: 18234, color: "#ef4444" },
        { label: "Payment Processing Delays", value: 6456, color: "#f97316" },
        { label: "Account Management Issues", value: 5423, color: "#eab308" },
        { label: "Gift Card System Problems", value: 3245, color: "#22c55e" },
        { label: "Rewards Program Errors", value: 2876, color: "#3b82f6" },
      ],
      negativeSentimentDrivers: [
        { label: "System Outages", value: 13567, color: "#dc2626" },
        { label: "Long Wait Times", value: 10456, color: "#ef4444" },
        { label: "Billing Errors", value: 8789, color: "#f87171" },
        { label: "Product Defects", value: 7234, color: "#fca5a5" },
        { label: "Poor Communication", value: 6987, color: "#fecaca" },
      ],
      positiveSentimentDrivers: [
        { label: "Quick Resolution", value: 15234, color: "#16a34a" },
        { label: "Helpful Agent", value: 13567, color: "#22c55e" },
        { label: "Clear Instructions", value: 11789, color: "#4ade80" },
        { label: "Follow-up Service", value: 9234, color: "#86efac" },
        { label: "Product Knowledge", value: 8876, color: "#bbf7d0" },
      ],
    },
    "6m": {
      callVolumeDrivers: [
        { label: "Packaging Quality Issues", value: 45234, color: "#ef4444" },
        { label: "Payment Processing Delays", value: 16456, color: "#f97316" },
        { label: "Account Management Issues", value: 13423, color: "#eab308" },
        { label: "Gift Card System Problems", value: 8245, color: "#22c55e" },
        { label: "Rewards Program Errors", value: 7876, color: "#3b82f6" },
      ],
      negativeSentimentDrivers: [
        { label: "System Outages", value: 33567, color: "#dc2626" },
        { label: "Long Wait Times", value: 26456, color: "#ef4444" },
        { label: "Billing Errors", value: 21789, color: "#f87171" },
        { label: "Product Defects", value: 18234, color: "#fca5a5" },
        { label: "Poor Communication", value: 16987, color: "#fecaca" },
      ],
      positiveSentimentDrivers: [
        { label: "Quick Resolution", value: 38234, color: "#16a34a" },
        { label: "Helpful Agent", value: 33567, color: "#22c55e" },
        { label: "Clear Instructions", value: 28789, color: "#4ade80" },
        { label: "Follow-up Service", value: 24234, color: "#86efac" },
        { label: "Product Knowledge", value: 21876, color: "#bbf7d0" },
      ],
    },
    "1y": {
      callVolumeDrivers: [
        { label: "Packaging Quality Issues", value: 89234, color: "#ef4444" },
        { label: "Payment Processing Delays", value: 32456, color: "#f97316" },
        { label: "Account Management Issues", value: 26423, color: "#eab308" },
        { label: "Gift Card System Problems", value: 16245, color: "#22c55e" },
        { label: "Rewards Program Errors", value: 14876, color: "#3b82f6" },
      ],
      negativeSentimentDrivers: [
        { label: "System Outages", value: 67567, color: "#dc2626" },
        { label: "Long Wait Times", value: 52456, color: "#ef4444" },
        { label: "Billing Errors", value: 43789, color: "#f87171" },
        { label: "Product Defects", value: 36234, color: "#fca5a5" },
        { label: "Poor Communication", value: 32987, color: "#fecaca" },
      ],
      positiveSentimentDrivers: [
        { label: "Quick Resolution", value: 76234, color: "#16a34a" },
        { label: "Helpful Agent", value: 67567, color: "#22c55e" },
        { label: "Clear Instructions", value: 57789, color: "#4ade80" },
        { label: "Follow-up Service", value: 48234, color: "#86efac" },
        { label: "Product Knowledge", value: 43876, color: "#bbf7d0" },
      ],
    },
  }

  const currentAnalyticsData = analyticsData[mappedPeriod as keyof typeof analyticsData] || analyticsData["7d"]

  // Safety check to ensure currentData exists
  if (!currentData || !currentAnalyticsData) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Analytics Dashboard
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">Loading analytics data...</div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold flex items-center text-gray-900">
          <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
          Laivly Score Trends
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Row 1 - Laivly Score Charts */}
        <motion.div
          key={`customer-experience-${mappedPeriod}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <LaivlyScoreChart
            title="Customer Experience"
            positiveData={currentData.customerExperience.positive}
            negativeData={currentData.customerExperience.negative}
            selectedPeriod={mappedPeriod}
          />
        </motion.div>

        <motion.div
          key={`problem-solving-${mappedPeriod}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <LaivlyScoreChart
            title="Problem Solving"
            positiveData={currentData.problemSolving.positive}
            negativeData={currentData.problemSolving.negative}
            selectedPeriod={mappedPeriod}
          />
        </motion.div>

        <motion.div
          key={`communication-skills-${mappedPeriod}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <LaivlyScoreChart
            title="Communication Skills"
            positiveData={currentData.communicationSkills.positive}
            negativeData={currentData.communicationSkills.negative}
            selectedPeriod={mappedPeriod}
          />
        </motion.div>

        {/* Row 2 - Enhanced Bar Charts */}
        <motion.div
          key={`call-drivers-${mappedPeriod}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <BarChart data={currentAnalyticsData.callVolumeDrivers} title="Top 5 Call Volume Drivers" />
        </motion.div>

        <motion.div
          key={`negative-sentiment-${mappedPeriod}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <BarChart data={currentAnalyticsData.negativeSentimentDrivers} title="Top 5 Negative Sentiment Drivers" />
        </motion.div>

        <motion.div
          key={`positive-sentiment-${mappedPeriod}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <BarChart data={currentAnalyticsData.positiveSentimentDrivers} title="Top 5 Positive Sentiment Drivers" />
        </motion.div>
      </div>
    </motion.div>
  )
}
