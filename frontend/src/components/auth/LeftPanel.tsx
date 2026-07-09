'use client';

import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Cloud, Zap, Globe, UserCheck, BellRing, Database } from 'lucide-react';
import Image from 'next/image';

const features = [
  { icon: ShieldCheck, title: '100% Secure', desc: 'Enterprise-grade encryption and RBAC' },
  { icon: Cloud, title: 'Cloud Based', desc: 'Accessible from anywhere, anytime' },
  { icon: Activity, title: 'Real-Time Monitoring', desc: 'Live analytics and status tracking' },
  { icon: Zap, title: 'Offline Support', desc: 'Seamless data sync when reconnected' },
  { icon: Database, title: 'Analytics', desc: 'Comprehensive reporting tools' },
  { icon: BellRing, title: 'Live Notifications', desc: 'Instant alerts on critical updates' },
];

export default function LeftPanel() {
  return (
    <div className="hidden lg:flex w-[45%] flex-col justify-between bg-zinc-950 p-12 text-white relative overflow-hidden">
      {/* Background abstract elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Activity className="text-zinc-950 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ministry of Health</h1>
            <p className="text-sm text-zinc-400 font-medium">Field Supervision Survey Management</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-extrabold tracking-tight">
            Elevating Healthcare <br/> Through Data.
          </h2>
          <p className="text-zinc-400 text-lg max-w-md">
            Join thousands of health professionals managing surveys, tracking real-time analytics, and ensuring quality care nationwide.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-8 my-12">
        {features.map((feature, idx) => (
          <motion.div 
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (idx * 0.1), duration: 0.5 }}
            className="flex items-start space-x-4 group"
          >
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
              <feature.icon className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100">{feature.title}</h4>
              <p className="text-xs text-zinc-500 mt-1">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8"
      >
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-zinc-400">System Status: <span className="text-emerald-400 font-medium ml-1">All Systems Operational</span></span>
        </div>
        <div className="text-sm text-zinc-500 font-mono">
          v2.0.4 Enterprise
        </div>
      </motion.div>
    </div>
  );
}
