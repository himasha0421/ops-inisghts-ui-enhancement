"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface CategoryData {
  title: string
  percentage: number
  count: number
  color: string
}

interface InsightsDistributionHeroProps {
  categories: CategoryData[]
  totalCount: number
}

export function InsightsDistributionHero({ categories, totalCount }: InsightsDistributionHeroProps) {
  // Sort categories by percentage (descending) for better visualization
  const sortedCategories = [...categories].sort((a, b) => b.percentage - a.percentage)

  // Take only the top 5 categories for the legend to avoid overcrowding
  const topCategories = sortedCategories.slice(0, 5)

  // Group the rest as "Other"
  const otherCategories = sortedCategories.slice(5)
  const otherPercentage = otherCategories.reduce((sum, cat) => sum + cat.percentage, 0)
  const otherCount = otherCategories.reduce((sum, cat) => sum + cat.count, 0)

  // State to track which category is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update tooltip size when it changes
  useEffect(() => {
    if (tooltipRef.current && hoveredIndex !== null) {
      const { width, height } = tooltipRef.current.getBoundingClientRect()
      setTooltipSize({ width, height })
    }
  }, [hoveredIndex])

  // Handle mouse enter on a category segment
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  // Handle mouse move to update tooltip position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    // Get the position relative to the container
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate the tooltip position to ensure it stays within the container
    const containerWidth = rect.width

    // Position the tooltip above the cursor by default
    let tooltipX = x
    let tooltipY = y - 5 // Small gap above cursor

    // Adjust X position to keep tooltip within container
    if (tooltipSize.width > 0) {
      // Ensure tooltip doesn't go off the right edge
      if (tooltipX + tooltipSize.width / 2 > containerWidth) {
        tooltipX = containerWidth - tooltipSize.width / 2
      }

      // Ensure tooltip doesn't go off the left edge
      if (tooltipX - tooltipSize.width / 2 < 0) {
        tooltipX = tooltipSize.width / 2
      }
    }

    // Ensure tooltip appears above the bar, not over it
    tooltipY = Math.max(tooltipSize.height + 5, tooltipY)

    setTooltipPosition({ x: tooltipX, y: tooltipY })
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white p-3 rounded-md border mb-4 relative"
    >
      <div className="flex justify-between items-center mb-1">
        <div>
          <h2 className="text-sm font-semibold">Operational Insights Distribution</h2>
          <p className="text-xs text-gray-500">{totalCount.toLocaleString()} total insights</p>
        </div>
        <div className="flex items-center text-xs">
          <span className="text-gray-500 mr-1">Top categories shown</span>
        </div>
      </div>

      <div className="h-5 bg-gray-100 rounded-md overflow-hidden flex mb-2 relative" onMouseMove={handleMouseMove}>
        {sortedCategories.map((category, index) => (
          <div
            key={index}
            className="h-full transition-all duration-300 ease-in-out hover:opacity-80 cursor-pointer relative"
            style={{
              width: `${category.percentage}%`,
              backgroundColor: category.color,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      {/* Tooltip that appears on hover */}
      {hoveredIndex !== null && (
        <div
          ref={tooltipRef}
          className="absolute bg-gray-900 text-white p-1.5 rounded shadow-lg z-10 text-xs pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(-50%, -100%)",
            opacity: 0.9,
            minWidth: "160px",
          }}
        >
          <div className="font-medium">{sortedCategories[hoveredIndex].title}</div>
          <div className="flex justify-between gap-4">
            <span>{sortedCategories[hoveredIndex].count.toLocaleString()} calls</span>
            <span>{sortedCategories[hoveredIndex].percentage}% of total</span>
          </div>
          {/* Arrow pointing down */}
          <div
            className="absolute w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"
            style={{
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {topCategories.map((category, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer hover:bg-gray-50 rounded transition-colors"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: category.color }} />
            <span className="text-xs">
              {category.title} ({category.count.toLocaleString()})
            </span>
          </div>
        ))}
        {otherPercentage > 0 && (
          <div className="flex items-center cursor-pointer hover:bg-gray-50 rounded transition-colors">
            <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: "#9E9E9E" }} />
            <span className="text-xs">Other ({otherCount.toLocaleString()})</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
