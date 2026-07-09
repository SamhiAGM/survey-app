"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Plus, Search, Edit2, Trash2, MapPin, X, Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import api from '@/lib/api'

interface Facility {
  _id: string
  name: string
  type: string
  district: string
  location: {
    type: string
    coordinates: number[]
  }
}

export default function HospitalsPage() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form State
  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [lng, setLng] = useState('')
  const [lat, setLat] = useState('')
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  const fetchFacilities = async () => {
    try {
      setLoading(true)
      const res = await api.get(`/facilities?type=Hospital&page=${page}&search=${search}`)
      setFacilities(res.data.data)
      setTotalPages(res.data.pages || 1)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load hospitals')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFacilities()
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [search, page])

  const openModal = (f?: Facility) => {
    if (f) {
      setEditingId(f._id)
      setName(f.name)
      setDistrict(f.district)
      setLng(f.location.coordinates[0].toString())
      setLat(f.location.coordinates[1].toString())
    } else {
      setEditingId(null)
      setName('')
      setDistrict('')
      setLng('')
      setLat('')
    }
    setFormError('')
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')
    try {
      const payload = {
        name,
        type: 'Hospital',
        district,
        location: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        }
      }

      if (editingId) {
        await api.put(`/facilities/${editingId}`, payload)
      } else {
        await api.post('/facilities', payload)
      }
      setIsModalOpen(false)
      fetchFacilities()
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to save hospital')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this hospital?')) {
      try {
        await api.delete(`/facilities/${id}`)
        fetchFacilities()
      } catch (err: any) {
        alert(err.response?.data?.error || 'Failed to delete')
      }
    }
  }

  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold tracking-tight">
            Hospitals Directory
          </motion.h1>
          <p className="text-muted-foreground">Manage and track all registered hospital facilities.</p>
        </div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search hospitals..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button size="sm" onClick={() => openModal()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Hospital
          </Button>
        </motion.div>
      </div>

      {error ? (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center text-rose-500">
          <AlertTriangle className="w-5 h-5 mr-2" />
          {error}
        </div>
      ) : loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Hospital Name</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">District</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground">Coordinates</th>
                  <th className="px-6 py-4 font-semibold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {facilities.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center">
                        <Building2 className="w-12 h-12 mb-2 text-slate-300" />
                        <p>No hospitals found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  facilities.map((f, i) => (
                    <motion.tr 
                      key={f._id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium flex items-center">
                        <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center mr-3">
                          <Building2 className="w-4 h-4" />
                        </div>
                        {f.name}
                      </td>
                      <td className="px-6 py-4">{f.district}</td>
                      <td className="px-6 py-4 text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {f.location.coordinates[0].toFixed(4)}, {f.location.coordinates[1].toFixed(4)}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => openModal(f)}>
                          <Edit2 className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(f._id)}>
                          <Trash2 className="w-4 h-4 text-rose-500" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="p-4 border-t flex justify-between items-center bg-muted/20">
              <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
              <div className="space-x-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Modal Overlay */}
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
                <h3 className="font-semibold">{editingId ? 'Edit Hospital' : 'Add New Hospital'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5"/></button>
              </div>
              <form onSubmit={handleSave} className="p-4 space-y-4">
                {formError && <div className="text-xs text-rose-500 p-2 bg-rose-500/10 rounded">{formError}</div>}
                
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Hospital Name</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="General Hospital" />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">District</label>
                  <input required type="text" value={district} onChange={e => setDistrict(e.target.value)} className="w-full h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="Central District" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Longitude</label>
                    <input required type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} className="w-full h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="79.8612" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Latitude</label>
                    <input required type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} className="w-full h-9 px-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary" placeholder="6.9271" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t mt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingId ? 'Save Changes' : 'Create Hospital'}
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
