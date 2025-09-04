"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, X } from "lucide-react"

interface StickyHeaderProps {
  isVisible: boolean
  expandedInsights: string[]
  onCollapseAll: () => void
  onScrollToTop: () => void
}

export function StickyHeader({ isVisible, expandedInsights, onCollapseAll, onScrollToTop }: StickyHeaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50"
        >
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm font-medium">Expanded Insights</h3>
                <div className="flex items-center space-x-2">
                  {expandedInsights.map((insight, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
                      {insight.length > 30 ? `${insight.substring(0, 30)}...` : insight}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onScrollToTop}
                  className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <ChevronUp size={16} className="mr-1" />
                  Back to Top
                </button>
                <button
                  onClick={onCollapseAll}
                  className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X size={16} className="mr-1" />
                  Collapse All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
