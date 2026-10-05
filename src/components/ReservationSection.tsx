import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { TableReservation } from '../types';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState<Partial<TableReservation>>({
    guests: 2,
    date: new Date().toISOString().split('T')[0],
    time: '11:30 AM',
    seatingArea: 'The Velvet Arch',
    guestName: '',
    email: '',
    phone: '',
    specialRequest: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  const TIME_SLOTS = [
    '8:30 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'
  ];

  const SEATING_OPTIONS: {
    name: TableReservation['seatingArea'];
    desc: string;
    vibe: string;
  }[] = [
    {
      name: 'The Velvet Arch',
      desc: 'Plush dusty-rose fluted banquettes with warm pendant lighting.',
      vibe: 'Ideal for couples & intimate coffee dates',
    },
    {
      name: 'Terrazzo Window Booth',
      desc: 'Flooded with natural sunlight through sheer draped floor-to-ceiling glass.',
      vibe: 'Best for photography & bright morning brunch',
    },
    {
      name: 'Neon Blossom Lounge',
      desc: 'Positioned right beside our glowing "sip pretty" cursive wall & brass mirror.',
      vibe: 'Top choice for birthdays & group catchups',
    },
    {
      name: 'Garden Terrace',
      desc: 'Fresh air covered patio with potted ficus trees and floral trellises.',
      vibe: 'Dog-friendly & breezy open air',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName || !formData.email) return;

    const res: TableReservation = {
      id: `PC-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: formData.guestName,
      email: formData.email,
      phone: formData.phone || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time || '11:30 AM',
      guests: formData.guests || 2,
      seatingArea: formData.seatingArea || 'The Velvet Arch',
      specialRequest: formData.specialRequest,
    };

    setConfirmedReservation(res);
  };

  return (
    <section id="reserve" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9E3852]">
            <span>Complimentary Table Reservations</span>
            <span aria-hidden="true" className="text-[#D4A3AE]">·</span>
            <span>No Deposit Required</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C1E21] tracking-tight">
            Reserve Your Aesthetic Corner
          </h2>
          <p className="text-sm sm:text-base text-[#6D555A]">
            Whether you are hosting a birthday brunch, a quiet work session, or content creation, 
            reserve your preferred booth in advance at zero extra cost.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Success Voucher */
          <div className="max-w-xl mx-auto bg-[#FCF8F9] border border-[#ECD0D6] rounded-3xl p-7 sm:p-9 shadow-lg animate-in zoom-in-95 duration-200 text-center space-y-6">
            <div className="w-14 h-14 bg-[#FCE8ED] rounded-full flex items-center justify-center text-[#9E3852] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#9E3852] font-semibold">
                Reservation Confirmed
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C1E21]">
                We can't wait to welcome you, {confirmedReservation.guestName}!
              </h3>
              <p className="text-xs text-[#786166]">
                A confirmation voucher and calendar invite have been sent to {confirmedReservation.email}.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#F2DCE2] space-y-3 text-left">
              <div className="flex justify-between items-center pb-2 border-b border-[#F2DCE2]">
                <span className="text-xs text-[#8A6A71]">Reservation Code</span>
                <span className="font-mono text-xs font-bold text-[#2C1E21]">
                  {confirmedReservation.id}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#F2DCE2]">
                <span className="text-xs text-[#8A6A71]">Seating Area</span>
                <span className="text-xs font-semibold text-[#2C1E21]">
                  {confirmedReservation.seatingArea}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#F2DCE2]">
                <span className="text-xs text-[#8A6A71]">Date & Time</span>
                <span className="text-xs font-semibold text-[#2C1E21]">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#8A6A71]">Party Size</span>
                <span className="text-xs font-semibold text-[#2C1E21]">
                  {confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => setConfirmedReservation(null)}
                className="px-5 py-2.5 rounded-full border border-[#DDA5B1] text-xs font-semibold text-[#2C1E21] hover:bg-white transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
              <a
                href="#menu"
                className="px-5 py-2.5 rounded-full bg-[#2C1E21] text-white text-xs font-semibold hover:bg-[#432A30] transition-colors inline-block"
              >
                Browse Menu for Your Visit
              </a>
            </div>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[#FCF8F9] border border-[#F2DCE2] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Step 1: Seating Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8A6A71] mb-3">
                1. Choose Your Preferred Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SEATING_OPTIONS.map((seat) => {
                  const isSelected = formData.seatingArea === seat.name;
                  return (
                    <button
                      key={seat.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, seatingArea: seat.name })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#9E3852] bg-white ring-2 ring-[#9E3852]/20 shadow-xs'
                          : 'border-[#ECD0D6] bg-white/70 hover:bg-white hover:border-[#DDA5B1]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-serif-display text-base font-bold text-[#2C1E21]">
                            {seat.name}
                          </p>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-[#9E3852] border-[#9E3852]' : 'border-[#ECD0D6]'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-xs text-[#6D555A]">{seat.desc}</p>
                      </div>
                      <p className="text-[11px] font-medium text-[#9E3852] mt-3">
                        {seat.vibe}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#9E3852]" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:border-[#9E3852] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#9E3852]" />
                  <span>Time</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:border-[#9E3852] focus:outline-hidden"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#9E3852]" />
                  <span>Number of Guests</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:border-[#9E3852] focus:outline-hidden"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mia Laurent"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:border-[#9E3852] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="mia@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:border-[#9E3852] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-1.5">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="(555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:border-[#9E3852] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A6A71] mb-1.5">
                Special Requests or Occasion (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, window seat preferred, quiet work corner..."
                value={formData.specialRequest}
                onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#ECD0D6] bg-white text-[#2C1E21] focus:ring-1 focus:ring-[#9E3852] focus:border-[#9E3852] focus:outline-hidden"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F2DCE2]">
              <div className="flex items-center gap-2 text-xs text-[#786166]">
                <MapPin className="w-4 h-4 text-[#9E3852]" />
                <span>412 Rosewood Blvd · Tables held for 15 mins after scheduled time</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2C1E21] hover:bg-[#432A30] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Confirm Table Reservation
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
