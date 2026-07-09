"use client"

import { motion } from "framer-motion"
import { MonitorDot, Activity, Server, AlertTriangle, ShieldAlert, Cpu, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MonitoringOverview() {
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
            Live Monitoring
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Real-time operations center for system health, incidents, and emergencies.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm" className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Broadcast Emergency Alert
          </Button>
          <Button size="sm">
            <Terminal className="mr-2 h-4 w-4" />
            View Live Logs
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-emerald-500">System Status</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Activity className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Operational</div>
          <p className="text-xs text-emerald-500/80 mt-1 flex items-center"><span className="relative flex h-2 w-2 mr-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span> All services online</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Server Load (CPU)</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Cpu className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">24%</div>
          <p className="text-xs text-blue-500 font-medium mt-1">Normal operating range</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Active Sessions</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Server className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">1,048</div>
          <p className="text-xs text-muted-foreground mt-1">Users currently connected</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm border-rose-500/30 bg-rose-500/5">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-rose-500">Active Incidents</h3>
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><AlertTriangle className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-rose-500">2</div>
          <p className="text-xs text-rose-500/80 mt-1">Requires immediate attention</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="h-[400px] w-full rounded-xl border bg-card shadow-sm flex flex-col items-center justify-center text-muted-foreground"
        >
          <MonitorDot className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">Live Operations Dashboard</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            This module will stream real-time WebSockets data for system incidents, alerts, and queue monitors.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4">Live Incident Log</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="mt-1"><AlertTriangle className="w-4 h-4 text-rose-500" /></div>
                <div>
                  <p className="text-sm font-medium">GPS Signal Lost - Unit 402</p>
                  <p className="text-xs text-muted-foreground">Field Officer John Doe lost connection in Northern District.</p>
                  <p className="text-[10px] text-muted-foreground mt-1">2 mins ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="mt-1"><AlertTriangle className="w-4 h-4 text-orange-500" /></div>
                <div>
                  <p className="text-sm font-medium">Sync Delayed - Mobile Clinic B</p>
                  <p className="text-xs text-muted-foreground">Offline sync has not completed in the last 4 hours.</p>
                  <p className="text-[10px] text-muted-foreground mt-1">15 mins ago</p>
                </div>
              </div>
              <div className="flex gap-3 opacity-50">
                <div className="mt-1"><Activity className="w-4 h-4 text-emerald-500" /></div>
                <div>
                  <p className="text-sm font-medium line-through">High Server Load Detected</p>
                  <p className="text-xs text-muted-foreground">Auto-scaled Redis cluster successfully.</p>
                  <p className="text-[10px] text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
