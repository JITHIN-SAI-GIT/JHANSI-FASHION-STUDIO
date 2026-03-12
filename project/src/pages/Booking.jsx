import { useState } from 'react';
import { Calendar, MapPin, Mail, Phone, User, MessageSquare } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { bookingService } from '../services/api';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    eventDate: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await bookingService.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        location: formData.location,
        message: formData.message,
        status: 'pending',
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        event_date: formData.eventDate,
        location: formData.location,
        message: formData.message,
      };

      setSubmitStatus('success');
      sendToWhatsApp(bookingData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: 'Wedding',
        eventDate: '',
        location: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendToWhatsApp = (bookingData) => {
    const phoneNumber = '9010424224';
    const message = `Hello Jhansi Fashion Studio!

I have a new booking request:
- Name: ${bookingData.name}
- Email: ${bookingData.email}
- Phone: ${bookingData.phone}
- Event: ${bookingData.event_type}
- Date: ${bookingData.event_date}
- Location: ${bookingData.location}
${bookingData.message ? `- Message: ${bookingData.message}` : ''}

Looking forward to your confirmation!`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const eventTypes = [
    'Wedding',
    'Pre-Wedding',
    'Portrait',
    'Event',
    'Product Photography',
    'Fashion',
    'Other',
  ];

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <div
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              Book Your <span className="text-amber-500">Session</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Let's create beautiful memories together
            </p>
          </div>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="bg-black border border-amber-500/20 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-12 py-3 text-white outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-12 py-3 text-white outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-12 py-3 text-white outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventType" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-gray-700 focus:border-amber-500 px-4 py-3 text-white outline-none transition-colors"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                    Event Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      required
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-12 py-3 text-white outline-none transition-colors"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                  Event Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-12 py-3 text-white outline-none transition-colors"
                    placeholder="City, State or Venue Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                  Additional Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-gray-700 focus:border-amber-500 px-12 py-3 text-white outline-none transition-colors resize-none"
                    placeholder="Tell us about your vision, special requirements, or any questions you have..."
                  />
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500 text-green-500 px-6 py-4">
                  <p className="font-semibold">Booking request submitted successfully!</p>
                  <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-6 py-4">
                  <p className="font-semibold">Something went wrong.</p>
                  <p className="text-sm mt-1">Please try again or contact us directly.</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full text-lg py-4"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </Button>

              <p className="text-gray-400 text-sm text-center">
                By submitting this form, you agree to our terms and conditions. We'll contact you within 24 hours to confirm availability and discuss details.
              </p>
            </form>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-black border border-amber-500/20 p-6">
              <Phone className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400 text-sm">9010424224 (or) 9640411505</p>
            </div>
            <div className="bg-black border border-amber-500/20 p-6">
              <Mail className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400 text-sm"></p>
            </div>
            <div className="bg-black border border-amber-500/20 p-6">
              <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-400 text-sm">Parvathipuram, Vizianagaram, Andhra Pradesh
                Makkuva mandal
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
