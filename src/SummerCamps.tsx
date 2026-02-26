import { useEffect, useMemo, useState } from 'react';
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
  ArrowRight,
  ChevronDown,
  Linkedin,
  ChevronRight,
  CheckCircle,
  XCircle
} from 'lucide-react';
import './SummerCamps.css';
import { STRIPE_CAMP_PRODUCTS, STRIPE_ADDON_PRODUCTS } from './stripeConfig';

// Backend API URL – leave empty for dev (Vite proxy), or set VITE_API_URL for production
const API_URL = import.meta.env.VITE_API_URL || '';

// Processing fee configuration (Stripe's standard rate)
const PROCESSING_FEE_RATE = 0.029; // 2.9%
const PROCESSING_FEE_FIXED = 0.30;  // 30 cents

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function SummerCamps() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const [registrantName, setRegistrantName] = useState('');
  const [registrantEmail, setRegistrantEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [childGrade, setChildGrade] = useState('');
  const [photoConsent, setPhotoConsent] = useState(false);
  const [addonWL, setAddonWL] = useState(false);
  const [hearAboutUs, setHearAboutUs] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Read checkout status from Stripe redirect query params
  const { checkoutSuccess, checkoutCanceled } = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      checkoutSuccess: params.get('success') === 'true',
      checkoutCanceled: params.get('canceled') === 'true',
    };
  }, []);

  const [statusDismissed, setStatusDismissed] = useState(false);

  const clearError = (field: string) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const campsList = [
    {
      key: 'CAD & Design',
      stripeKey: 'camp_cad',
      title: 'CAD & Design',
      weekId: 'week1',
      dates: 'August 17-21, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      stripePriceId: STRIPE_CAMP_PRODUCTS.find(p => p.label === 'CAD & Design')?.stripePriceId || '',
      description: `For rising 6th-8th graders. This hands-on, week-long camp is all about introducing students to the exciting world of CAD & Design. Using Onshape, an online CAD tool, students will learn how to create their own CAD models, from simple shapes to personalized projects like name tags and desk organizers. Along the way, they'll explore how CAD is used in the real world in industries such as Semiconductors, Automotive, Aerospace, and many more. They will also get a behind-the-scenes look at how 3D printing works, and get to print some of their own designs. The week wraps up with a fun showcase where students present their final projects to other students, where their project would get voted on to win a trophy at the end of the camp.`,
    },
    {
      key: 'Programming',
      stripeKey: 'camp_programming',
      title: 'Programming',
      weekId: 'week2',
      dates: 'August 24-28, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      stripePriceId: STRIPE_CAMP_PRODUCTS.find(p => p.label === 'Programming')?.stripePriceId || '',
      description: `For rising 6th-8th graders. In this camp, students will learn how to program robots using the WPILib framework. Each student will work with a Pololu ROMI robot throughout the week, applying new concepts as they learn them. The course introduces Java, one of the world’s most popular programming languages, and exposes students to programming techniques used by Team 1294 on competition robots, including PID control, commands, and subsystems. Over five days, students will progressively build their skills with the goal of programming their robot to autonomously complete an obstacle course as quickly as possible. No prior experience is required, but students must bring a personal (non-school) laptop.`,
    },
    {
      key: 'Engineering 1',
      stripeKey: 'camp_engineering1',
      title: 'Engineering 1',
      weekId: 'week1',
      dates: 'August 17-21, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      stripePriceId: STRIPE_CAMP_PRODUCTS.find(p => p.label === 'Engineering 1')?.stripePriceId || '',
      description: `For rising 6th-7th graders. This camp is for students who enjoy figuring out how things work and like to build with their hands. Each day features a new project—like experimenting with simple circuits, building a foam boat that actually moves, and working in teams to design a drawbridge. The projects are designed to be beginner-friendly but open-ended, so students can experiment, problem-solve, and make their ideas come to life. No prior experience is needed—just an interest in building and trying new things!`,
    },
    {
      key: 'Engineering 2',
      stripeKey: 'camp_engineering2',
      title: 'Engineering 2',
      weekId: 'week2',
      dates: 'August 24-28, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      stripePriceId: STRIPE_CAMP_PRODUCTS.find(p => p.label === 'Engineering 2')?.stripePriceId || '',
      description: `For rising 8th-9th graders. The engineering 2 summer camp serves to be a more advanced version of engineering 1, designed for older students. It will consist of larger, more in depth projects fit for an older age group with longer attention spans. There will not be any content overlap between the Engineering 1 and Engineering 2 camps. Engineering 2 aims to provide students with projects that allow them to explore more complicated topics with electrical and mechanical. It could also possibly include basic programming depending on the projects we select.`,
    }
  ];

  const addonsList = [
    {
      key: 'Womens Leadership',
      title: "Women's Leadership Add-on",
      price: 100,
      stripePriceId: STRIPE_ADDON_PRODUCTS.find(p => p.key === 'addon_womens_leadership')?.stripePriceId || '',
      description: `The women’s leadership camp will be held 1 hour before both Engineering 1 and 2 from 8 AM - 9 AM. This class teaches young women leadership skills that will help them navigate the world of engineering as a minority. During this camp, we will be teaching different leadership styles, communication styles, and learn how to navigate conflicts in order to teach young women to be confident in their areas of work.`,
      time: '8:00 AM - 9:00 AM',
    }
  ];

  const weekIds = Array.from(new Set(campsList.map(c => c.weekId).filter(Boolean)));
  const initialSelectedByWeek = Object.fromEntries(weekIds.map((id) => [id, null]));
  const [selectedByWeek, setSelectedByWeek] = useState<Record<string, string | null>>(initialSelectedByWeek);

  const handleSelectCamp = (campKey: string, weekId?: string) => {
    if (!weekId) return;
    setSelectedByWeek((prev) => ({
      ...prev,
      [weekId]: prev[weekId] === campKey ? null : campKey,
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCampKeys = Object.values(selectedByWeek).filter(Boolean) as string[];
    const errors: Record<string, string> = {};
    if (!registrantName?.trim()) errors.registrantName = 'Student name is required';
    if (!childGrade) errors.childGrade = 'Student grade is required';
    if (!parentName?.trim()) errors.parentName = 'Parent name is required';
    if (!parentEmail?.trim()) errors.parentEmail = 'Parent email is required';
    if (!parentPhone?.trim()) errors.parentPhone = 'Parent phone number is required';
    if (selectedCampKeys.length === 0) errors.camps = 'Please select at least one camp';
    if (!photoConsent) errors.photoConsent = 'Please accept the media release';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Collect selected camp objects with their server-side keys
    const selectedCamps = campsList.filter(c => selectedCampKeys.includes(c.key));

    try {
      // When API_URL is empty (dev/Codespaces), this fetches from the same origin;
      // Vite's dev server proxy forwards it to http://localhost:3001.
      const response = await fetch(`${API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedCamps: selectedCamps.map(c => c.stripeKey),
          addonWL,
          registrantName,
          registrantEmail,
          childGrade,
          parentName,
          parentEmail,
          parentPhone,
          hearAboutUs,
        }),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => '');
        let errorMessage = 'Failed to create checkout session';
        try {
          const errData = JSON.parse(text);
          if (errData.error) errorMessage = errData.error;
        } catch {
          if (text) errorMessage = `Server returned ${response.status}: ${text.slice(0, 200)}`;
        }
        throw new Error(errorMessage);
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        alert('Could not create checkout session. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      // Network errors (backend not running, CORS, timeout, etc.) are TypeErrors from fetch()
      const isNetworkError = err instanceof TypeError;
      if (isNetworkError) {
        alert(
          'Could not connect to the checkout server.\n\n' +
          'Make sure the backend is running:\n' +
          '  cd server && npm install && npm start\n\n' +
          'See server/.env.example for required environment variables.'
        );
      } else {
        const message = err instanceof Error ? err.message : 'Unknown error';
        alert(`Checkout failed: ${message}\n\nPlease try again or contact us.`);
      }
    }
  };

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
    document.title = 'Summer Camps | Pack of Parts';
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
                    className="relative flex items-center"
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
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              SUMMER 2026
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Robotics Summer Camps
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in-up mb-8"
            style={{ animationDelay: '0.6s' }}
          >
            Week-long STEM camps for middle school students. Build, code, and compete 
            with robots while making new friends and learning from FRC mentors!
          </p>

          <div 
            className="animate-fade-in-up flex flex-wrap gap-4 justify-center"
            style={{ animationDelay: '0.8s' }}
          >
            <a href="#register" className="btn-primary inline-flex items-center gap-2">
              Register Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#details" 
              className="px-8 py-3 border-2 border-light-blue text-light-blue font-semibold rounded-pill transition-all duration-300 hover:bg-light-blue hover:text-navy"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
{/*       
      <section className="bg-light-blue py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Calendar, label: 'June - August', subtext: '2025' },
              { icon: Users, label: 'Ages 11-14', subtext: 'Grades 6-8' },
              { icon: Clock, label: '5 Days', subtext: '9AM - 12PM' },
              { icon: MapPin, label: 'Eastlake HS', subtext: 'Sammamish, WA' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="w-8 h-8 text-navy mb-2" />
                <div className="font-orbitron font-bold text-navy">{item.label}</div>
                <div className="text-sm text-navy/70">{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Checkout Status Modal */}
      {(checkoutSuccess || checkoutCanceled) && !statusDismissed && (
        <div
          className="fixed inset-0 z-[100] backdrop-blur-md bg-navy/85 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-status-title"
          onKeyDown={(e) => e.key === 'Escape' && setStatusDismissed(true)}
          tabIndex={-1}
        >
          <div className="relative bg-navy border-2 border-light-blue rounded-2xl p-10 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
            <button
              onClick={() => setStatusDismissed(true)}
              className="absolute top-4 right-4 text-white/70 hover:text-light-blue transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            {checkoutSuccess ? (
              <>
                <CheckCircle className="w-14 h-14 text-light-blue mb-5 flex-shrink-0" />
                <h3 id="checkout-status-title" className="text-xl font-orbitron font-bold text-white mb-4">Registration Successful!</h3>
                <p className="text-white/80 leading-relaxed">
                  Thank you for registering! Your payment has been received. You will receive a confirmation email shortly with details about the camp.
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-14 h-14 text-light-blue mb-5 flex-shrink-0" />
                <h3 id="checkout-status-title" className="text-xl font-orbitron font-bold text-white mb-4">Checkout Canceled</h3>
                <p className="text-white/80 leading-relaxed">
                  Your checkout was canceled and you have not been charged. You can register again anytime using the form below.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Camps Section */}
      <section id="details" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Camps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our hands-on summer camps designed for middle schoolers and rising freshmen. All camps will be held at Eastlake High School from 9 AM to 12 PM, with the exception of Women's Leadership which is 8 AM - 9 AM.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {campsList.map((camp, index) => (
              <div key={camp.key} className="reveal camp-card bg-white p-6 rounded-2xl" style={{ transitionDelay: `${index * 0.08}s` }}>
                <h3 className="text-navy font-orbitron font-bold text-xl mb-2">{camp.title}</h3>
                <div className="mb-1 text-sm text-navy font-medium">Dates: {camp.dates}</div>
                <div className="mb-1 text-sm text-navy font-medium">Time: {camp.time}</div>
                <div className="mb-3 text-sm text-navy font-medium">Price: ${camp.price}</div>
                <p className="text-gray-600">{camp.description}</p>
              </div>
            ))}

            {addonsList.map((addon, i) => (
              <div key={addon.key} className="reveal camp-card bg-white p-6 rounded-2xl md:col-span-2" style={{ transitionDelay: `${(campsList.length + i) * 0.08}s` }}>
                <h3 className="text-navy font-orbitron font-bold text-xl mb-2">{addon.title}</h3>
                <div className="mb-1 text-sm text-navy font-medium">Time: {addon.time}</div>
                <div className="mb-3 text-sm text-navy font-medium">Price: ${addon.price}</div>
                <p className="text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Removed Daily Schedule (moved to camps overview) */}

      {/* Camp Sessions removed — camps listed above */}

      {/* Pricing & Details removed — simplified page structure */}

      {/* Registration Section */}
      <section id="register" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 reveal">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
                Register for Summer Camps
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                Select one or more camps below, then complete payment to secure your spot. If registering more than one child, please fill out the form twice.
              </p>
            </div>

            <form onSubmit={handleCheckout} className="reveal bg-white p-8 rounded-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student name <span className="text-red-500">*</span></label>
                <input
                  value={registrantName}
                  onChange={(e) => { setRegistrantName(e.target.value); clearError('registrantName'); }}
                  placeholder="First Last"
                  className={`w-full border px-4 py-2 rounded-md ${fieldErrors.registrantName ? 'border-red-500' : ''}`}
                />
                {fieldErrors.registrantName && <p className="text-red-500 text-sm mt-1">{fieldErrors.registrantName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Child's email</label>
                <input
                  value={registrantEmail}
                  onChange={(e) => setRegistrantEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student grade (2026–2027 school year) <span className="text-red-500">*</span></label>
                <select
                  value={childGrade}
                  onChange={(e) => { setChildGrade(e.target.value); clearError('childGrade'); }}
                  className={`w-full border px-4 py-2 rounded-md ${fieldErrors.childGrade ? 'border-red-500' : ''}`}
                >
                  <option value="">Select grade</option>
                  <option value="6">6th grade</option>
                  <option value="7">7th grade</option>
                  <option value="8">8th grade</option>
                  <option value="9">9th grade</option>
                </select>
                {fieldErrors.childGrade && <p className="text-red-500 text-sm mt-1">{fieldErrors.childGrade}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent or guardian name <span className="text-red-500">*</span></label>
                <input
                  value={parentName}
                  onChange={(e) => { setParentName(e.target.value); clearError('parentName'); }}
                  placeholder="First Last"
                  className={`w-full border px-4 py-2 rounded-md ${fieldErrors.parentName ? 'border-red-500' : ''}`}
                />
                {fieldErrors.parentName && <p className="text-red-500 text-sm mt-1">{fieldErrors.parentName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent or guardian email <span className="text-red-500">*</span></label>
                <input
                  value={parentEmail}
                  onChange={(e) => { setParentEmail(e.target.value); clearError('parentEmail'); }}
                  placeholder="you@example.com"
                  type="email"
                  className={`w-full border px-4 py-2 rounded-md ${fieldErrors.parentEmail ? 'border-red-500' : ''}`}
                />
                {fieldErrors.parentEmail && <p className="text-red-500 text-sm mt-1">{fieldErrors.parentEmail}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent or guardian phone number <span className="text-red-500">*</span></label>
                <input
                  value={parentPhone}
                  onChange={(e) => { setParentPhone(formatPhoneNumber(e.target.value)); clearError('parentPhone'); }}
                  placeholder="(555) 123 4567"
                  type="tel"
                  className={`w-full border px-4 py-2 rounded-md ${fieldErrors.parentPhone ? 'border-red-500' : ''}`}
                />
                {fieldErrors.parentPhone && <p className="text-red-500 text-sm mt-1">{fieldErrors.parentPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Where did you hear about us?</label>
                <select
                  value={hearAboutUs}
                  onChange={(e) => setHearAboutUs(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Peachjar">Peachjar</option>
                  <option value="Friends/family">Friends/family</option>
                  <option value="Teacher/school admin">Teacher/school admin</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={fieldErrors.camps ? 'border border-red-500 rounded-md p-4' : ''}>
                <h3 className="text-lg font-orbitron font-semibold text-navy mb-3">Camps <span className="text-red-500">*</span></h3>
                {fieldErrors.camps && <p className="text-red-500 text-sm mb-2">{fieldErrors.camps}</p>}
                <div className="space-y-4">
                  {weekIds.map((weekId) => (
                    <div key={weekId} className="p-4">
                      <div className="font-semibold mb-2">{campsList.find(c => c.weekId === weekId)?.dates}</div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {campsList.filter(c => c.weekId === weekId).map((camp) => (
                          <label key={camp.key} className="flex items-center gap-3 border rounded-md p-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name={weekId}
                              checked={selectedByWeek[weekId] === camp.key}
                              onChange={() => { handleSelectCamp(camp.key, weekId); clearError('camps'); }}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-orbitron font-semibold text-navy">{camp.title}</div>
                                  <div className="text-sm text-gray-600">{camp.time}</div>
                                </div>
                                <div className="text-navy font-medium">${camp.price}</div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Add-ons</h4>
                <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer">
                  <input id="wl" type="checkbox" checked={addonWL} onChange={() => setAddonWL(!addonWL)} />
                  <div>
                    <div className="font-orbitron font-semibold text-navy">{addonsList[0].title}</div>
                    <div className="text-sm text-gray-600">{addonsList[0].time} (before Engineering 1 & 2) — ${addonsList[0].price}</div>
                  </div>
                </label>
              </div>

              <div className={fieldErrors.photoConsent ? 'border border-red-500 rounded-md p-3' : ''}>
                <h4 className="text-sm font-semibold mb-2">Media release <span className="text-red-500">*</span></h4>
                {fieldErrors.photoConsent && <p className="text-red-500 text-sm mb-2">{fieldErrors.photoConsent}</p>}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={photoConsent}
                    onChange={(e) => { setPhotoConsent(e.target.checked); clearError('photoConsent'); }}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">
                    I acknowledge that photos/videos of my child may be taken and used for FRC award documentation or promotional purposes.
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t">
                {(() => {
                  const subtotal = campsList.filter(c => Object.values(selectedByWeek).includes(c.key)).reduce((s, c) => s + c.price, 0) + (addonWL ? 100 : 0);
                  const processingFee = subtotal > 0 ? Math.round(((subtotal + PROCESSING_FEE_FIXED) / (1 - PROCESSING_FEE_RATE) - subtotal) * 100) / 100 : 0;
                  const total = Math.round((subtotal + processingFee) * 100) / 100;
                  return (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-gray-700 font-medium">Subtotal</div>
                        <div className="font-orbitron text-navy">${subtotal.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-gray-500 text-sm">Processing Fees</div>
                        <div className="font-orbitron text-navy text-sm">${processingFee.toFixed(2)}</div>
                      </div>
                      <div className="mb-1">&nbsp;</div>
                      <div className="border-t pt-2 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="text-gray-700 font-medium">Total</div>
                          <div className="font-orbitron font-bold text-navy">${total.toFixed(2)}</div>
                        </div>
                      </div>
                    </>
                  );
                })()}

                <div className="flex items-center gap-4">
                  <button type="submit" className="btn-primary text-navy inline-flex items-center gap-2">Go to Checkout</button>
                  <button type="button" onClick={() => { setRegistrantName(''); setRegistrantEmail(''); setParentName(''); setParentEmail(''); setParentPhone(''); setChildGrade(''); setPhotoConsent(false); setSelectedByWeek(initialSelectedByWeek); setAddonWL(false); setFieldErrors({}); }} className="px-4 py-2 border rounded-md">Clear</button>
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Note: You will be redirected to a Stripe payment page. Please enter the same information you used for registration to complete the payment, so that we can match your registration and payment.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Does my child need prior robotics experience?",
                answer: "No! All of our camps are designed for beginners. We'll teach everything from the ground up."
              },
              {
                question: "What if my child doesn't have a laptop?",
                answer: "Certain camps require personal laptops. If your child doesn't have one, please contact us and we'll try to arrange one for them."
              },
              {
                question: "Are snacks provided?",
                answer: "We will be providing snacks; however, it is still recommended to bring some snacks with you, as we will have a limited amount. There will be a water fountain available as well"
              },
              {
                question: "What is your cancellation policy?",
                answer: "Contact us minimum 2 weeks before the start of the camp to receive a full refund."
              },
              {
                question: "Can my child attend multiple camps?",
                answer: "Yes. Each week, two camps will be running simultaneously, so you can register for one camp per week."
              },
              {
                question: "What safety measures are in place?",
                answer: "Campers will be supervised by a mentor/parent at all times. We follow shop safety protocols for all equipment and activities."
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

export default SummerCamps;
