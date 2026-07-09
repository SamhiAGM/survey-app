"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, CheckCircle2, Download, Filter, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsOverview() {
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
            Analytics Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Performance metrics, survey completion rates, and AI insights.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Dashboard
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Completion Rate</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><CheckCircle2 className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">98.2%</div>
          <p className="text-xs text-emerald-500 font-medium flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> +2.1% from last month</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Inspections</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><BarChart3 className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">14,204</div>
          <p className="text-xs text-blue-500 mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +14.5% year over year</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Officer Performance</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Users className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">92/100</div>
          <p className="text-xs text-muted-foreground mt-1">Average quality score</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm bg-indigo-500/5 border-indigo-500/20">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-indigo-500">AI Risk Prediction</h3>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><BrainCircuit className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Low</div>
          <p className="text-xs text-indigo-500/80 mt-1">System operating normally</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
        {[
          { label: "District Analytics", icon: BarChart3, href: "/dashboard/analytics/district" },
          { label: "Province Analytics", icon: BarChart3, href: "/dashboard/analytics/province" },
          { label: "Monthly Trends", icon: TrendingUp, href: "/dashboard/analytics/monthly" },
          { label: "Yearly Trends", icon: TrendingUp, href: "/dashboard/analytics/yearly" },
          { label: "Forecasting", icon: BrainCircuit, href: "/dashboard/analytics/forecasting" },
          { label: "Heat Maps", icon: Users, href: "/dashboard/analytics/heatmaps" },
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
          <BarChart3 className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">Inspection Trend (Recharts)</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            This module will render a live Recharts Area chart showing inspections over the last 12 months.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="h-[400px] w-full rounded-xl border bg-card shadow-sm flex flex-col items-center justify-center text-muted-foreground"
        >
          <BarChart3 className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">District Comparison</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            This module will render a Recharts Bar chart comparing performance across regions.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
