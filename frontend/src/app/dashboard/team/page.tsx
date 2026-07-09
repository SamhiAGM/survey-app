"use client"

import { motion } from "framer-motion"
import { Users, UserCheck, Cake, Megaphone, Activity, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeamOverview() {
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
            Team Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Manage personnel, track attendance, and monitor field officer performance.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Directory
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Employees</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Users className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">842</div>
          <p className="text-xs text-muted-foreground mt-1">Across 4 departments</p>
        </motion.div>
        
        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Online Users</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><UserCheck className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">156</div>
          <p className="text-xs text-emerald-500 font-medium mt-1">Currently active on platform</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Today's Attendance</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Activity className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">94%</div>
          <p className="text-xs text-muted-foreground mt-1">Field officer check-ins</p>
        </motion.div>

        <motion.div variants={item} className="rounded-xl border bg-card p-6 shadow-sm bg-orange-500/5 border-orange-500/20">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-orange-500">Pending Leave Requests</h3>
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Cake className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">14</div>
          <p className="text-xs text-orange-500/80 mt-1">Requires supervisor approval</p>
        </motion.div>
      </motion.div>
      
      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-xl border bg-card shadow-sm flex flex-col"
        >
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="font-semibold">Recent Activities</h3>
            <Button variant="ghost" size="sm">View Directory</Button>
          </div>
          <div className="p-0">
             {/* Data Table Placeholder */}
             <div className="w-full h-[300px] flex flex-col items-center justify-center text-muted-foreground">
              <Users className="w-12 h-12 mb-4 text-slate-300" />
              <p className="text-sm">Team Activity Table will render here</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4 flex items-center"><Megaphone className="w-4 h-4 mr-2 text-primary" /> Announcements</h3>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg border">
                <p className="text-xs font-semibold text-primary mb-1">New Policy Update</p>
                <p className="text-xs text-muted-foreground">All field officers must complete the new safety training module by Friday.</p>
              </div>
              <div className="p-3 bg-muted rounded-lg border">
                <p className="text-xs font-semibold text-primary mb-1">System Maintenance</p>
                <p className="text-xs text-muted-foreground">Downtime scheduled for Sunday at 02:00 AM UTC.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-xl border bg-card p-5 shadow-sm flex-1">
            <h3 className="font-semibold text-sm mb-4 flex items-center"><Cake className="w-4 h-4 mr-2 text-rose-500" /> Upcoming Birthdays</h3>
            <div className="space-y-3">
              {[
                { name: "Sarah Jenkins", role: "Field Officer", day: "Today" },
                { name: "Michael Chen", role: "Supervisor", day: "Tomorrow" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-rose-500/10 text-rose-500">{p.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{p.role}</p>
                  </div>
                  <span className="text-xs font-semibold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-full">{p.day}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
