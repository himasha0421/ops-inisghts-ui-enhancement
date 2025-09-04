"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

interface InsightThemeCardProps {
  title: string
  description: string
  category: string
  subcategory: string
  impact: "high" | "medium" | "low"
  frequency: number
  trend: "up" | "down" | "stable"
  index: number
  onClick?: () => void
}

export function InsightThemeCard({
  title,
  description,
  category,
  subcategory,
  impact,
  frequency,
  trend,
  index,
  onClick,
}: InsightThemeCardProps) {
  const getImpactColor = () => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">{frequency} incidents</span>
          <span className={`px-2 py-1 text-xs rounded-md border ${getImpactColor()}`}>
            {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <div className="flex items-center text-xs text-blue-600">
          <span className="font-medium">Category:</span>
          <span className="ml-1">{category}</span>
          <ArrowRight className="w-3 h-3 mx-1" />
          <span>{subcategory}</span>
        </div>
      </div>
    </motion.div>
  )
}
