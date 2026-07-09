"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Search, Filter, Download, User as UserIcon, Shield, Database, Layout, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'

interface AuditLog {
  _id: string
  action: string
  module: string
  status: string
  details: Record<string, any>
  createdAt: string
  user: {
    _id: string
    name: string
    email: string
    role: string
  }
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  // Filters
  const [actionFilter, setActionFilter] = useState('')
  const [moduleFilter, setModuleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const fetchLogs = async () => {
    try {
      setLoading(true)
      let url = `/settings/audit?page=${page}`
      if (actionFilter) url += `&action=${actionFilter}`
      if (moduleFilter) url += `&module=${moduleFilter}`
      if (statusFilter) url += `&status=${statusFilter}`
      
      const res = await api.get(url)
      setLogs(res.data.data)
      setTotalPages(res.data.pages || 1)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load audit logs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [page, actionFilter, moduleFilter, statusFilter])

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-emerald-500/10 text-emerald-500'
      case 'UPDATE': return 'bg-blue-500/10 text-blue-500'
      case 'DELETE': return 'bg-rose-500/10 text-rose-500'
      case 'LOGIN': return 'bg-indigo-500/10 text-indigo-500'
      default: return 'bg-slate-500/10 text-slate-500'
    }
  }

  const getModuleIcon = (mod: string) => {
    switch (mod) {
      case 'API_KEYS': return <Shield className="w-4 h-4" />
      case 'DATABASE': return <Database className="w-4 h-4" />
      case 'AUTH': return <UserIcon className="w-4 h-4" />
      default: return <Layout className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold tracking-tight">
            Audit Logs Explorer
          </motion.h1>
          <p className="text-muted-foreground">Comprehensive, immutable record of all user activities and system events.</p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card shadow-sm overflow-hidden">
        
        {/* Filters Header */}
        <div className="p-4 border-b bg-muted/20 flex flex-wrap gap-4 items-center">
          <div className="flex items-center text-sm font-medium text-muted-foreground mr-2">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </div>
          
          <select value={actionFilter} onChange={(e) => { setActionFilter(e.target.value); setPage(1) }} className="h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary">
            <option value="">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
            <option value="LOGIN">Login</option>
            <option value="CONFIG_CHANGE">Config Change</option>
          </select>

          <select value={moduleFilter} onChange={(e) => { setModuleFilter(e.target.value); setPage(1) }} className="h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary">
            <option value="">All Modules</option>
            <option value="API_KEYS">API Keys</option>
            <option value="FACILITIES">Facilities</option>
            <option value="AUTH">Authentication</option>
            <option value="SURVEYS">Surveys</option>
          </select>
          
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} className="h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary">
            <option value="">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {loading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Timestamp (UTC)</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Action</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">User</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Module</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Details</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center">
                        <Activity className="w-12 h-12 mb-2 text-slate-300" />
                        <p>No audit logs found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log._id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{log.user?.name || 'System'}</div>
                        <div className="text-xs text-muted-foreground">{log.user?.email || '-'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-muted-foreground">
                          <span className="mr-2 p-1 bg-muted rounded">{getModuleIcon(log.module)}</span>
                          {log.module}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs text-xs font-mono text-muted-foreground truncate" title={JSON.stringify(log.details)}>
                          {JSON.stringify(log.details)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                          {log.status}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {!loading && totalPages > 1 && (
          <div className="p-4 border-t flex justify-between items-center bg-muted/20">
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
