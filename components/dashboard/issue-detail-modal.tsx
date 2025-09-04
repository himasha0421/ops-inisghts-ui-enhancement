"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

interface IssueDetailModalProps {
  isOpen: boolean
  onClose: () => void
  issue: {
    title: string
    description: string
    count: number
    change: number
    impact: "high" | "medium" | "low"
    category: string
    subcategory: string
  } | null
}

export function IssueDetailModal({ isOpen, onClose, issue }: IssueDetailModalProps) {
  if (!issue) return null

  const getImpactColor = () => {
    switch (issue.impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
    }
  }

  const getTrendIcon = () => {
    if (issue.change > 0) return <TrendingUp className="w-4 h-4 text-red-500" />
    if (issue.change < 0) return <TrendingDown className="w-4 h-4 text-green-500" />
    return <AlertTriangle className="w-4 h-4 text-gray-500" />
  }

  const getTrendColor = () => {
    if (issue.change > 0) return "text-red-600"
    if (issue.change < 0) return "text-green-600"
    return "text-gray-600"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center space-x-3">
                  <h2 className="text-lg font-semibold text-gray-900">Operational Issue Details</h2>
                  <span className={`px-2 py-1 text-xs rounded-md ${getImpactColor()}`}>
                    {issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1)} Impact
                  </span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Issue Information</h3>

                <div className="space-y-6">
                  {/* Issue Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <p className="text-gray-900 font-medium">{issue.title}</p>
                  </div>

                  {/* Issue Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
                    <p className="text-gray-600 italic leading-relaxed">{issue.description}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Call Volume</label>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">{issue.count.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">calls</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trend</label>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon()}
                        <span className={`text-lg font-semibold ${getTrendColor()}`}>
                          {issue.change > 0 ? "+" : ""}
                          {issue.change}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                      {issue.category}
                    </span>
                  </div>

                  {/* Subcategory */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md">
                      {issue.subcategory}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
                <button onClick={onClose} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
