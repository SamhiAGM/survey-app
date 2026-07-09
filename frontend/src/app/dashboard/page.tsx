"use client"

import { useAuthStore } from "@/store/authStore"
import { motion } from "framer-motion"
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  MapPin,
  Activity
} from "lucide-react"

export default function Dashboard() {
  const { user } = useAuthStore()

  const roleName = (user?.role as any)?.name || user?.role || 'User'

  const stats = [
    {
      name: "Total Surveys",
      value: "1,245",
      change: "+12.5%",
      trend: "up",
      icon: ClipboardList,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      name: "Completed Inspections",
      value: "842",
      change: "+5.2%",
      trend: "up",
      icon: CheckCircle2,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      name: "Pending Reviews",
      value: "34",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      name: "Field Efficiency",
      value: "94%",
      change: "+1.2%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-500",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Overview
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Welcome back, {user?.name}. Here is what's happening in the field today.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            variants={item}
            className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 p-6"
          >
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-muted-foreground">
                {stat.name}
              </h3>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'} flex items-center font-medium`}>
                {stat.change} from last month
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-4 rounded-xl border bg-card shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Live Inspection Map (Preview)</h3>
            <div className="flex items-center text-sm text-emerald-500 font-medium">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Tracking Active
            </div>
          </div>
          <div className="w-full h-[400px] rounded-lg bg-muted border border-dashed flex flex-col items-center justify-center text-muted-foreground">
            <MapPin className="w-8 h-8 mb-4 text-slate-400" />
            <p>GIS Map Component will render here</p>
            <p className="text-sm mt-1">Deploying React-Leaflet Module...</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-3 rounded-xl border bg-card shadow-sm p-6"
        >
          <h3 className="font-semibold text-lg mb-6">Recent Field Activity</h3>
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4">
                  <Activity className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">Health Facility Inspection #{1042 + i}</p>
                  <p className="text-sm text-muted-foreground">Completed by Officer Sarah Jenkins</p>
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {i * 12}m ago
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
