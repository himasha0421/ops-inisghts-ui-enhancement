"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Phone, Star, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeType: "increase" | "decrease" | "stable"
  icon: React.ReactNode
  index: number
}

function MetricCard({ title, value, change, changeType, icon, index }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-600"
      case "decrease":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg border shadow-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
        <div className="flex items-center space-x-1">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </motion.div>
  )
}

export function KeyMetricsOverview() {
  const metrics = [
    {
      title: "Total Calls",
      value: "4,205",
      change: 12.5,
      changeType: "increase" as const,
      icon: <Phone className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Avg CSAT Score",
      value: "3.4",
      change: -8.2,
      changeType: "decrease" as const,
      icon: <Star className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Avg Call Duration",
      value: "7m 31s",
      change: 15.3,
      changeType: "increase" as const,
      icon: <Clock className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Positive Sentiment",
      value: "68%",
      change: -5.1,
      changeType: "decrease" as const,
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Key Metrics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.title} {...metric} index={index} />
        ))}
      </div>
    </div>
  )
}
