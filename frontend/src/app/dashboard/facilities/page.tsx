"use client"

import { motion } from "framer-motion"
import { Building2, Stethoscope, AlertTriangle, ShieldCheck, MapPin, Activity, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FacilitiesOverview() {
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
            Facilities Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Monitor health facilities, compliance rates, and infrastructure readiness.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm">
            <MapPin className="mr-2 h-4 w-4 text-emerald-500" />
            Facility Map
          </Button>
          <Button size="sm">
            <Building2 className="mr-2 h-4 w-4" />
            Add Facility
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Facilities</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Building2 className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">1,402</div>
          <p className="text-xs text-muted-foreground mt-1">Registered health centers</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Compliance Rate</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><ShieldCheck className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">88.5%</div>
          <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Exceeds target</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm border-rose-500/30 bg-rose-500/5">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-rose-500">High Risk Facilities</h3>
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><AlertTriangle className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-rose-500">12</div>
          <p className="text-xs text-rose-500/80 mt-1">Requires urgent inspection</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Equipment Status</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Stethoscope className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-foreground">94%</div>
          <p className="text-xs text-muted-foreground mt-1">Functional medical hardware</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="h-[400px] w-full rounded-xl border bg-card shadow-sm flex flex-col items-center justify-center text-muted-foreground"
        >
          <Activity className="w-12 h-12 mb-4 text-slate-300" />
          <h2 className="text-xl font-semibold text-foreground">Facility Performance Chart</h2>
          <p className="mt-2 text-sm text-center max-w-md">
            This module will render a Live Radar Chart comparing categories (Hygiene, Equipment, Staffing).
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4">Inspection Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Inspections Completed Today</span>
                <span className="font-bold">142</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between items-center text-sm mt-4">
                <span className="text-muted-foreground">Pending Corrective Actions</span>
                <span className="font-bold text-orange-500">24</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
