"use client"

import { motion } from "framer-motion"
import { ClipboardList, CheckSquare, Clock, AlertTriangle, PlayCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SurveysOverview() {
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
            Surveys & Inspections
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Manage survey templates, track field inspections, and review submissions.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm">
            <PlayCircle className="mr-2 h-4 w-4 text-emerald-500" />
            Start Inspection
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Survey
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Active Surveys</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><ClipboardList className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">24</div>
          <p className="text-xs text-muted-foreground mt-1">Currently published templates</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Inspections Today</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><CheckSquare className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">142</div>
          <p className="text-xs text-emerald-500 font-medium mt-1">Completed by field officers</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Pending Review</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Clock className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">38</div>
          <p className="text-xs text-muted-foreground mt-1">Requires supervisor approval</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm border-orange-500/30 bg-orange-500/5">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-orange-500">Rejected Submissions</h3>
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><AlertTriangle className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">7</div>
          <p className="text-xs text-orange-500/80 mt-1">Sent back for correction</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="h-[400px] w-full rounded-xl border bg-card shadow-sm flex flex-col items-center justify-center text-muted-foreground"
        >
          <ClipboardList className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">Inspection Trend (Recharts)</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            Live Recharts Line graph showing the volume of inspections completed over the week.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4">Recent Submissions</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">Facility Health Audit #{9820 + i}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Submitted by Officer Davis</p>
                  </div>
                  <Button variant="secondary" size="sm" className="text-xs h-7">Review</Button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
