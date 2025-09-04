"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { SideBar } from "@/components/side-bar"
import { FilterPanel } from "@/components/insights/filter-panel"
import { InsightsGrid } from "@/components/insights/insights-grid"

export default function InsightsPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subcategory: "",
    sort: "category",
  })

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const handleCardClick = (insight: any) => {
    // Handle card click - could navigate to detailed view
    console.log("Card clicked:", insight)
    // You could implement navigation to a detailed insight view here
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 flex overflow-hidden">
          <FilterPanel onFiltersChange={handleFiltersChange} />
          <InsightsGrid filters={filters} onCardClick={handleCardClick} />
        </main>
      </div>
    </div>
  )
}
