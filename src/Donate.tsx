import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Instagram,
  Facebook,
  Youtube,
  Github,
  Menu,
  X,
  Heart,
  Building2,
  Gift,
  CheckCircle,
  CreditCard,
  Receipt,
  TrendingUp,
  Award,
  Linkedin,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { STRIPE_BUY_BUTTON_ID, STRIPE_PUBLISHABLE_KEY } from './stripeConfig';
import './Donate.css';

function Donate() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [stripeTimedOut, setStripeTimedOut] = useState(false);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Join The Club', href: '/join' },
    { name: 'For Members', href: '/members' },
    { 
      name: 'Community', 
      href: '/community',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Meet the Team', href: '/community/meet-the-team' },
        { name: 'STEM Kits', href: '/community/stem-kits' },
        { name: 'Recycling Initiative', href: '/community/recycling' }
      ]
    },
    { name: 'Donate', href: '/donate' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Summer Camps', href: '/summer-camps' },
  ];

  useEffect(() => {
    document.title = 'Donate | Pack of Parts';
  }, []);

  // Scroll handler for nav visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsNavVisible(window.scrollY > 100 || window.scrollY === 0);
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

  // Track when Stripe Buy Button custom element is defined
  useEffect(() => {
    if (!STRIPE_BUY_BUTTON_ID || !STRIPE_PUBLISHABLE_KEY) return;

    if (customElements.get('stripe-buy-button')) {
      setStripeReady(true);
      return;
    }

    customElements.whenDefined('stripe-buy-button').then(() => setStripeReady(true));

    const timeout = setTimeout(() => setStripeTimedOut(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to route
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="container-custom pt-4 pb-0">
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
                link.hasDropdown ? (
                  <div 
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsCommunityDropdownOpen(true)}
                    onMouseLeave={() => setIsCommunityDropdownOpen(false)}
                  >
                    <a
                      href={link.href}
                      className="text-white/90 hover:text-light-blue text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200 inline-flex items-center gap-1"
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCommunityDropdownOpen ? 'rotate-180' : ''}`} />
                    </a>
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 py-2 bg-navy/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 min-w-[200px] transition-all duration-200 ${isCommunityDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      {link.dropdownItems?.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-white/90 hover:text-light-blue hover:bg-white/5 text-sm font-medium transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/90 hover:text-light-blue text-xs xl:text-sm font-semibold uppercase tracking-wide link-underline transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                )
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
          className={`lg:hidden fixed inset-0 top-20 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-start h-full px-4 pt-6">
            <div className="nav-glass w-full max-w-xs rounded-3xl px-8 py-8 flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                link.hasDropdown ? (
                  <div key={link.name} className="flex flex-col items-center gap-2">
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white text-xl font-orbitron font-semibold hover:text-light-blue transition-colors duration-200"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {link.name}
                    </a>
                    <div className="flex flex-col items-center gap-2">
                      {link.dropdownItems?.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-white/70 text-sm font-medium hover:text-light-blue transition-colors duration-200"
                        >
                          → {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white text-xl font-orbitron font-semibold hover:text-light-blue transition-colors duration-200"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center px-4 py-20">
          <div 
            className="animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Heart className="w-16 h-16 text-light-blue mx-auto mb-6" />
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Support Our <span className="text-gradient">Mission</span>
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Pack of Parts is a non-profit organization. We fund our activities from club participation fees, 
            corporate sponsors, and generous supporters like you. Your donation helps inspire the next generation 
            of STEM leaders.
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Your Impact Matters
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every donation directly supports our students and helps us continue our mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                amount: '$50',
                impact: 'Provides tools and materials for a student\'s first project',
                icon: Gift
              },
              {
                amount: '$100',
                impact: 'Covers registration fees for a student to compete',
                icon: Award
              },
              {
                amount: '$250',
                impact: 'Funds safety equipment and workshop supplies',
                icon: CheckCircle
              },
              {
                amount: '$500+',
                impact: 'Supports travel to competitions and championships',
                icon: TrendingUp
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal impact-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-light-blue/10 flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-8 h-8 text-light-blue" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-orbitron font-bold text-navy mb-3">
                    {item.amount}
                  </div>
                  <p className="text-gray-600">
                    {item.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Methods Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Ways to Donate
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            {/* Stripe Payment */}
            <div className="reveal donation-method-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-light-blue/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-7 h-7 text-light-blue" />
                </div>
                <div>
                  <h3 className="text-navy font-orbitron font-semibold text-2xl mb-2">
                    Stripe
                  </h3>
                  <p className="text-gray-600">
                    Secure online payment via credit or debit card
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Accepts all major credit and debit cards</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tax-deductible receipt provided</span>
                </div>
              </div>

              {/* Stripe Buy Button */}
              <div className="w-full rounded-2xl overflow-hidden border-2 border-light-blue/20 shadow-md p-6 flex flex-col items-center justify-center">
                {STRIPE_BUY_BUTTON_ID && STRIPE_PUBLISHABLE_KEY ? (
                  <>
                    {!stripeReady && !stripeTimedOut && (
                      <p className="text-gray-400 text-sm animate-pulse py-4">
                        Loading payment button…
                      </p>
                    )}
                    {stripeTimedOut && !stripeReady && (
                      <p className="text-gray-500 text-center py-4">
                        The payment button could not be loaded. Please try disabling your ad-blocker or{' '}
                        <a href="/contact" className="text-light-blue underline">contact us</a>{' '}
                        for alternative payment options.
                      </p>
                    )}
                    <stripe-buy-button
                      buy-button-id={STRIPE_BUY_BUTTON_ID}
                      publishable-key={STRIPE_PUBLISHABLE_KEY}
                    />
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Online payments are temporarily unavailable. Please use an alternative donation method below.
                  </p>
                )}
              </div>
            </div>

            {/* Check/Mail */}
            <div className="reveal donation-method-card" style={{ transitionDelay: '0.1s' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-light-blue/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-light-blue" />
                </div>
                <div>
                  <h3 className="text-navy font-orbitron font-semibold text-2xl mb-2">
                    Check or Mail
                  </h3>
                  <p className="text-gray-600">
                    Send a check to our mailing address
                  </p>
                </div>
              </div>
              
              <div className="bg-light-blue/5 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2">Make checks payable to:</p>
                <p className="font-semibold text-navy mb-3">Pack of Parts FRC Team 1294</p>
                <p className="text-sm text-gray-600 mb-1">Mail to:</p>
                <p className="text-gray-700">
                  Eastlake High School<br />
                  Attn: Pack of Parts<br />
                  400 228th Ave NE<br />
                  Sammamish, WA 98074
                </p>
              </div>

              <a 
                href="/contact"
                className="btn-primary-light w-full justify-center"
              >
                Contact for Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Deductible Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="reveal tax-info-card">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Receipt className="w-16 h-16 text-light-blue mb-6" />
                  <h2 className="text-3xl font-orbitron font-bold text-navy mb-4">
                    Tax Deductible
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Pack of Parts is a registered 501(c)(3) non-profit organization. 
                    All donations are tax-deductible to the fullest extent allowed by law.
                  </p>
                  <p className="text-gray-600">
                    We'll email you a receipt for your records immediately after your donation.
                  </p>
                </div>

                <div className="bg-light-blue/5 p-8 rounded-2xl">
                  <h3 className="text-navy font-orbitron font-semibold text-xl mb-4">
                    Important Info
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Registered 501(c)(3) non-profit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Tax ID provided with receipt</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Receipts sent via email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">All donations directly support students</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Matching */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center reveal">
            <Building2 className="w-16 h-16 text-light-blue mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6">
              Employer <span className="text-gradient">Matching</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Many employers offer donation matching programs that can double or even triple 
              the impact of your gift. Check with your HR department to see if your company 
              participates in a matching gift program.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  step: '1',
                  title: 'Make Your Donation',
                  description: 'Donate to Pack of Parts using any method'
                },
                {
                  step: '2',
                  title: 'Check Eligibility',
                  description: 'Ask your employer about matching programs'
                },
                {
                  step: '3',
                  title: 'Submit Match',
                  description: 'Complete your employer\'s matching form'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                >
                  <div className="text-4xl font-orbitron font-bold text-light-blue mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-white font-orbitron font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
              Corporate Sponsorship
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Interested in becoming a corporate sponsor? We offer various sponsorship 
              levels with benefits including team recognition, competition invitations, 
              and recruiting opportunities.
            </p>
            <a 
              href="/contact"
              className="btn-primary-light inline-flex items-center gap-2"
            >
              Learn About Sponsorship
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Donation FAQ
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How will my donation be used?",
                answer: "Your donation directly supports our students by funding robot parts, competition fees, travel expenses, tools, safety equipment, and educational programs."
              },
              {
                question: "Will I receive a tax receipt?",
                answer: "Yes! As a 501(c)(3) non-profit, we'll email you a tax-deductible receipt immediately after your donation."
              },
              {
                question: "Can I donate in honor of someone?",
                answer: "Absolutely! Just let us know in the donation notes or contact us, and we'll send a special acknowledgment."
              },
              {
                question: "Are there other ways to support the team?",
                answer: "Yes! You can volunteer as a mentor, donate equipment or materials, or help with fundraising events. Contact us to learn more."
              },
              {
                question: "Can I make a recurring donation?",
                answer: "Yes! Contact us to set up monthly or annual recurring donations to provide ongoing support."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="reveal faq-item"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-navy font-orbitron font-semibold text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-navy pt-16 pb-8 border-t border-white/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo & Tagline */}
            <div className="lg:col-span-2 reveal">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="/logo.png" 
                  alt="Pack of Parts Logo" 
                  className="h-16 w-auto"
                />
                <div>
                  <h3 className="text-white font-orbitron font-bold text-xl">
                    Pack of Parts
                  </h3>
                  <p className="text-light-blue text-sm">FRC Team 1294</p>
                </div>
              </div>
              <p className="text-white/70 mb-6 max-w-md">
                Building robots. Building futures. Inspiring the next generation of STEM leaders 
                in Sammamish, Washington.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/packofparts', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/packofparts', label: 'Facebook' },
                  { icon: Youtube, href: 'https://youtube.com/@packofparts', label: 'YouTube' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/packofparts', label: 'Linkedin' },
                  { icon: Github, href: 'https://github.com/packofparts', label: 'Github' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
                <a
                  href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                  aria-label="ChiefDelphi"
                >
                  <img src="/chiefdelphi-logo.svg" alt="ChiefDelphi" className="w-7 h-7" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <h4 className="text-white font-orbitron font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.filter(link => !link.hasDropdown).map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 hover:text-light-blue transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </button>
                  </li>
                ))}
                <li>
                  <a href="/community" className="text-white/70 hover:text-light-blue transition-colors duration-200 flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    Community
                  </a>
                </li>
                <li>
                  <a href="/community/meet-the-team" className="text-white/70 hover:text-light-blue transition-colors duration-200 pl-4">
                    → Meet the Team
                  </a>
                </li>
                <li>
                  <a href="/community/stem-kits" className="text-white/70 hover:text-light-blue transition-colors duration-200 pl-4">
                    → STEM Kits
                  </a>
                </li>
                <li>
                  <a href="/community/recycling" className="text-white/70 hover:text-light-blue transition-colors duration-200 pl-4">
                    → Recycling Initiative
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <h4 className="text-white font-orbitron font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">info@packofparts.org</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">Sammamish, Washington</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <School className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">Eastlake High School</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Pack of Parts (FRC 1294). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Donate;
