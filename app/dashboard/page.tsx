"use client"

import { NavBar } from "@/components/nav-bar"
import { SideBar } from "@/components/side-bar"
import { KeyMetricsOverview } from "@/components/dashboard/key-metrics-overview"
import { EmergingIssues } from "@/components/dashboard/emerging-issues"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"
import { BarChart3, Filter, Download, RefreshCw } from "lucide-react"
import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const timePeriods = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "6m", label: "Last 6 Months" },
    { value: "1y", label: "Last Year" },
  ]

  const selectedPeriodLabel = timePeriods.find((p) => p.value === selectedPeriod)?.label || "Last 7 Days"

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <BarChart3 className="mr-3 text-blue-600" />
                  Operations Dashboard
                </h1>
                <p className="text-gray-600">Real-time insights into customer service operations and emerging issues</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50">
                  <Filter size={16} className="mr-2" />
                  Filters
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{selectedPeriodLabel}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    >
                      <div className="py-1">
                        {timePeriods.map((period) => (
                          <button
                            key={period.value}
                            onClick={() => {
                              setSelectedPeriod(period.value)
                              setIsDropdownOpen(false)
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                              selectedPeriod === period.value ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"
                            }`}
                          >
                            {period.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
                <button className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50">
                  <Download size={16} className="mr-2" />
                  Export
                </button>
                <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <KeyMetricsOverview />
            <AnalyticsDashboard selectedPeriod={selectedPeriod} />
            <EmergingIssues />
          </div>
        </main>
      </div>
    </div>
  )
}
