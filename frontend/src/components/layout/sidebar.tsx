"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, Map, ClipboardList, Building2, Users, 
  Settings, ShieldCheck, BarChart3, Bell, ChevronDown, 
  Search, FileText, MonitorDot,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const SIDEBAR_GROUPS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    color: "text-sky-400",
    href: "/dashboard",
    items: []
  },
  {
    title: "Field Map",
    icon: Map,
    color: "text-emerald-400",
    href: "/dashboard/map",
    items: [
      { label: "Live GPS Tracking", href: "/dashboard/map/live" },
      { label: "Officer Locations", href: "/dashboard/map/officers" },
      { label: "Heat Maps", href: "/dashboard/map/heatmaps" },
      { label: "Route Planning", href: "/dashboard/map/routes" },
    ]
  },
  {
    title: "Surveys & Inspections",
    icon: ClipboardList,
    color: "text-violet-400",
    href: "/dashboard/surveys",
    items: [
      { label: "Survey Templates", href: "/dashboard/surveys/templates" },
      { label: "Survey Builder", href: "/dashboard/surveys/builder" },
      { label: "Active Inspections", href: "/dashboard/surveys/active" },
      { label: "Inspection History", href: "/dashboard/surveys/history" },
    ]
  },
  {
    title: "Facilities",
    icon: Building2,
    color: "text-orange-400",
    href: "/dashboard/facilities",
    items: [
      { label: "Hospitals", href: "/dashboard/facilities/hospitals" },
      { label: "Clinics", href: "/dashboard/facilities/clinics" },
      { label: "Laboratories", href: "/dashboard/facilities/labs" },
      { label: "Facility Analytics", href: "/dashboard/facilities/analytics" },
    ]
  },
  {
    title: "Analytics",
    icon: BarChart3,
    color: "text-pink-400",
    href: "/dashboard/analytics",
    items: [
      { label: "Live Analytics", href: "/dashboard/analytics/live" },
      { label: "Performance", href: "/dashboard/analytics/performance" },
      { label: "Reports", href: "/dashboard/analytics/reports" },
      { label: "AI Insights", href: "/dashboard/analytics/ai" },
    ]
  },
  {
    title: "Team",
    icon: Users,
    color: "text-indigo-400",
    href: "/dashboard/team",
    items: [
      { label: "Employees", href: "/dashboard/team/employees" },
      { label: "Supervisors", href: "/dashboard/team/supervisors" },
      { label: "Roles", href: "/dashboard/team/roles" },
      { label: "Attendance", href: "/dashboard/team/attendance" },
    ]
  },
  {
    title: "Reports",
    icon: FileText,
    color: "text-amber-400",
    href: "/dashboard/reports",
    items: [
      { label: "Survey Reports", href: "/dashboard/reports/surveys" },
      { label: "Inspection Reports", href: "/dashboard/reports/inspections" },
      { label: "Performance Reports", href: "/dashboard/reports/performance" },
      { label: "Export Center", href: "/dashboard/reports/export" },
    ]
  },
  {
    title: "Live Monitoring",
    icon: MonitorDot,
    color: "text-red-400",
    href: "/dashboard/monitoring",
    items: [
      { label: "Live Operations", href: "/dashboard/monitoring/live" },
      { label: "Incident Log", href: "/dashboard/monitoring/incidents" },
      { label: "Server Health", href: "/dashboard/monitoring/health" },
      { label: "Emergency Alerts", href: "/dashboard/monitoring/alerts" },
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    color: "text-gray-400",
    href: "/dashboard/settings",
    items: [
      { label: "Users & Roles", href: "/dashboard/settings/users" },
      { label: "Security", href: "/dashboard/settings/security" },
      { label: "Integrations", href: "/dashboard/settings/integrations" },
      { label: "System Settings", href: "/dashboard/settings/system" },
    ]
  },
]

function SidebarGroup({ group, pathname, isCollapsed }: any) {
  // A group is fully active if the path exactly matches, OR if a sub-item matches.
  // We'll treat the parent as always somewhat active if we're inside it.
  const isParentActive = pathname === group.href || pathname.startsWith(group.href + '/')
  const [isOpen, setIsOpen] = useState(isParentActive)

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between group">
        <Link 
          href={group.href}
          className={cn(
            "flex-1 flex items-center gap-3 px-3 py-2.5 rounded-l-lg rounded-r-sm cursor-pointer transition-all duration-200 hover:bg-slate-800/50",
            pathname === group.href ? "bg-slate-800" : ""
          )}
        >
          <group.icon className={cn("w-5 h-5", group.color)} />
          {!isCollapsed && (
            <span className={cn(
              "text-sm font-medium transition-colors truncate", 
              pathname === group.href ? "text-white" : "text-slate-300 group-hover:text-white"
            )}>
              {group.title}
            </span>
          )}
        </Link>
        {!isCollapsed && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-2.5 rounded-r-lg rounded-l-sm hover:bg-slate-800 transition-colors flex items-center justify-center border-l border-transparent hover:border-slate-800/50",
              isParentActive && !isOpen ? "bg-slate-800/30" : ""
            )}
          >
            <ChevronDown className={cn(
              "w-4 h-4 text-slate-500 transition-transform duration-200", 
              isOpen && "rotate-180"
            )} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-11 pr-3 py-1 space-y-1 relative before:absolute before:left-[1.35rem] before:top-0 before:bottom-0 before:w-px before:bg-slate-700/50">
              {group.items.map((item: any) => {
                const isItemActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block py-1.5 px-3 rounded-md text-sm transition-all relative before:absolute before:left-[-1.15rem] before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-px before:bg-slate-700/50 truncate",
                      isItemActive 
                        ? "text-sky-400 font-medium bg-sky-500/10 before:bg-sky-500/50" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col h-full bg-[#0a0e17] text-white border-r border-slate-800/60 transition-all duration-300 relative",
      isCollapsed ? "w-[72px]" : "w-72"
    )}>
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800/60 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="shrink-0 relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col whitespace-nowrap"
            >
              <h1 className="text-[15px] font-bold tracking-tight leading-tight">
                Field<span className="text-indigo-400">Sync</span>
              </h1>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Enterprise</span>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Search (Only when expanded) */}
      {!isCollapsed && (
        <div className="px-4 py-4 shrink-0">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search modules..." 
              className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-800 rounded text-slate-400 border border-slate-700">⌘</kbd>
              <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-800 rounded text-slate-400 border border-slate-700">K</kbd>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {SIDEBAR_GROUPS.map((group) => (
            <SidebarGroup 
              key={group.title} 
              group={group} 
              pathname={pathname} 
              isCollapsed={isCollapsed} 
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer Settings / Profile */}
      <div className="p-4 border-t border-slate-800/60 shrink-0 bg-slate-900/20">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
                <Bell className="w-4 h-4 text-slate-400" />
              </div>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-[#0a0e17] rounded-full"></span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-slate-200 truncate">Notifications</p>
                <p className="text-xs text-rose-400 truncate">3 Critical Alerts</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
