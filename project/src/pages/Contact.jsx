import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { settingsService } from '../services/api';

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await settingsService.get();
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch settings');
      }
    };
    fetchSettings();
  }, []);
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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-20">
      <Section>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif mb-4">
            Get In <span className="text-amber-500">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-black border border-amber-500/20 p-8">
              <h2 className="text-2xl font-serif mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-4 py-3 text-white outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-4 py-3 text-white outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-4 py-3 text-white outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-neutral-900/50 border border-gray-700 focus:border-amber-500 px-4 py-3 text-white outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm uppercase tracking-wider mb-2 text-gray-300">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-neutral-900 border border-gray-700 focus:border-amber-500 px-4 py-3 text-white outline-none transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500 text-green-500 px-6 py-4">
                    <p className="font-semibold">Message sent successfully!</p>
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
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black border border-amber-500/20 p-6">
              <MapPin className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Our Studio</h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {settings?.contactInfo?.address || (
                  <>
                    Jhansi Fashion Studio Near State Bank Of India <br />
                    Parvathipuram Manyam , Makkuva Mandal <br />
                    Andhra Pradesh
                  </>
                )}
              </p>
            </div>

            <div className="bg-black border border-amber-500/20 p-6">
              <Phone className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400 leading-relaxed">
                {settings?.contactInfo?.phone || "9010424224"}<br />
                Mon - Fri: 9AM - 6PM<br />
                Sat: 10AM - 4PM
              </p>
            </div>

            <div className="bg-black border border-amber-500/20 p-6">
              <Mail className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400 leading-relaxed">
                {settings?.contactInfo?.email || "Jhansiphotography1125@gmail.com"}<br />
                Response within 24 hours
              </p>
            </div>

            <div className="bg-black border border-amber-500/20 p-6">
              <Clock className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
              <div className="text-gray-400 space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>

              </div>
            </div>

            <div className="bg-black border border-amber-500/20 p-6">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/jhansiphotography1125?igsh=MTVsMGN5c3c3Ym5jdA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-amber-500 p-3 transition-colors border border-neutral-800"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-amber-500 p-3 transition-colors border border-neutral-800"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="aspect-[21/9] bg-black overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.5633539163366!2d83.27046949808869!3d18.659005437968403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3b9feb87582aed%3A0x5fdde323e85c1b2f!2sMakkuva%2C%20Andhra%20Pradesh%20535547%2C%20India!5e1!3m2!1sen!2sus!4v1773062180030!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jhansi Fashion Studio Location"
          />
        </div>
      </Section>
    </div>
  );
}
