"use client"

import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { categoryColors } from "./insight-category-panel"
import { MediumLevelInsights } from "./medium-level-insights"

interface InsightCardProps {
  title: string
  percentage: string
  rating: string
  time: string
  sentiment: "Good" | "Neutral" | "Bad"
  description: string
  index?: number
  onExpandChange?: (title: string, isExpanded: boolean) => void
  onBreakdownVisibilityChange?: (title: string, isVisible: boolean) => void
}

export function InsightCard({
  title,
  percentage,
  rating,
  time,
  sentiment,
  description,
  index = 0,
  onExpandChange,
  onBreakdownVisibilityChange,
}: InsightCardProps) {
  const [expanded, setExpanded] = useState(false)
  const breakdownButtonRef = useRef<HTMLButtonElement>(null)

  // Calculate staggered delay based on card index
  // Start with a slightly longer delay to allow category animations to complete first
  const delay = 0.2 + index * 0.1

  // Get the color for this insight category
  const color = categoryColors[title.split(" Issues")[0] as keyof typeof categoryColors] || "#9E9E9E"

  // Set up intersection observer for the breakdown button
  useEffect(() => {
    if (!breakdownButtonRef.current || !onBreakdownVisibilityChange) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger when expanded
        if (expanded) {
          onBreakdownVisibilityChange(title, entry.isIntersecting)
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -50px 0px", // Trigger when 50px from bottom of viewport
      },
    )

    observer.observe(breakdownButtonRef.current)

    return () => {
      observer.disconnect()
    }
  }, [expanded, title, onBreakdownVisibilityChange])

  const handleExpandToggle = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
    onExpandChange?.(title, newExpanded)

    // Reset visibility tracking when collapsing
    if (!newExpanded) {
      onBreakdownVisibilityChange?.(title, true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      className="w-full bg-white rounded-md shadow-sm border mb-4"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">{percentage}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">{rating}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">{time}</span>
            </div>
            <div
              className={`px-2 py-1 rounded-md flex items-center ${
                sentiment === "Good" ? "bg-green-100" : sentiment === "Bad" ? "bg-red-100" : "bg-yellow-100"
              }`}
            >
              <span
                className={`text-sm ${
                  sentiment === "Good" ? "text-green-800" : sentiment === "Bad" ? "text-red-800" : "text-yellow-800"
                }`}
              >
                Sentiment: {sentiment}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{description}</p>

        <button
          ref={breakdownButtonRef}
          onClick={handleExpandToggle}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronDown className={`mr-1 transform ${expanded ? "rotate-180" : ""} transition-transform`} size={16} />
          See Breakdown
        </button>

        <AnimatePresence>{expanded && <MediumLevelInsights category={title} />}</AnimatePresence>
      </div>

      {/* Progress bar at the bottom with category color */}
      <div
        className="h-1 rounded-b-md"
        style={{
          width: percentage.replace("%", "") + "%",
          backgroundColor: color,
        }}
      ></div>
    </motion.div>
  )
}
