'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-lg text-gray-600">Welcome, {user.name} ({user.role})</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* KPI Cards Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Surveys</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Pending Inspections</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">34</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Active Field Officers</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">128</p>
        </div>
      </div>
    </div>
  );
}
