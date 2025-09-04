"use client"
import Link from "next/link"
import {
  LayoutDashboard,
  FileText,
  Monitor,
  Database,
  Lightbulb,
  Sparkles,
  Compass,
  BarChart,
  Settings,
  FileVideo,
} from "lucide-react"

export function SideBar() {
  return (
    <div className="w-64 bg-[#0f0b2d] text-white h-screen flex flex-col">
      <div className="p-4 flex items-center">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white font-semibold">L</span>
        </div>
        <span className="ml-3 font-medium">Laivly</span>
      </div>

      <div className="p-4">
        <Link href="/" className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
          <LayoutDashboard size={18} />
          <span className="ml-3 text-sm">Welcome to Sidd Studio</span>
        </Link>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs text-gray-400 font-semibold mb-2">CONFIGURE</p>
        <div className="space-y-1">
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <FileText size={18} />
            <span className="ml-3 text-sm">Workflows</span>
          </div>
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <Monitor size={18} />
            <span className="ml-3 text-sm">Sidd Window Editor</span>
          </div>
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <Database size={18} />
            <span className="ml-3 text-sm">Data Management</span>
          </div>
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <Lightbulb size={18} />
            <span className="ml-3 text-sm">Guidance & Insights</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs text-gray-400 font-semibold mb-2">MODELS</p>
        <div className="space-y-1">
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <Sparkles size={18} />
            <span className="ml-3 text-sm">Spark Notes</span>
          </div>
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <Compass size={18} />
            <span className="ml-3 text-sm">Drivers & Dispositions</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs text-gray-400 font-semibold mb-2">SYSTEM</p>
        <div className="space-y-1">
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <BarChart size={18} />
            <span className="ml-3 text-sm">Report</span>
          </div>
          <Link href="/" className="flex items-center py-2 px-3 rounded-md bg-[#1a1745]">
            <BarChart size={18} />
            <span className="ml-3 text-sm">Operations Dashboard</span>
          </Link>
          <Link href="/insights" className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745] ml-4">
            <BarChart size={18} />
            <span className="ml-3 text-sm">Detailed Insights</span>
          </Link>
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <Settings size={18} />
            <span className="ml-3 text-sm">Tenant Settings</span>
          </div>
          <div className="flex items-center py-2 px-3 rounded-md hover:bg-[#1a1745]">
            <FileVideo size={18} />
            <span className="ml-3 text-sm">Recorded Sessions</span>
          </div>
        </div>
      </div>
    </div>
  )
}
