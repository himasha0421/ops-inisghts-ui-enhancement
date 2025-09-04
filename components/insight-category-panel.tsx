"use client"

import { motion } from "framer-motion"

// Define a consistent color palette for categories
export const categoryColors = {
  "Systemic Operational Inefficiencies": "#FF5252", // Red
  "Promotional and Store Experience": "#FF9800", // Orange
  "Account Management Challenges": "#FFC107", // Amber
  "Payment and Order Processing": "#4CAF50", // Green
  "Gift Card System Challenges": "#2196F3", // Blue
  "Rewards Program System": "#673AB7", // Deep Purple
  "Rigid Policies and System": "#E91E63", // Pink
  "Communication and Information": "#00BCD4", // Cyan
  "Third-Party Dependency Issues": "#9C27B0", // Purple
  "Birthday Reward and Updates": "#3F51B5", // Indigo
  "Account Merging Challenges": "#009688", // Teal
  "Gift Card Resolution Challenges": "#8BC34A", // Light Green
  "Rewards Program System Failures": "#FFEB3B", // Yellow
  "Birthday Reward System Challenges": "#795548", // Brown
}

interface InsightCategoryProps {
  title: string
  isActive?: boolean
  count?: number
  index: number
}

export function InsightCategory({ title, isActive = false, count, index }: InsightCategoryProps) {
  // Calculate staggered delay based on category index
  const delay = 0.05 + index * 0.03
  const color = categoryColors[title as keyof typeof categoryColors] || "#9E9E9E"

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
      className={`flex items-center mb-2 cursor-pointer ${isActive ? "font-medium" : ""}`}
    >
      <div className={`w-1 h-6 mr-2 rounded-sm`} style={{ backgroundColor: color }}></div>
      <span className="text-sm">{title}</span>
      {count !== undefined && <span className="ml-auto text-xs text-gray-500">{count}</span>}
    </motion.div>
  )
}

export function InsightCategoryPanel() {
  const categories = [
    { title: "Systemic Operational Inefficiencies", isActive: true, count: 1667 },
    { title: "Promotional and Store Experience", isActive: false, count: 546 },
    { title: "Account Management Challenges", isActive: false, count: 423 },
    { title: "Payment and Order Processing", isActive: false, count: 389 },
    { title: "Gift Card System Challenges", isActive: false, count: 245 },
    { title: "Rewards Program System", isActive: false, count: 198 },
    { title: "Rigid Policies and System", isActive: false, count: 176 },
    { title: "Communication and Information", isActive: false, count: 154 },
    { title: "Third-Party Dependency Issues", isActive: false, count: 132 },
    { title: "Birthday Reward and Updates", isActive: false, count: 95 },
    { title: "Account Merging Challenges", isActive: false, count: 87 },
    { title: "Gift Card Resolution Challenges", isActive: false, count: 76 },
    { title: "Rewards Program System Failures", isActive: false, count: 65 },
    { title: "Birthday Reward System Challenges", isActive: false, count: 52 },
  ]

  return (
    <div className="w-64 bg-white border-r p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {categories.map((category, index) => (
          <InsightCategory
            key={index}
            title={category.title}
            isActive={category.isActive}
            count={category.count}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  )
}
