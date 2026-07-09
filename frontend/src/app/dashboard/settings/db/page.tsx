"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, Server, HardDrive, Zap, Loader2, Activity, Layers, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'

interface DbStats {
  dbName: string
  collections: number
  objects: number
  avgObjSize: number
  dataSize: number
  storageSize: number
  indexes: number
  indexSize: number
  collectionDetails: {
    name: string
    count: number
    size: number
    storageSize: number
  }[]
}

export default function DatabaseStatusPage() {
  const [stats, setStats] = useState<DbStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await api.get('/settings/database')
      setStats(res.data.data)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load database statistics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Connecting to MongoDB Cluster...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-center">
        <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-bold">Connection Failed</h3>
        <p className="mt-2">{error}</p>
        <Button variant="outline" className="mt-4 border-rose-500/50 hover:bg-rose-500/20" onClick={fetchStats}>
          Retry Connection
        </Button>
      </div>
    )
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold tracking-tight">
            Database Status
          </motion.h1>
          <p className="text-muted-foreground">Live connection metrics and storage analytics for your MongoDB cluster.</p>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchStats}>
            <Activity className="mr-2 h-4 w-4" />
            Refresh Stats
          </Button>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-emerald-500">Connection Status</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><CheckCircle2 className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">Connected</div>
          <p className="text-xs text-emerald-500/80 mt-1">Database: {stats.dbName}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Data Size</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><HardDrive className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">{formatBytes(stats.dataSize)}</div>
          <p className="text-xs text-muted-foreground mt-1">Storage size: {formatBytes(stats.storageSize)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Collections</h3>
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500"><Layers className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">{stats.collections}</div>
          <p className="text-xs text-muted-foreground mt-1">{stats.objects} total documents</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Indexes</h3>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Zap className="h-4 w-4" /></div>
          </div>
          <div className="text-3xl font-bold">{stats.indexes}</div>
          <p className="text-xs text-muted-foreground mt-1">Index size: {formatBytes(stats.indexSize)}</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/20">
          <h2 className="font-semibold flex items-center"><Server className="w-4 h-4 mr-2" /> Collections Analytics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-muted-foreground">Collection Name</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Document Count</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Data Size</th>
                <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Storage Size</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {stats.collectionDetails.map((c, i) => (
                <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-muted-foreground" />
                    {c.name}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">{c.count.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">{formatBytes(c.size)}</td>
                  <td className="px-6 py-4 text-right font-mono text-muted-foreground">{formatBytes(c.storageSize)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
