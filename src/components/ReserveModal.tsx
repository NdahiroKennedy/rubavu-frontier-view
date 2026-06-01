import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Mail, Phone, User, GlassWater, ArrowRight, Check } from 'lucide-react';
import { ReservationType, ReservationEnquiry } from '../types';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: ReservationType;
  initialTargetId?: string;
}

export default function ReserveModal({
  isOpen,
  onClose,
  initialType = 'lodge',
  initialTargetId = ''
}: ReserveModalProps) {
  const [type, setType] = useState<ReservationType>(initialType);
  const [targetId, setTargetId] = useState<string>(initialTargetId);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guestsCount: 2,
    specialNotes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (type !== 'experience' && type !== 'restaurant') {
      if (!formData.checkIn) newErrors.checkIn = 'Required';
      if (!formData.checkOut) newErrors.checkOut = 'Required';
      if (formData.checkIn && formData.checkOut && new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        newErrors.checkOut = 'Check-out must be after check-in';
      }
    } else {
      if (!formData.checkIn) newErrors.checkIn = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      // In a real application, we would post this data to an API
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guestsCount: 2,
      specialNotes: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="reserve-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1A1A]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-sm bg-[#F5F1EB] text-[#2C2C2C] border border-[#D9D3C7] shadow-xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D9D3C7] px-6 py-5">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#7A7468] uppercase">
                  Reservation Enquiry
                </span>
                <h3 className="font-serif text-2xl font-light text-[#2C2C2C] mt-0.5">
                  Rubavu Frontier View
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-[#7A7468] hover:text-[#2C2C2C] transition-colors p-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type Choice */}
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7A7468] mb-2.5">
                      1. What are you reserving?
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['lodge', 'room', 'restaurant', 'experience'] as ReservationType[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => { setType(t); setErrors({}); }}
                          className={`py-2 px-3 text-xs font-medium border text-center transition-all ${
                            type === t
                              ? 'bg-[#4A5240] text-[#F5F1EB] border-[#4A5240]'
                              : 'border-[#D9D3C7] text-[#7A7468] hover:border-[#7A7468]'
                          }`}
                        >
                          {t === 'lodge' && 'General Stay'}
                          {t === 'room' && 'A Specific Room'}
                          {t === 'restaurant' && 'Restaurant Table'}
                          {t === 'experience' && 'An Experience'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Context options */}
                  {type === 'room' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <label htmlFor="targetId" className="block text-xs font-mono uppercase tracking-wider text-[#7A7468]">
                        Select Cabin/Suite
                      </label>
                      <select
                        id="targetId"
                        name="targetId"
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        className="w-full bg-white border border-[#D9D3C7] px-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240]"
                      >
                        <option value="">Choose a room type...</option>
                        <option value="frontier-suite">Frontier Suite</option>
                        <option value="lake-view">Lake View Room</option>
                        <option value="ridge-room">Ridge Room</option>
                      </select>
                    </motion.div>
                  )}

                  {type === 'experience' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <label htmlFor="targetId" className="block text-xs font-mono uppercase tracking-wider text-[#7A7468]">
                        Select Guided Experience
                      </label>
                      <select
                        id="targetId"
                        name="targetId"
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        className="w-full bg-white border border-[#D9D3C7] px-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240]"
                      >
                        <option value="">Select an adventure...</option>
                        <option value="boat-trip">Lake Kivu by Boat</option>
                        <option value="congo-nile">The Congo-Nile Trail</option>
                        <option value="town-walk">Rubavu Town Walk</option>
                        <option value="community-visit">Nearby Communities Visit</option>
                        <option value="lodge-evening">In-Lodge Fireside Evening</option>
                      </select>
                    </motion.div>
                  )}

                  {/* Contact Info (Group 1) */}
                  <div className="space-y-4">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7A7468]">
                      2. Personal details
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label htmlFor="fullName" className="block text-[11px] font-sans text-[#7A7468]">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7468]">
                            <User className="h-4 w-4" />
                          </span>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            required
                            placeholder="e.g. Jean Damascene"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full bg-white border ${
                              errors.fullName ? 'border-red-500' : 'border-[#D9D3C7]'
                            } pl-9 pr-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240] transition-colors`}
                          />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label htmlFor="email" className="block text-[11px] font-sans text-[#7A7468]">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7468]">
                            <Mail className="h-4 w-4" />
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="e.g. info@domain.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-white border ${
                              errors.email ? 'border-red-500' : 'border-[#D9D3C7]'
                            } pl-9 pr-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240] transition-colors`}
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1">
                        <label htmlFor="phone" className="block text-[11px] font-sans text-[#7A7468]">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7468]">
                            <Phone className="h-4 w-4" />
                          </span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="e.g. +250 795..."
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full bg-white border ${
                              errors.phone ? 'border-red-500' : 'border-[#D9D3C7]'
                            } pl-9 pr-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240] transition-colors`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                      </div>

                      {/* Number of Guests */}
                      <div className="space-y-1">
                        <label htmlFor="guestsCount" className="block text-[11px] font-sans text-[#7A7468]">
                          Number of Guests
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7468]">
                            <Users className="h-4 w-4" />
                          </span>
                          <input
                            type="number"
                            id="guestsCount"
                            name="guestsCount"
                            min={1}
                            max={12}
                            value={formData.guestsCount}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-[#D9D3C7] pl-9 pr-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dates & Scheduling */}
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-[#7A7468] mb-3">
                      3. Timing Details
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="checkIn" className="block text-[11px] font-sans text-[#7A7468]">
                          {type === 'experience' || type === 'restaurant' ? 'Date' : 'Arrival Date'}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7468]">
                            <Calendar className="h-4 w-4" />
                          </span>
                          <input
                            type="date"
                            id="checkIn"
                            name="checkIn"
                            required
                            value={formData.checkIn}
                            onChange={handleInputChange}
                            className={`w-full bg-white border ${
                              errors.checkIn ? 'border-red-500' : 'border-[#D9D3C7]'
                            } pl-9 pr-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240] transition-colors`}
                          />
                        </div>
                        {errors.checkIn && <p className="text-red-500 text-[10px] mt-0.5">{errors.checkIn}</p>}
                      </div>

                      {type !== 'experience' && type !== 'restaurant' ? (
                        <div className="space-y-1">
                          <label htmlFor="checkOut" className="block text-[11px] font-sans text-[#7A7468]">
                            Departure Date
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7468]">
                              <Calendar className="h-4 w-4" />
                            </span>
                            <input
                              type="date"
                              id="checkOut"
                              name="checkOut"
                              required
                              value={formData.checkOut}
                              onChange={handleInputChange}
                              className={`w-full bg-white border ${
                                errors.checkOut ? 'border-red-500' : 'border-[#D9D3C7]'
                              } pl-9 pr-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240] transition-colors`}
                            />
                          </div>
                          {errors.checkOut && <p className="text-red-500 text-[10px] mt-0.5">{errors.checkOut}</p>}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <label htmlFor="specialNotes" className="block text-[11px] font-sans text-[#7A7468]">
                            Preferred Time
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7468]">
                              <GlassWater className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              id="preferredTime"
                              name="specialNotes"
                              placeholder="e.g. 17:00 Sunset Sail"
                              value={formData.specialNotes}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-[#D9D3C7] pl-9 pr-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Requests (when stay is selected) */}
                  {(type === 'lodge' || type === 'room') && (
                    <div className="space-y-1">
                      <label htmlFor="specialNotes" className="block text-[11px] font-sans text-[#7A7468]">
                        Special Notes or Dietary Requirements
                      </label>
                      <textarea
                        id="specialNotes"
                        name="specialNotes"
                        rows={2}
                        placeholder="Please inform us of any requests, airport pickup needs, or dietary rules..."
                        value={formData.specialNotes}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-[#D9D3C7] px-3 py-2 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#4A5240]"
                      />
                    </div>
                  )}

                  {/* Submission Notice & CTA */}
                  <div className="pt-2 border-t border-[#D9D3C7]">
                    <p className="text-[11px] text-[#7A7468] mb-4 font-mono">
                      * Rubavu Frontier View operates in a peaceful wilderness setting. Requests are hand-checked with answers sent via email in under 3 hours.
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-[#4A5240] hover:bg-[#2E3A28] text-[#F5F1EB] py-3 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                      Send Enquiry
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Editorial Receipt State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 flex flex-col items-center text-center space-y-6"
                >
                  <div className="h-14 w-14 rounded-full bg-[#4A5240] text-[#F5F1EB] flex items-center justify-center shadow-inner">
                    <Check className="h-6 w-6" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <span className="font-mono text-[10px] text-[#7A7468] uppercase tracking-widest block">
                      Enquiry Registered
                    </span>
                    <h4 className="font-serif text-3xl font-light text-[#2C2C2C]">
                      Your journey begins.
                    </h4>
                    <p className="text-sm text-[#7A7468] leading-relaxed pt-2">
                      Thank you, <strong className="text-[#2C2C2C] font-normal">{formData.fullName}</strong>. We have dispatched a preliminary receipt to <strong className="text-[#2C2C2C] font-normal">{formData.email}</strong>. Our guest experience manager is coordinating available blocks for you.
                    </p>
                  </div>

                  {/* Summary Slip */}
                  <div className="w-full max-w-sm border border-[#D9D3C7] rounded p-4 bg-white/50 text-left space-y-3 font-mono text-xs">
                    <div className="text-center border-b border-[#D9D3C7] pb-2 font-serif text-lg tracking-wide italic text-[#4A5240]">
                      Frontier View Voucher
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7468]">Reservation Type:</span>
                      <span className="text-[#2C2C2C] font-medium uppercase">{type}</span>
                    </div>
                    {targetId && (
                      <div className="flex justify-between">
                        <span className="text-[#7A7468]">Selection:</span>
                        <span className="text-[#2C2C2C] font-medium capitalize">{targetId.replace('-', ' ')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#7A7468]">Check-in Date:</span>
                      <span className="text-[#2C2C2C] font-medium">{formData.checkIn}</span>
                    </div>
                    {type !== 'experience' && type !== 'restaurant' && (
                      <div className="flex justify-between">
                        <span className="text-[#7A7468]">Check-out Date:</span>
                        <span className="text-[#2C2C2C] font-medium">{formData.checkOut}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#7A7468]">Guests Count:</span>
                      <span className="text-[#2C2C2C] font-medium">{formData.guestsCount} Pax</span>
                    </div>
                    <div className="border-t border-[#D9D3C7] pt-2 flex justify-between text-[10px] text-[#7A7468] italic">
                      <span>Ref ID:</span>
                      <span>RFV-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="border border-[#7A7468] hover:border-[#2C2C2C] hover:bg-white text-[#2C2C2C] px-6 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-sm"
                  >
                    Close Sheet
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
