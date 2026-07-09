"use client"

import { motion } from "framer-motion"
import { ShieldCheck, ArrowRight, Construction } from "lucide-react"
import Link from "next/link"

export default function SupervisorsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8">
      <div className="flex flex-col gap-2">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-indigo-400 mb-2"
        >
          <ShieldCheck className="w-6 h-6" />
          <span className="font-semibold tracking-wider uppercase text-sm">team module</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight text-white"
        >
          Supervisors
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg max-w-2xl mt-2"
        >
          Directory of supervisors and team leads.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 rounded-2xl border border-slate-800/60 bg-slate-900/30 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-700/50">
            <Construction className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">Under Development</h2>
          <p className="text-slate-400 max-w-md mb-8">
            The Supervisors feature is currently being built by our engineering team. It will be available in the next release cycle.
          </p>
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
          >
            Return to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
