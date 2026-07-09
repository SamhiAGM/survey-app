"use client"

import { motion } from "framer-motion"
import { Server, Activity, ShieldCheck, Database, HardDrive, RefreshCcw, AlertOctagon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminOverview() {
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
            System Administration
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Master control panel for backend services, databases, and system security.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm" className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10">
            <AlertOctagon className="mr-2 h-4 w-4" />
            Lockdown System
          </Button>
          <Button size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Force Sync
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-emerald-500">API Gateway</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Activity className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">99.99%</div>
          <p className="text-xs text-emerald-500/80 mt-1">Uptime trailing 30 days</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Main Database</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Database className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">Optimal</div>
          <p className="text-xs text-muted-foreground mt-1">Replication lag: 12ms</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Redis Cache</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><HardDrive className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">142 MB</div>
          <p className="text-xs text-muted-foreground mt-1">Hit rate: 94.2%</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Security Audit</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><ShieldCheck className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">Passed</div>
          <p className="text-xs text-muted-foreground mt-1">Last scan: 2 hours ago</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="h-[400px] w-full rounded-xl border bg-card shadow-sm flex flex-col items-center justify-center text-muted-foreground"
        >
          <Server className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">Docker Containers</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            This module will stream live Docker container metrics from the backend.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4">Background Jobs (Cron)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm pb-3 border-b">
                <div>
                  <p className="font-medium">Data Warehouse Sync</p>
                  <p className="text-xs text-muted-foreground">Runs every night at 02:00 AM</p>
                </div>
                <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded text-xs font-semibold">SUCCESS</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-3 border-b">
                <div>
                  <p className="font-medium">Report Generation Queue</p>
                  <p className="text-xs text-muted-foreground">Processing 14 items</p>
                </div>
                <span className="text-blue-500 bg-blue-500/10 px-2 py-1 rounded text-xs font-semibold">RUNNING</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium">Orphaned Image Cleanup</p>
                  <p className="text-xs text-muted-foreground">Runs weekly on Sundays</p>
                </div>
                <span className="text-slate-500 bg-slate-500/10 px-2 py-1 rounded text-xs font-semibold">PENDING</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
