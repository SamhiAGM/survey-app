"use client"

import { motion } from "framer-motion"
import { FileText, Calendar, Clock, Download, Plus, Filter, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportsOverview() {
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
            Reports Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Generate, schedule, and export custom compliance reports.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Generated Today</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><FileText className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">48</div>
          <p className="text-xs text-muted-foreground mt-1">Total documents processed</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Scheduled Reports</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Calendar className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">12</div>
          <p className="text-xs text-muted-foreground mt-1">Pending automated delivery</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Export Volume</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Download className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">1.2 GB</div>
          <p className="text-xs text-muted-foreground mt-1">Data exported this month</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm bg-indigo-500/5 border-indigo-500/20">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-indigo-500">Processing Queue</h3>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><Clock className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">0</div>
          <p className="text-xs text-indigo-500/80 mt-1">All reports generated</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-xl border bg-card shadow-sm flex flex-col"
        >
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="font-semibold">Recent Reports</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="p-0">
            {/* Table Placeholder */}
            <div className="w-full h-[300px] flex flex-col items-center justify-center text-muted-foreground">
              <FileSpreadsheet className="w-12 h-12 mb-4 text-slate-300" />
              <p className="text-sm">Advanced Data Table Component will render here</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4">Quick Exports</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2 text-rose-500" /> Executive PDF Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="w-4 h-4 mr-2 text-emerald-500" /> Full CSV Data Dump
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2 text-blue-500" /> Weekly Compliance Report
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
