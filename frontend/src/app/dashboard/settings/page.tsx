"use client"

import { motion } from "framer-motion"
import { Settings, Server, Database, Activity, HardDrive, ShieldCheck, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SettingsOverview() {
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
            System Health & Settings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Monitor live server status, databases, and manage global configurations.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Restart Services
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Logs
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-emerald-500">API Status</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Activity className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">99.9%</div>
          <p className="text-xs text-emerald-500/80 mt-1">Uptime this month</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Database</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Database className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">Healthy</div>
          <p className="text-xs text-blue-500 font-medium mt-1">Connected to Primary Cluster</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Storage Usage</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><HardDrive className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">42%</div>
          <p className="text-xs text-muted-foreground mt-1">840 GB / 2 TB used</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Security Status</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><ShieldCheck className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">Secure</div>
          <p className="text-xs text-muted-foreground mt-1">All protocols active</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
        {[
          { label: "Backup & Restore", icon: RefreshCw, href: "/dashboard/settings/backup" },
          { label: "Database", icon: Database, href: "/dashboard/settings/db" },
          { label: "API Keys", icon: ShieldCheck, href: "/dashboard/settings/keys" },
          { label: "Audit Logs", icon: Activity, href: "/dashboard/settings/audit" },
          { label: "Theme", icon: Settings, href: "/dashboard/settings/theme" },
          { label: "Languages", icon: Settings, href: "/dashboard/settings/language" },
          { label: "Monitoring", icon: Server, href: "/dashboard/settings/monitoring" },
          { label: "Email Settings", icon: Settings, href: "/dashboard/settings/email" },
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

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="h-[400px] w-full rounded-xl border bg-card shadow-sm flex flex-col items-center justify-center text-muted-foreground"
        >
          <Server className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">Live Server Metrics</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            This module will stream CPU and Memory usage via WebSockets in real-time.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4">System Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm pb-3 border-b">
                <span className="text-muted-foreground">Environment</span>
                <span className="font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">PRODUCTION</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-3 border-b">
                <span className="text-muted-foreground">Frontend Version</span>
                <span className="font-medium">v2.4.1</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-3 border-b">
                <span className="text-muted-foreground">Backend Version</span>
                <span className="font-medium">v1.8.9</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Last Backup</span>
                <span className="font-medium text-emerald-500">2 hours ago</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
