"use client"

import { motion } from "framer-motion"
import { Map as MapIcon, Navigation2, Users, AlertTriangle, CloudRain, Clock, Activity, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FieldMapOverview() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            Field Map Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Live GIS monitoring of field officers, inspections, and health facilities.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4 text-emerald-500" />
            Heat Map Toggle
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Map Report
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Officers Online</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Users className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">128</div>
          <p className="text-xs text-emerald-500 font-medium flex items-center mt-1">Live tracking active</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Active Inspections</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><MapIcon className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">42</div>
          <p className="text-xs text-muted-foreground mt-1">Across 12 districts</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Today's Distance</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Navigation2 className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">1,240 km</div>
          <p className="text-xs text-muted-foreground mt-1">Total fleet travel</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm border-rose-500/30 bg-rose-500/5">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-rose-500">Active Alerts</h3>
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><AlertTriangle className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-rose-500">3</div>
          <p className="text-xs text-rose-500/80 mt-1">Route deviations detected</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
        {[
          { label: "Health Facility Map", icon: MapIcon, href: "/dashboard/map/facilities" },
          { label: "District Map", icon: MapIcon, href: "/dashboard/map/district" },
          { label: "Province Map", icon: MapIcon, href: "/dashboard/map/province" },
          { label: "Geo Fencing", icon: Navigation2, href: "/dashboard/map/geofencing" },
          { label: "Travel History", icon: Clock, href: "/dashboard/map/history" },
          { label: "Distance Analytics", icon: Activity, href: "/dashboard/map/distance" },
          { label: "Offline Maps", icon: Download, href: "/dashboard/map/offline" },
          { label: "Risk Zones", icon: AlertTriangle, href: "/dashboard/map/risk" },
        ].map((mod, i) => (
          <motion.a 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + (i * 0.05) }}
            href={mod.href}
            className="flex items-center p-4 border rounded-xl bg-card hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
          >
            <div className="p-2 bg-primary/10 text-primary rounded-lg mr-4">
              <mod.icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-sm">{mod.label}</span>
          </motion.a>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 h-[500px] w-full rounded-xl border bg-card shadow-sm flex flex-col items-center justify-center text-muted-foreground relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur p-3 rounded-lg border shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Location Search</h4>
            <input type="text" placeholder="Filter by district..." className="w-full text-sm bg-muted border-none rounded px-2 py-1 mb-2 outline-none focus:ring-1 focus:ring-primary" />
            <div className="flex gap-2">
              <span className="flex items-center text-[10px]"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span> Officers</span>
              <span className="flex items-center text-[10px]"><span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span> Facilities</span>
            </div>
          </div>
          <MapIcon className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">Interactive React-Leaflet GIS Map</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            This module will render the live WebSockets data streaming the GPS coordinates of all online officers.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4 flex items-center"><Activity className="w-4 h-4 mr-2 text-primary" /> Live Activity Feed</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-[-16px] before:w-px before:bg-border last:before:hidden">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">Officer Jenkins arrived at Facility #{1042 + i}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5"><Clock className="inline w-3 h-3 mr-1"/> Just now</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-xl border bg-card p-5 shadow-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
            <h3 className="font-semibold text-sm mb-2 flex items-center"><CloudRain className="w-4 h-4 mr-2 text-indigo-500" /> Weather Forecast</h3>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">28°C</p>
                <p className="text-xs font-medium text-indigo-500/80">Partly Cloudy, 72% Humidity</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
