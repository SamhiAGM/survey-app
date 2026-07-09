"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Key, Plus, Copy, AlertTriangle, ShieldAlert, Check, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'

interface ApiKey {
  _id: string
  name: string
  keyPrefix: string
  status: 'Active' | 'Revoked' | 'Expired'
  createdAt: string
  expiresAt?: string
  createdBy: {
    _id: string
    name: string
    email: string
  }
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyExpires, setNewKeyExpires] = useState('30')
  const [formLoading, setFormLoading] = useState(false)
  
  // State for showing the newly generated raw key once
  const [generatedRawKey, setGeneratedRawKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const fetchKeys = async () => {
    try {
      setLoading(true)
      const res = await api.get('/settings/keys')
      setKeys(res.data.data)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load API keys')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKeys()
  }, [])

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    try {
      const res = await api.post('/settings/keys', {
        name: newKeyName,
        expiresInDays: newKeyExpires ? parseInt(newKeyExpires) : undefined
      })
      setGeneratedRawKey(res.data.data.rawKey)
      setIsModalOpen(false)
      setNewKeyName('')
      setNewKeyExpires('30')
      fetchKeys()
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to generate key')
    } finally {
      setFormLoading(false)
    }
  }

  const handleRevoke = async (id: string) => {
    if (confirm('Are you sure you want to completely revoke this API Key? Any systems using it will immediately lose access.')) {
      try {
        await api.put(`/settings/keys/${id}/revoke`)
        fetchKeys()
      } catch (err: any) {
        alert(err.response?.data?.error || 'Failed to revoke key')
      }
    }
  }

  const copyToClipboard = () => {
    if (generatedRawKey) {
      navigator.clipboard.writeText(generatedRawKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold tracking-tight">
            API Keys
          </motion.h1>
          <p className="text-muted-foreground">Manage secret keys for external integrations and automated scripts.</p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Generate New Key
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {generatedRawKey && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <div className="flex items-start">
              <ShieldAlert className="w-6 h-6 text-emerald-500 mr-4 shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Save your new API Key</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500/80 mt-1 mb-4">
                  Please copy this key and save it somewhere safe. For security reasons, <strong>we will never show it to you again.</strong>
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-background border border-emerald-500/30 rounded-lg font-mono text-sm text-foreground break-all">
                    {generatedRawKey}
                  </div>
                  <Button variant="outline" className="border-emerald-500/30 hover:bg-emerald-500/20" onClick={copyToClipboard}>
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" onClick={() => setGeneratedRawKey(null)}>Dismiss</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && keys.length === 0 ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Key Name & Prefix</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Created By</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Status</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Expires</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {keys.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center">
                        <Key className="w-12 h-12 mb-2 text-slate-300" />
                        <p>No API keys found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  keys.map((k) => (
                    <tr key={k._id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{k.name}</div>
                        <div className="text-xs font-mono text-muted-foreground mt-1">{k.keyPrefix}••••••••••••••••••••••••</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">{k.createdBy?.name || 'Unknown'}</div>
                        <div className="text-xs text-muted-foreground">{k.createdBy?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          k.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                          k.status === 'Revoked' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {k.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        {k.expiresAt ? new Date(k.expiresAt).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {k.status === 'Active' && (
                          <Button variant="outline" size="sm" onClick={() => handleRevoke(k._id)} className="text-rose-500 border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-600">
                            <AlertTriangle className="w-3 h-3 mr-2" /> Revoke
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-md rounded-xl shadow-xl border overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b bg-muted/30">
                <h3 className="font-semibold flex items-center"><Key className="w-4 h-4 mr-2 text-primary" /> Generate API Key</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5"/></button>
              </div>
              <form onSubmit={handleGenerateKey} className="p-4 space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Key Name / Identifier</label>
                  <input required type="text" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} className="w-full h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Zapier Integration" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Expiration</label>
                  <select value={newKeyExpires} onChange={e => setNewKeyExpires(e.target.value)} className="w-full h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary">
                    <option value="7">7 Days</option>
                    <option value="30">30 Days</option>
                    <option value="90">90 Days</option>
                    <option value="365">1 Year</option>
                    <option value="">Never Expires</option>
                  </select>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-600 flex mt-4">
                  <AlertTriangle className="w-4 h-4 mr-2 shrink-0" />
                  <p>API keys grant programmatic access to your account. Keep them secure and never expose them in client-side code.</p>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Generate Key
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
