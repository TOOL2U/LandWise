'use client';

import { useEffect, useState } from 'react';
import { getAllBookings } from '@/lib/bookings';
import { Booking } from '@/types/booking';
import { Calendar, Mail, Phone, MapPin, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.paymentStatus === filter;
  });

  const stats = {
    total: bookings.length,
    paid: bookings.filter(b => b.paymentStatus === 'paid').length,
    pending: bookings.filter(b => b.paymentStatus === 'pending').length,
    revenue: bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.pricePaid, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-charcoal/70">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-forest mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-sm text-charcoal/70 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-forest">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-sm text-charcoal/70 mb-1">Paid</p>
            <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-sm text-charcoal/70 mb-1">Pending</p>
            <p className="text-3xl font-bold text-orange-500">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-sm text-charcoal/70 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-forest">{stats.revenue.toLocaleString()} THB</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-forest text-white'
                : 'bg-sand/20 text-charcoal hover:bg-sand/40'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'paid'
                ? 'bg-green-600 text-white'
                : 'bg-sand/20 text-charcoal hover:bg-sand/40'
            }`}
          >
            Paid ({stats.paid})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-orange-500 text-white'
                : 'bg-sand/20 text-charcoal hover:bg-sand/40'
            }`}
          >
            Pending ({stats.pending})
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-forest">
                      {booking.customerName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : booking.paymentStatus === 'pending'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.paymentStatus.toUpperCase()}
                    </span>
                    {booking.isEarlyAccess && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky/20 text-sky">
                        Early Access
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Mail size={16} />
                      <span>{booking.customerEmail}</span>
                    </div>
                    {booking.customerPhone && (
                      <div className="flex items-center gap-2 text-charcoal/70">
                        <Phone size={16} />
                        <span>{booking.customerPhone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Calendar size={16} />
                      <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                    </div>
                    {booking.landLocation && (
                      <div className="flex items-center gap-2 text-charcoal/70">
                        <MapPin size={16} />
                        <span>{booking.landLocation}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <DollarSign size={16} />
                      <span className="font-semibold text-forest">
                        {booking.pricePaid.toLocaleString()} THB
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-semibold text-charcoal mb-1">
                      Package: {booking.packageName}
                    </p>
                    {booking.projectDetails && (
                      <p className="text-sm text-charcoal/70">
                        {booking.projectDetails}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-charcoal/70">No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
