import { useEffect, useRef, useState } from 'react';
import {
  Instagram,
  Facebook,
  Youtube,
  Github,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
  MapPin,
  School,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import './App.css';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';
import QuickLinks from './components/QuickLinks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// ─── Sponsor data ────────────────────────────────────────────────────────────
// Set url to '' (empty string) if no link is available yet.
const sponsors = [
  { image: '/sponsor-1.png',  url: 'https://www.argosyfnd.org/',                  name: 'Argosy Foundation',    description: 'The Argosy Foundation supports innovative organizations and programs that strengthen communities through education, the environment, and social services.' },
  { image: '/sponsor-2.png',  url: 'https://firstwa.org/',                         name: 'FIRST Washington',     description: 'FIRST Washington is the regional affiliate for FIRST robotics programs in the state of Washington, inspiring young people to be science and technology leaders.' },
  { image: '/sponsor-3.png',  url: 'https://www.ghaasfoundation.org/',             name: 'Gene Haas Foundation', description: 'The Gene Haas Foundation supports the growth of manufacturing in the United States by funding CNC machining education and scholarships.' },
  { image: '/sponsor-4.png',  url: 'https://ehsptsa.org/Home',                     name: 'EHS PTSA',             description: 'The Eastlake High School PTSA supports students, families, and educators through community engagement, advocacy, and enrichment programs.' },
  { image: '/sponsor-5.png',  url: 'https://grizzlyjunk.com/',                     name: 'Grizzly Junk Removal', description: 'Grizzly Junk Removal provides fast, affordable, and eco-friendly junk removal services in the greater Seattle area.' },
  { image: '/sponsor-6.png',  url: 'https://www.ebay.com/str/happyglobalschoice', name: 'Happy Globals Choice', description: 'Happy Globals Choice offers a wide selection of quality products through their online storefront, supporting communities through commerce.' },
  { image: '/sponsor-7.png',  url: 'https://www.speea.org/',                       name: 'SPEEA',                description: 'The Society of Professional Engineering Employees in Aerospace (SPEEA) represents engineers and technical workers, advocating for quality education and STEM initiatives.' },
  { image: '/sponsor-8.png',  url: '',                                             name: 'Our Sponsors',         description: 'We are grateful to all of our sponsors for their generous support. Contact us to learn about sponsorship opportunities.' },
  { image: '/sponsor-9.png',  url: '',                                             name: 'Our Sponsors',         description: 'We are grateful to all of our sponsors for their generous support. Contact us to learn about sponsorship opportunities.' },
  { image: '/sponsor-10.png', url: 'https://happyglobalinc.com/',                  name: 'Happy Global Inc',     description: 'Happy Global Inc is a company dedicated to bringing quality products and services to customers worldwide.' },
  { image: '/sponsor-11.png', url: 'https://www.pagliacci.com/',                   name: 'Pagliacci',            description: 'Pagliacci Pizza is a beloved Seattle-area pizza company known for its handcrafted pizzas and community involvement.' },
  { image: '/sponsor-12.png', url: 'https://www.linxbot.com/',                     name: 'LINXBOT Inc.',         description: 'LINXBOT Inc. specializes in robotics solutions, supporting STEM education and innovation in the community.' },
  { image: '/sponsor-13.png', url: 'https://www.c2educate.com/',                   name: 'C2 Education',         description: 'C2 Education provides personalized tutoring, test prep, and college counseling to help students achieve their academic goals.' },
];

// ─── Sponsor carousel configuration ─────────────────────────────────────────
// Mobile  (<640px): w-[280px] + mx-4 (16px × 2 sides) = 312px
// Desktop (≥640px): w-[400px] + mx-8 (32px × 2 sides) = 464px
const getSponsorItemWidth = () => (window.innerWidth < 640 ? 312 : 464);
const SPONSOR_JUMP_FACTOR    = 3;
const SPONSOR_SCROLL_SPEED   = 1.0;
const SPONSOR_JUMP_DURATION_MS = 500;
const MAX_FRAME_DELTA_MS     = 100;

// ─── Team stats ──────────────────────────────────────────────────────────────
const teamStats = [
  { value: '22+',  label: 'Years of Excellence' },
  { value: '120',  label: 'Pound Competition Robot', unit: 'LBS' },
  { value: '5',    label: 'Schools Represented' },
  { value: '6',    label: 'Week Build Season',       unit: 'WK' },
];

function App() {
  const [isNavVisible, setIsNavVisible]       = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor]   = useState<typeof sponsors[number] | null>(null);
  const [statsVisible, setStatsVisible]         = useState(false);

  // Sponsor carousel refs
  const sponsorStripRef    = useRef<HTMLDivElement>(null);
  const sponsorPosRef      = useRef(0);
  const sponsorAnimRef     = useRef<number>(0);
  const sponsorPausedRef   = useRef(false);
  const sponsorItemWidthRef = useRef(getSponsorItemWidth());
  const prevTimestampRef   = useRef<number | null>(null);
  const sponsorJumpRef = useRef<{
    direction: 1 | -1;
    elapsed: number;
    coveredExtra: number;
  } | null>(null);

  // Stats section ref for IntersectionObserver
  const statsRef = useRef<HTMLDivElement>(null);

  const teamPhotos = [
    '/team-photo-1.jpg',
    '/team-photo-2.jpg',
    '/team-photo-3.jpg',
    '/team-photo-4.jpg',
    '/team-photo-5.jpg',
    '/team-photo-6.jpg',
  ];

  useEffect(() => {
    document.title = 'Home | Pack of Parts';
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsNavVisible(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sponsor carousel animation (rAF-based smooth infinite scroll)
  useEffect(() => {
    function animateSponsor(timestamp: number) {
      const ITEM_W  = sponsorItemWidthRef.current;
      const TOTAL_W = sponsors.length * ITEM_W;

      const dt = prevTimestampRef.current !== null
        ? Math.min(timestamp - prevTimestampRef.current, MAX_FRAME_DELTA_MS)
        : 0;
      prevTimestampRef.current = timestamp;

      if (!sponsorPausedRef.current) {
        sponsorPosRef.current += SPONSOR_SCROLL_SPEED;

        const jump = sponsorJumpRef.current;
        if (jump) {
          jump.elapsed = Math.min(jump.elapsed + dt, SPONSOR_JUMP_DURATION_MS);
          const progress       = jump.elapsed / SPONSOR_JUMP_DURATION_MS;
          const posFraction    = (1 - Math.cos(Math.PI * progress)) / 2;
          const targetCovered  = posFraction * SPONSOR_JUMP_FACTOR * ITEM_W;
          const delta          = targetCovered - jump.coveredExtra;
          jump.coveredExtra    = targetCovered;
          sponsorPosRef.current += delta * jump.direction;
          if (jump.elapsed >= SPONSOR_JUMP_DURATION_MS) sponsorJumpRef.current = null;
        }

        // Wrap for seamless loop
        if (sponsorPosRef.current >= TOTAL_W)  sponsorPosRef.current -= TOTAL_W;
        else if (sponsorPosRef.current < 0)    sponsorPosRef.current += TOTAL_W;

        if (sponsorStripRef.current) {
          sponsorStripRef.current.style.transform = `translateX(-${sponsorPosRef.current}px)`;
        }
      }
      sponsorAnimRef.current = requestAnimationFrame(animateSponsor);
    }
    sponsorAnimRef.current = requestAnimationFrame(animateSponsor);
    return () => cancelAnimationFrame(sponsorAnimRef.current);
  }, []);

  // Resize handler for sponsor item width
  useEffect(() => {
    const handleResize = () => { sponsorItemWidthRef.current = getSponsorItemWidth(); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stats section visibility (trigger count-pop animation)
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-reveal IntersectionObserver (runs once after mount)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function jumpSponsors(direction: 'left' | 'right') {
    sponsorJumpRef.current = { direction: direction === 'right' ? 1 : -1, elapsed: 0, coveredExtra: 0 };
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <DesktopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MobileNav  isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <div
        className="relative z-20 min-h-screen flex items-center justify-center"
        style={{ background: 'black' }}
      >
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            src="/IMG_1496.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/team-photo-2.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay with gradient tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-black/50 to-black/60" />
        </div>

        {/* Animated dot-grid overlay */}
        <div className="absolute inset-0 z-[1] hero-dots opacity-40 pointer-events-none" />

        {/* Ambient glow orb */}
        <div
          className="absolute hero-orb pointer-events-none"
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: 700,
            maxHeight: 700,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -55%)',
            zIndex: 2,
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 w-full">
          <div className="container-custom text-center px-4">

            {/* Team number badge */}
            <div
              className="mb-5 animate-fade-in-up"
              style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-blue/15 border border-light-blue/30 text-light-blue font-orbitron text-sm tracking-widest backdrop-blur-sm">
                FRC TEAM #1294
              </span>
            </div>

            {/* Main title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-orbitron font-black text-white mb-3 leading-tight animate-fade-in-up"
              style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
            >
              Eastlake Robotics
            </h1>

            {/* Subtitle with glow */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-bold mb-7 animate-fade-in-up"
              style={{
                animationDelay: '0.55s',
                animationFillMode: 'both',
                color: '#80D3EE',
                textShadow: '0 0 40px rgba(128, 211, 238, 0.5)',
              }}
            >
              Pack of Parts
            </h2>

            {/* Tagline */}
            <p
              className="text-white/75 text-base md:text-lg lg:text-xl max-w-xl mx-auto mb-10 font-open-sans animate-fade-in-up"
              style={{ animationDelay: '0.75s', animationFillMode: 'both' }}
            >
              Sammamish, Washington · Competing since 2004
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
              style={{ animationDelay: '0.95s', animationFillMode: 'both' }}
            >
              <button
                onClick={() => window.location.href = '/join'}
                className="btn-primary text-sm md:text-base animate-pulse-glow px-10 py-4"
              >
                Join The Club
              </button>
              <button
                onClick={() => scrollToSection('#join')}
                className="inline-flex items-center gap-2 text-white/70 hover:text-light-blue transition-colors duration-300 font-semibold text-sm md:text-base group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll-down indicator */}
        <div className="scroll-indicator z-10">
          <span className="font-orbitron text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-light-blue/60" />
        </div>
      </div>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-navy border-b border-white/10">
        <div ref={statsRef} className="container-custom py-10 md:py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {teamStats.map((stat, i) => (
              <div
                key={i}
                className="stat-item text-center py-6 px-4"
              >
                <div
                  className={`text-4xl lg:text-5xl font-orbitron font-black text-light-blue mb-1 ${statsVisible ? 'animate-count-pop' : 'opacity-0'}`}
                  style={{ animationDelay: statsVisible ? `${i * 0.12}s` : '0s', animationFillMode: 'both' }}
                >
                  {stat.value}
                  {stat.unit && (
                    <span className="text-xl lg:text-2xl font-semibold text-light-blue/60 ml-1">{stat.unit}</span>
                  )}
                </div>
                <div
                  className={`text-white/55 font-open-sans text-xs tracking-widest uppercase ${statsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: statsVisible ? `${i * 0.12 + 0.15}s` : '0s', animationFillMode: 'both' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Mission Section ───────────────────────────────────────────── */}
      <section id="join" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text Content */}
            <div className="reveal-left">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-3 block section-accent">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6 leading-tight">
                Inspiring the Next Generation of STEM Leaders
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The purpose of the Eastlake Robotics (Pack of Parts) Team 1294 shall be to promote
                  science and technology in Eastlake High School and the surrounding community through
                  student and community programs involving engineering and other technical skills.
                </p>
                <p>
                  Our mission is to inspire young people to be science and technology leaders, by engaging
                  them in exciting hands-on programs that build science, engineering, and technology skills,
                  and inspire innovation, to foster well-rounded life capabilities including self-confidence,
                  communication, and leadership.
                </p>
              </div>

              <button
                onClick={() => window.location.href = '/join'}
                className="btn-primary-light mt-8 inline-flex items-center gap-2 group"
              >
                Join Us Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Photo Grid */}
            <div className="reveal-right" style={{ transitionDelay: '0.15s' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-card">
                    <img src={teamPhotos[0]} alt="Team working" className="w-full h-48 object-cover" />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-card">
                    <img src={teamPhotos[2]} alt="Programming" className="w-full h-64 object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-card">
                    <img src={teamPhotos[1]} alt="Competition" className="w-full h-64 object-cover" />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-card">
                    <img src={teamPhotos[3]} alt="Team photo" className="w-full h-48 object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About The Team Section ────────────────────────────────────────── */}
      <section id="members" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* YouTube embed */}
            <div className="reveal-left order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/qIBiCYVLwaA"
                  title="Chairman's Award Video 2023"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="reveal-right order-1 lg:order-2" style={{ transitionDelay: '0.15s' }}>
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-3 block section-accent">
                About The Team
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6 leading-tight">
                Who We Are
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  FRC Team 1294 Pack of Parts, formerly known as Top Gun, began in 2004. Over the past
                  22 years, Pack of Parts (POP) has grown to be a consistently diverse group of dedicated
                  students from the Sammamish area.
                </p>
                <p>
                  Based out of Eastlake High School, POP's members are high school (9–12) students from
                  Eastlake High School, Redmond High School, Tesla STEM High School, International Community
                  School, and homeschool.
                </p>
                <p>
                  We build a 120 lb. competition robot in just 6 weeks. Our meetings start in the fall,
                  with the official season for the FIRST Robotics competition starting in January and going
                  through April. No previous experience is necessary to join. We welcome new members!
                </p>
              </div>

              <button
                onClick={() => window.location.href = '/join'}
                className="btn-primary-light mt-8 inline-flex items-center gap-2 group"
              >
                Learn More About Joining
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is FIRST? Section ────────────────────────────────────────── */}
      <section id="community" className="section-padding bg-white">
        <div className="container-custom">

          {/* FRC Block */}
          <div className="reveal mb-16 lg:mb-24">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

              <div className="lg:col-span-8">
                <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-3 block section-accent">
                  The Competition
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6 leading-tight">
                  What is the FIRST Robotics Competition?
                </h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  Combining the excitement of sport with the rigors of science and technology, we call the
                  FIRST Robotics Competition the ultimate Sport for the Mind. Under strict rules, limited
                  resources, and an intense six-week time limit, teams of students are challenged to raise
                  funds, design a team "brand," hone teamwork skills, and build &amp; program industrialized
                  robots to play a difficult field game against like-minded competitors. It's as close to
                  real-world engineering as a student can get. Volunteer professional mentors lend their
                  time and talents to guide each team. Each season ends with an exciting FIRST Championship
                  in Houston, TX, and Detroit, MI.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative rounded-2xl overflow-hidden shadow-card border border-gray-100 reveal-scale">
                  <img
                    src="/team-photo-8.jpg"
                    alt="Team 1294 working on robot"
                    className="w-full h-auto max-h-[400px] object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FIRST Block */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <img
                src="/frc-logo.avif"
                alt="FIRST Robotics Competition logo"
                className="w-full max-h-72 object-contain mx-auto"
              />
              <div className="lg:max-w-2xl text-right">
                <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-3 block">
                  The Organization
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6 leading-tight">
                  What is FIRST?
                </h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-4">
                  FIRST (For Inspiration and Recognition of Science and Technology) is an international
                  youth organization that operates the FIRST Robotics Competition, FIRST Tech Challenge,
                  FIRST LEGO League, and more. FIRST was founded by inventor Dean Kamen and former MIT
                  professor Woodie Flowers in 1989 to inspire young people's interest in science and
                  technology.
                </p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
                  FIRST is "More Than Robots." FIRST participation is proven to encourage students to
                  pursue education and careers in STEM-related fields, inspire them to become leaders
                  and innovators, and enhance their work and life skills.
                </p>
                <a
                  href="https://www.firstinspires.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-light inline-flex items-center gap-2 group"
                >
                  Visit FIRST Website
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sponsors Section ──────────────────────────────────────────────── */}
      <section id="donate" className="section-padding bg-navy overflow-hidden">
        <div className="container-custom mb-12">
          <div className="text-center reveal">
            <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-3 block">
              Our Supporters
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-4">
              Our Sponsors
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto mb-6">
              We are incredibly grateful to the following organizations that keep our team running.
              If you would like to become a sponsor, please contact us.
            </p>
            <button
              onClick={() => window.location.href = '/donate'}
              className="btn-primary"
            >
              Become a Sponsor
            </button>
          </div>
        </div>

        {/* Sponsor Carousel */}
        <div className="flex items-center gap-4 px-4">
          <button
            onClick={() => jumpSponsors('left')}
            aria-label="Scroll sponsors left"
            className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-light-blue/20 border border-white/10 hover:border-light-blue/40 text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1 overflow-hidden">
            <div
              ref={sponsorStripRef}
              className="flex"
              style={{ willChange: 'transform' }}
              onMouseEnter={() => { sponsorPausedRef.current = true; }}
              onMouseLeave={() => { sponsorPausedRef.current = false; }}
            >
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSponsor(sponsor)}
                  className="flex-shrink-0 mx-4 sm:mx-8 w-[280px] sm:w-[400px] h-48 sm:h-60 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 group"
                  title={sponsor.name}
                  aria-label={`View details for ${sponsor.name}`}
                >
                  <img
                    src={sponsor.image}
                    alt={sponsor.name}
                    className="sponsor-logo max-w-full max-h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => jumpSponsors('right')}
            aria-label="Scroll sponsors right"
            className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-light-blue/20 border border-white/10 hover:border-light-blue/40 text-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Sponsor Detail Dialog */}
      <Dialog open={selectedSponsor !== null} onOpenChange={(open) => { if (!open) setSelectedSponsor(null); }}>
        <DialogContent className="bg-navy border-white/20 text-white sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="w-full flex justify-center mb-4">
              <div className="w-full max-w-[280px] sm:max-w-[320px] h-[180px] sm:h-[200px] flex items-center justify-center">
                {selectedSponsor && (
                  <img
                    src={selectedSponsor.image}
                    alt={selectedSponsor.name}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>
            </div>
            <DialogTitle className="text-xl font-orbitron font-bold text-white">
              {selectedSponsor?.name}
            </DialogTitle>
            {selectedSponsor?.description && (
              <DialogDescription className="text-white/70 text-sm mt-2">
                {selectedSponsor.description}
              </DialogDescription>
            )}
          </DialogHeader>
          {selectedSponsor?.url && selectedSponsor.url !== '' && (
            <div className="flex justify-center mt-4">
              <a
                href={selectedSponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit Website
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-navy pt-16 pb-8 border-t border-white/10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Logo & Tagline */}
            <div className="lg:col-span-2 reveal">
              <div className="flex items-center gap-4 mb-4">
                <img src="/logo.png" alt="Pack of Parts Logo" className="h-16 w-auto" />
                <div>
                  <h3 className="text-white font-orbitron font-bold text-xl">Pack of Parts</h3>
                  <p className="text-light-blue text-sm">FRC Team 1294</p>
                </div>
              </div>
              <p className="text-white/65 mb-6 max-w-md leading-relaxed">
                Building robots. Building futures. Inspiring the next generation of STEM leaders
                in Sammamish, Washington.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/packofparts',  label: 'Instagram' },
                  { icon: Facebook,  href: 'https://www.facebook.com/packofparts',   label: 'Facebook'  },
                  { icon: Youtube,   href: 'https://youtube.com/@packofparts',        label: 'YouTube'   },
                  { icon: Linkedin,  href: 'https://linkedin.com/company/packofparts', label: 'LinkedIn' },
                  { icon: Github,    href: 'https://github.com/packofparts',           label: 'GitHub'   },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
                <a
                  href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                  aria-label="ChiefDelphi"
                >
                  <img src="/chiefdelphi-logo.svg" alt="ChiefDelphi" className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <QuickLinks scrollToSection={scrollToSection} />

            {/* Contact Info */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <h4 className="text-white font-orbitron font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-light-blue mt-0.5 flex-shrink-0" />
                  <p className="text-white/65">info@packofparts.org</p>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-light-blue mt-0.5 flex-shrink-0" />
                  <p className="text-white/65">Sammamish, Washington</p>
                </li>
                <li className="flex items-start gap-3">
                  <School className="w-5 h-5 text-light-blue mt-0.5 flex-shrink-0" />
                  <p className="text-white/65">Eastlake High School</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Pack of Parts (FRC 1294). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
