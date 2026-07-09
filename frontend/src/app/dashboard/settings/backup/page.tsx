"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DatabaseBackup, HardDriveDownload, History, RotateCcw, Play, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BackupRestorePage() {
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [progress, setProgress] = useState(0)

  // Mock backup history
  const [backups, setBackups] = useState([
    { id: 'bkp_001', date: new Date().toISOString(), size: '4.2 GB', type: 'Automated', status: 'Success' },
    { id: 'bkp_002', date: new Date(Date.now() - 86400000).toISOString(), size: '4.1 GB', type: 'Manual', status: 'Success' },
    { id: 'bkp_003', date: new Date(Date.now() - 172800000).toISOString(), size: '4.1 GB', type: 'Automated', status: 'Success' },
  ])

  const handleManualBackup = () => {
    setIsBackingUp(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsBackingUp(false)
            setBackups(prevBackups => [
              { id: `bkp_${Math.floor(Math.random() * 1000)}`, date: new Date().toISOString(), size: '4.2 GB', type: 'Manual', status: 'Success' },
              ...prevBackups
            ])
          }, 500)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold tracking-tight">
            Backup & Restore
          </motion.h1>
          <p className="text-muted-foreground">Manage database snapshots, configure automated backups, and restore data.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Active Backup Status Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 rounded-xl border bg-card shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary/10 text-primary rounded-xl mr-4">
              <DatabaseBackup className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Manual Snapshot</h2>
              <p className="text-sm text-muted-foreground">Take an immediate full snapshot of the production database.</p>
            </div>
          </div>
          
          <div className="p-6 border rounded-lg bg-muted/20 relative overflow-hidden">
            {isBackingUp ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="flex items-center text-primary"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Backup Archive...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                  <span>System is ready for backup. Estimated size: <strong>4.2 GB</strong></span>
                </div>
                <Button onClick={handleManualBackup} size="lg" className="w-full sm:w-auto">
                  <Play className="w-4 h-4 mr-2" /> Start Backup
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Configuration Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border bg-card shadow-sm p-6">
          <h3 className="font-semibold mb-4">Backup Schedule</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm pb-3 border-b">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">ACTIVE</span>
            </div>
            <div className="flex justify-between items-center text-sm pb-3 border-b">
              <span className="text-muted-foreground">Frequency</span>
              <span className="font-medium">Daily at 02:00 UTC</span>
            </div>
            <div className="flex justify-between items-center text-sm pb-3 border-b">
              <span className="text-muted-foreground">Retention</span>
              <span className="font-medium">30 Days</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Storage</span>
              <span className="font-medium flex items-center">AWS S3 <AlertCircle className="w-3 h-3 ml-1 text-amber-500" /></span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-6">Configure Schedule</Button>
        </motion.div>
      </div>

      {/* Backup History Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/20 flex justify-between items-center">
          <h2 className="font-semibold flex items-center"><History className="w-4 h-4 mr-2" /> Recent Backups</h2>
          <Button variant="outline" size="sm"><HardDriveDownload className="w-4 h-4 mr-2" /> Export Logs</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Backup ID</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Date (UTC)</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Type</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Size</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {backups.map((b, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium font-mono">{b.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{new Date(b.date).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${b.type === 'Automated' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                      {b.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">{b.size}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="outline" size="sm" className="h-8">
                      <HardDriveDownload className="w-3 h-3 mr-1" /> Download
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 border-rose-500/20">
                      <RotateCcw className="w-3 h-3 mr-1" /> Restore
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
