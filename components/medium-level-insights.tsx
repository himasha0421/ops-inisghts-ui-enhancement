"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingDown, AlertTriangle } from "lucide-react"

interface MediumLevelInsightsProps {
  category: string
}

export function MediumLevelInsights({ category }: MediumLevelInsightsProps) {
  // Sample medium-level insights data
  const mediumInsights = [
    {
      title: "Packaging Quality Issues",
      impact: "High",
      frequency: "342 incidents",
      trend: "increasing",
      description: "Damaged items due to inadequate packaging materials and poor handling procedures.",
      icon: <AlertTriangle className="text-red-500" size={20} />,
    },
    {
      title: "Inventory System Discrepancies",
      impact: "Medium",
      frequency: "198 incidents",
      trend: "stable",
      description: "Real-time inventory not matching actual stock levels causing fulfillment errors.",
      icon: <BarChart3 className="text-orange-500" size={20} />,
    },
    {
      title: "Address Verification Failures",
      impact: "Medium",
      frequency: "156 incidents",
      trend: "decreasing",
      description: "Carrier restrictions and incomplete address information causing delivery failures.",
      icon: <TrendingDown className="text-blue-500" size={20} />,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 border-l-4 border-blue-500 p-4 mt-4"
    >
      <h4 className="text-md font-semibold mb-3 text-gray-800">Medium-Level Breakdown</h4>
      <div className="space-y-3">
        {mediumInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-3 rounded-md border"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">{insight.icon}</div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-medium">{insight.title}</h5>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        insight.impact === "High"
                          ? "bg-red-100 text-red-800"
                          : insight.impact === "Medium"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {insight.impact} Impact
                    </span>
                    <span className="text-xs text-gray-500">{insight.frequency}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
