import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Send,
  Instagram,
  Facebook,
  Youtube,
  Github,
  Clock,
  Menu,
  X,
  ChevronRight // Added this import
} from 'lucide-react';
import './contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  // Initialize nav visible as true so it doesn't pop in weirdly
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);

  // Updated links to match App.tsx structure
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Join The Club', href: '/join' },
    { name: 'For Members', href: '/#members' },
    { name: 'Community', href: '/#community' },
    { name: 'Donate', href: '/#donate' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Summer Camps', href: '/#camps' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Consistent scroll behavior with App.tsx
      setIsNavVisible(window.scrollY > 100 || window.scrollY < 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Matches App.tsx EXACTLY */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="container-custom py-4">
          <div className="nav-glass rounded-pill px-4 md:px-8 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Pack of Parts Logo" 
                className="h-10 w-auto" 
              />
              <span className="hidden sm:block text-white font-orbitron font-bold text-sm md:text-base">
                Pack of Parts
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-light-blue text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-0 top-20 bg-navy/95 backdrop-blur-lg transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-xl font-orbitron font-semibold hover:text-light-blue transition-colors duration-200"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Reduced height for sub-page */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 container-custom text-center px-4 py-20">
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              GET IN TOUCH
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Contact <span className="text-gradient">Us</span>
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Have questions about joining our team, sponsorship opportunities, or anything else? 
            We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Left Column: Contact Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                
                {/* Email Card */}
                <div className="reveal contact-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Email Us</h3>
                      <a 
                        href="mailto:contact@packofparts.org" 
                        className="text-gray-600 hover:text-light-blue transition-colors duration-200"
                      >
                        contact@packofparts.org
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="reveal contact-card" style={{ transitionDelay: '0.1s' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Location</h3>
                      <p className="text-gray-600">Sammamish, Washington</p>
                      <p className="text-gray-600">United States</p>
                    </div>
                  </div>
                </div>

                {/* School Card */}
                <div className="reveal contact-card" style={{ transitionDelay: '0.2s' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <School className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Home School</h3>
                      <p className="text-gray-600">Eastlake High School</p>
                      <p className="text-gray-600 text-sm mt-1">Representing 5 schools</p>
                    </div>
                  </div>
                </div>

                {/* Meeting Times */}
                <div className="reveal contact-card" style={{ transitionDelay: '0.3s' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-light-blue" />
                    </div>
                    <div>
                      <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Meeting Times</h3>
                      <p className="text-gray-600">Build Season: Mon-Sat</p>
                      <p className="text-gray-600">Off-Season: Schedule varies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="reveal mt-12" style={{ transitionDelay: '0.4s' }}>
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-6">
                  Connect With Us
                </h3>
                <div className="flex gap-4">
                  {[
                    { icon: Instagram, href: '#', label: 'Instagram' },
                    { icon: Facebook, href: '#', label: 'Facebook' },
                    { icon: Youtube, href: '#', label: 'YouTube' },
                    { icon: Github, href: '#', label: 'GitHub' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="social-icon w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-3">
              <div className="reveal contact-form-wrapper">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-navy mb-4">
                    Send Us a <span className="text-gradient">Message</span>
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input form-select"
                    >
                      <option value="">Select a subject</option>
                      <option value="joining">Joining the Team</option>
                      <option value="sponsorship">Sponsorship Opportunities</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="summer-camp">Summer Camps</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="form-input resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in-up">
                      <p className="text-green-800 font-medium">✓ Message sent successfully!</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="container-custom my-12">
        <div className="relative h-px bg-gray-200">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="30" fill="white" stroke="#80D3EE" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" fill="#182651" />
            </svg>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How can I join the team?",
                a: "We welcome students from Eastlake High School and surrounding schools! Reach out via email or attend a meeting."
              },
              {
                q: "When does the team meet?",
                a: "During build season (Jan-Feb), we meet Mon-Sat. Off-season is more flexible."
              },
              {
                q: "Do you offer summer camps?",
                a: "Yes! We run summer robotics camps for middle school students."
              }
            ].map((item, i) => (
              <div key={i} className="reveal faq-item" style={{ transitionDelay: `${i * 0.1}s` }}>
                <h3 className="text-navy font-orbitron font-semibold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Reusing App.tsx footer styles */}
      <footer className="bg-navy pt-16 pb-8 border-t border-white/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2 reveal">
              <div className="flex items-center gap-4 mb-4">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                <div>
                  <h3 className="text-white font-orbitron font-bold text-xl">Pack of Parts</h3>
                  <p className="text-light-blue text-sm">FRC Team 1294</p>
                </div>
              </div>
              <p className="text-white/70 mb-6 max-w-md">Inspiring the next generation of STEM leaders.</p>
            </div>
            
            <div className="reveal">
              <h4 className="text-white font-orbitron font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/70 hover:text-light-blue flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4" /> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal">
              <h4 className="text-white font-orbitron font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-white/70"><Mail className="w-5 h-5 text-light-blue" /> contact@packofparts.org</li>
                <li className="flex gap-3 text-white/70"><MapPin className="w-5 h-5 text-light-blue" /> Sammamish, WA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Pack of Parts (FRC 1294).
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;