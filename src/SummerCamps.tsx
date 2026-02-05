import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Users, 
  Instagram,
  Facebook,
  Youtube,
  Github,
  Menu,
  X,
  Calendar,
  Clock,
  GraduationCap,
  Wrench,
  Code,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Gift,
  Heart,
  Star,
  ChevronDown
} from 'lucide-react';
import './SummerCamps.css';

function SummerCamps() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

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
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              SUMMER 2025
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Robotics <span className="text-gradient">Summer Camps</span>
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

      {/* Quick Info Bar */}
      <section className="bg-light-blue py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Calendar, label: 'June - August', subtext: '2025' },
              { icon: Users, label: 'Ages 11-14', subtext: 'Grades 6-8' },
              { icon: Clock, label: '5 Days', subtext: '9AM - 4PM' },
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
      </section>

      {/* Camp Overview */}
      <section id="details" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              What to Expect
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our camps combine hands-on robotics with programming, engineering design, 
              and teamwork—all taught by experienced FRC Team 1294 members!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Wrench,
                title: 'Build Robots',
                description: 'Design and construct your own robot using LEGO Mindstorms or VEX systems. Learn mechanical engineering basics.'
              },
              {
                icon: Code,
                title: 'Learn to Program',
                description: 'Code your robot to complete challenges autonomously. Introduction to block-based and text programming.'
              },
              {
                icon: Lightbulb,
                title: 'Problem Solving',
                description: 'Work through engineering challenges and design problems. Develop critical thinking and creativity.'
              },
              {
                icon: Users,
                title: 'Team Challenges',
                description: 'Collaborate with other campers on team-based missions. Practice communication and teamwork.'
              },
              {
                icon: Zap,
                title: 'Competition Day',
                description: 'Show off your robot at our end-of-week mini-competition. Compete for prizes and bragging rights!'
              },
              {
                icon: GraduationCap,
                title: 'FRC Mentorship',
                description: 'Learn from current Pack of Parts team members who compete at the highest level of robotics.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal camp-feature-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-light-blue/10 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-light-blue" />
                </div>
                <h3 className="text-navy font-orbitron font-semibold text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Daily Schedule
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A typical day at robotics camp is packed with hands-on activities and learning
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              { time: '9:00 AM', activity: 'Check-in & Morning Activities', description: 'Arrive, settle in, and warm up with robotics challenges' },
              { time: '9:30 AM', activity: 'Daily Lesson', description: 'Learn new concepts in mechanics, programming, or strategy' },
              { time: '10:30 AM', activity: 'Build Time', description: 'Work on your robot with guidance from mentors' },
              { time: '12:00 PM', activity: 'Lunch Break', description: 'Bring your own lunch or purchase from nearby options' },
              { time: '1:00 PM', activity: 'Programming & Testing', description: 'Code your robot and test it on practice courses' },
              { time: '2:30 PM', activity: 'Team Challenges', description: 'Collaborate on group missions and competitions' },
              { time: '3:30 PM', activity: 'Daily Showcase', description: 'Demonstrate what you learned and worked on' },
              { time: '4:00 PM', activity: 'Pick-up', description: 'Wrap up and head home with new skills!' }
            ].map((item, index) => (
              <div 
                key={index}
                className="reveal schedule-item"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-24 text-light-blue font-orbitron font-bold">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">
                      {item.activity}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Camp Sessions */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Camp Sessions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from multiple week-long sessions throughout the summer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                session: 'Session 1',
                dates: 'June 23-27, 2025',
                status: 'Open',
                spots: '12 spots available'
              },
              {
                session: 'Session 2',
                dates: 'July 7-11, 2025',
                status: 'Open',
                spots: '12 spots available'
              },
              {
                session: 'Session 3',
                dates: 'July 21-25, 2025',
                status: 'Open',
                spots: '12 spots available'
              }
            ].map((camp, index) => (
              <div 
                key={index}
                className="reveal session-card"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="mb-4">
                  <h3 className="text-navy font-orbitron font-bold text-2xl mb-2">
                    {camp.session}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>{camp.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{camp.spots}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-green-700 font-semibold">{camp.status}</span>
                </div>
                <a 
                  href="#register"
                  className="block w-full text-center py-3 bg-light-blue text-white font-orbitron font-semibold rounded-pill hover:bg-navy transition-colors duration-200"
                >
                  Register
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Details */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-6">
                Pricing & <span className="text-gradient">Details</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <DollarSign className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Camp Cost</h3>
                    <p className="text-white/70">
                      $350 per week | Early bird discount: $300 (register by May 1st)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Gift className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">What's Included</h3>
                    <p className="text-white/70">
                      All materials, robot kits, instruction, mentorship, and a camp t-shirt
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Need-Based Aid</h3>
                    <p className="text-white/70">
                      Financial assistance available. Contact us for more information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Class Size</h3>
                    <p className="text-white/70">
                      Limited to 12 students per session for personalized attention
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-light-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">Sibling Discount</h3>
                    <p className="text-white/70">
                      10% off for each additional sibling registered
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="bg-white p-8 rounded-2xl">
                <h3 className="text-navy font-orbitron font-bold text-2xl mb-6">
                  What to Bring
                </h3>
                <ul className="space-y-3">
                  {[
                    'Laptop (if you have one - we can provide if needed)',
                    'Lunch and snacks',
                    'Water bottle',
                    'Comfortable clothes that can get dirty',
                    'Closed-toe shoes (required for safety)',
                    'Notebook and pen/pencil',
                    'Enthusiasm and creativity!'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-light-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
                Ready to Register?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Spaces fill up quickly! Secure your spot for an unforgettable summer of robotics.
              </p>
            </div>

            <div className="reveal registration-card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-orbitron font-bold text-navy mb-4">
                  How to Register
                </h3>
              </div>

              <div className="space-y-6 mb-8">
                {[
                  {
                    step: '1',
                    title: 'Contact Us',
                    description: 'Email us at contact@packofparts.org with your preferred session dates'
                  },
                  {
                    step: '2',
                    title: 'Complete Registration',
                    description: 'Fill out the registration form and waiver we\'ll send you'
                  },
                  {
                    step: '3',
                    title: 'Submit Payment',
                    description: 'Pay online or by check to secure your spot'
                  },
                  {
                    step: '4',
                    title: 'Get Ready!',
                    description: 'Receive camp details and preparation information'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-light-blue flex items-center justify-center">
                      <span className="text-white font-orbitron font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="text-navy font-orbitron font-semibold text-lg mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a 
                  href="/contact"
                  className="btn-primary-light inline-flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us to Register
                </a>
              </div>
            </div>
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
                answer: "No! Our camps are designed for beginners. We'll teach everything from the ground up."
              },
              {
                question: "What if my child doesn't have a laptop?",
                answer: "We can provide laptops for campers who need them. Just let us know during registration."
              },
              {
                question: "Is lunch provided?",
                answer: "Campers should bring their own lunch and snacks. We'll have refrigerators available."
              },
              {
                question: "What is your cancellation policy?",
                answer: "Full refund if cancelled 2+ weeks before camp start. 50% refund within 2 weeks. Contact us about special circumstances."
              },
              {
                question: "Can my child attend multiple sessions?",
                answer: "Absolutely! We welcome repeat campers. Each session covers similar material but with different challenges."
              },
              {
                question: "What safety measures are in place?",
                answer: "All campers are supervised by experienced mentors. We follow safety protocols for all equipment and activities."
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
      <footer className="bg-navy pt-16 pb-8 border-t border-white/10">
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
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Mail, href: 'mailto:contact@packofparts.org', label: 'Email' },
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
              </div>
            </div>

            {/* Quick Links */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <h4 className="text-white font-orbitron font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.filter(link => !link.hasDropdown).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-light-blue transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/community" className="text-white/70 hover:text-light-blue transition-colors duration-200">
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
                    <p className="text-white/70">contact@packofparts.org</p>
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
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-light-blue mt-0.5" />
                  <div>
                    <p className="text-white/70">5 Schools Represented</p>
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
