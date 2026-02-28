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
  ArrowRight
} from 'lucide-react';
// import ScrollExpandMedia, { type HeroContentRenderProps } from './components/blocks/scroll-expansion-hero';
import './App.css';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';
import QuickLinks from './components/QuickLinks';

// Animation constants for hero text movement
// This multiplier ensures text moves completely off-screen during the scroll animation
// const OFF_SCREEN_MULTIPLIER = 8;

// Helper component for directional text animation (moves entire text block left or right)
// interface DirectionalTextProps {
//   text: string;
//   translateX: number;
//   direction: 'left' | 'right';
//   className?: string;
//   speedMultiplier?: number; // Multiplier to adjust speed for different text elements
// }

// const DirectionalText = ({ text, translateX, direction, className = '', speedMultiplier = 1 }: DirectionalTextProps) => {
//   // Calculate the actual translation with direction and speed multiplier
//   const actualTranslateX = translateX * speedMultiplier * OFF_SCREEN_MULTIPLIER;
  
//   return (
//     <span
//       className={className}
//       style={{
//         display: 'inline-block',
//         transform: direction === 'left' 
//           ? `translateX(-${actualTranslateX}px)` 
//           : `translateX(${actualTranslateX}px)`,
//         transition: 'transform 0.1s ease-out',
//       }}
//     >
//       {text}
//     </span>
//   );
// };

// Sponsor logos with homepage links
// To update sponsor links: Replace the 'url' value with the sponsor's homepage URL
// Format: { image: '/sponsor-X.png', url: 'https://example.com', name: 'Sponsor Name' }
// Set url to '' (empty string) if no link is available yet
const sponsors = [
  { image: '/sponsor-1.png', url: 'https://www.argosyfnd.org/', name: 'Argosy Foundation' },
  { image: '/sponsor-2.png', url: 'https://firstwa.org/', name: 'FIRST Washington' },
  { image: '/sponsor-3.png', url: 'https://www.ghaasfoundation.org/', name: 'Gene Haas Foundation' },
  { image: '/sponsor-4.png', url: 'https://ehsptsa.org/Home', name: 'EHS PTSA' },
  { image: '/sponsor-5.png', url: 'https://grizzlyjunk.com/', name: 'Grizzly Junk Removal' },
  { image: '/sponsor-6.png', url: 'https://www.ebay.com/str/happyglobalschoice', name: 'Happy Globals Choice' },
  { image: '/sponsor-7.png', url: 'https://www.speea.org/', name: 'SPEEA' },
  { image: '/sponsor-8.png', url: '', name: 'Sponsor 8' },
  { image: '/sponsor-9.png', url: '', name: 'Sponsor 9' },
  { image: '/sponsor-10.png', url: 'https://happyglobalinc.com/', name: 'Sponsor 10' },
];

// Sponsor carousel configuration
// SPONSOR_ITEM_WIDTH: total width (px) of each sponsor slot (w-80 = 320px + mx-8 = 32px per side = 64px total)
const SPONSOR_ITEM_WIDTH = 384;
// SPONSOR_JUMP_FACTOR: number of sponsor slots to jump when an arrow button is clicked
// Increase this value to jump further, decrease to jump less. Both arrows use the same factor.
const SPONSOR_JUMP_FACTOR = 3;
// SPONSOR_SCROLL_SPEED: pixels scrolled per animation frame (~60fps), controls auto-scroll speed
const SPONSOR_SCROLL_SPEED = 1.0;
// SPONSOR_JUMP_DURATION_MS: duration in milliseconds of the arrow-button acceleration animation
const SPONSOR_JUMP_DURATION_MS = 500;
// MAX_FRAME_DELTA_MS: caps dt so a tab-switch or long pause doesn't cause a huge position jump
const MAX_FRAME_DELTA_MS = 100;
// Total width of one full set of sponsors (used for seamless wrap-around)
const SPONSOR_SINGLE_WIDTH = sponsors.length * SPONSOR_ITEM_WIDTH;

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);

  // Sponsor carousel refs
  const sponsorStripRef = useRef<HTMLDivElement>(null);
  const sponsorPosRef = useRef(0);
  const sponsorAnimRef = useRef<number>(0);
  const sponsorPausedRef = useRef(false);
  // Previous RAF timestamp for computing delta-time (used by the jump animation)
  const prevTimestampRef = useRef<number | null>(null);
  // Active jump animation state: null when no jump is running
  const sponsorJumpRef = useRef<{
    direction: 1 | -1;  // +1 = right (advance), -1 = left (reverse)
    elapsed: number;    // ms elapsed (only advances while not paused)
    coveredExtra: number; // extra pixels already applied to sponsorPosRef for this jump
  } | null>(null);

 

  // Team photos
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
    const handleScroll = () => {
      // setIsNavVisible(window.scrollY > 100);
      setIsNavVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sponsor carousel animation (requestAnimationFrame-based for smooth infinite scroll)
  useEffect(() => {
    function animateSponsor(timestamp: number) {
      // Compute delta-time in ms since the last frame (capped to avoid big jumps after a tab-switch)
      const dt = prevTimestampRef.current !== null
        ? Math.min(timestamp - prevTimestampRef.current, MAX_FRAME_DELTA_MS)
        : 0;
      prevTimestampRef.current = timestamp;

      if (!sponsorPausedRef.current) {
        // Base auto-scroll
        sponsorPosRef.current += SPONSOR_SCROLL_SPEED;

        // Jump animation (bell-curve ease: accelerate → fast → decelerate)
        const jump = sponsorJumpRef.current;
        if (jump) {
          jump.elapsed = Math.min(jump.elapsed + dt, SPONSOR_JUMP_DURATION_MS);
          const progress = jump.elapsed / SPONSOR_JUMP_DURATION_MS;
          // Position curve: (1 - cos(π·p)) / 2  →  moves from 0 to 1 with smooth ease-in-out
          // Velocity curve (derivative): (π/2)·sin(π·p)  →  0 at start, peaks at mid, 0 at end
          const positionFraction = (1 - Math.cos(Math.PI * progress)) / 2;
          const targetCovered = positionFraction * SPONSOR_JUMP_FACTOR * SPONSOR_ITEM_WIDTH;
          const delta = targetCovered - jump.coveredExtra;
          jump.coveredExtra = targetCovered;
          sponsorPosRef.current += delta * jump.direction;
          if (jump.elapsed >= SPONSOR_JUMP_DURATION_MS) {
            sponsorJumpRef.current = null;
          }
        }

        // Wrap position for seamless infinite loop
        if (sponsorPosRef.current >= SPONSOR_SINGLE_WIDTH) {
          sponsorPosRef.current -= SPONSOR_SINGLE_WIDTH;
        } else if (sponsorPosRef.current < 0) {
          sponsorPosRef.current += SPONSOR_SINGLE_WIDTH;
        }

        if (sponsorStripRef.current) {
          sponsorStripRef.current.style.transform = `translateX(-${sponsorPosRef.current}px)`;
        }
      }
      sponsorAnimRef.current = requestAnimationFrame(animateSponsor);
    }
    sponsorAnimRef.current = requestAnimationFrame(animateSponsor);
    return () => cancelAnimationFrame(sponsorAnimRef.current);
  }, []);

  function jumpSponsors(direction: 'left' | 'right') {
    // Start (or restart) the smooth acceleration animation for the given direction
    sponsorJumpRef.current = {
      direction: direction === 'right' ? 1 : -1,
      elapsed: 0,
      coveredExtra: 0,
    };
  }

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

    document.querySelectorAll('.reveal, .stagger-children').forEach((el) => {
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
              <DesktopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
              <MobileNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </nav>

      {/* Scroll Expansion Hero Section */}
      {/* <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/IMG_1496.mp4"
        posterSrc="/team-photo-2.jpg"
        bgImageSrc="/team-photo-2.jpg"
        heroContent={({ textTranslateX }: HeroContentRenderProps) => (
          <div className="container-custom text-center px-4">
            <div 
              className="animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <DirectionalText 
                text="#1294" 
                translateX={textTranslateX} 
                direction="left"
                speedMultiplier={1.2}
                className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4"
              />
            </div>
            
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <DirectionalText 
                text="Eastlake Robotics Club" 
                translateX={textTranslateX} 
                direction="right"
                speedMultiplier={1.5}
              />
            </h1>
            
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-6 animate-fade-in-up animate-float"
              style={{ animationDelay: '0.8s' }}
            >
              <DirectionalText 
                text="Pack of Parts" 
                translateX={textTranslateX} 
                direction="left"
                speedMultiplier={1.3}
              />
            </h2>
            
            <p 
              className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up"
              style={{ animationDelay: '1.1s' }}
            >
              <DirectionalText 
                text="FRC Team 1294 | Sammamish, Washington" 
                translateX={textTranslateX} 
                direction="left"
                speedMultiplier={1.0}
              />
            </p>
          </div>
        )}
        frozenContent={
          <div className="container-custom text-center px-4">
            <div className="mb-4">
              <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest">
                #1294
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4">
              Eastlake Robotics Club
            </h1>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-6">
              Pack of Parts
            </h2>
            
            <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10">
              FRC Team 1294 | Sammamish, Washington
            </p>
            
            <div>
              <button 
                onClick={() => window.location.href = '/join'}
                className="btn-primary text-sm md:text-base animate-pulse-glow"
              >
                Join The Club
              </button>
            </div>
          </div>
        }
      > */}

      <div 
          className="relative z-20 min-h-screen flex items-center justify-center"
          style={{ 
            background: 'black',
          }}
        >
          {/* Video/Image Background for frozen section */}
          <div className="absolute inset-0 z-0">
              <video
                src={"/IMG_1496.mp4"}
                autoPlay
                muted
                loop
                playsInline
                poster={"/team-photo-2.jpg"}
                className="absolute inset-0 w-full h-full object-cover"
              />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          {/* Frozen content - displays the static text with original formatting */}
            <div className="relative z-10">
              <div className="container-custom text-center px-4">
            <div className="mb-4">
              <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest">
                #1294
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4">
              Eastlake Robotics Club
            </h1>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-6">
              Pack of Parts
            </h2>
            
            <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10">
              FRC Team 1294 | Sammamish, Washington
            </p>
            
            <div>
              <button 
                onClick={() => window.location.href = '/join'}
                className="btn-primary text-sm md:text-base animate-pulse-glow"
              >
                Join The Club
              </button>
            </div>
          </div>
            </div>
        </div>

        {/* Our Mission Section */}
      <section id="join" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="reveal">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
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

              {/* Stats - REMOVED: Cards removed, (22+ years, 5 schools, 6 weeks) add to a text? */}
            </div>

            {/* Photo Grid */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[0]} 
                      alt="Team working" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[2]} 
                      alt="Programming" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[1]} 
                      alt="Competition" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={teamPhotos[3]} 
                      alt="Team photo" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About The Team Section */}
      <section id="members" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Video */}``
            <div className="reveal order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <iframe className="w-full aspect-video object-cover" src="https://www.youtube.com/embed/qIBiCYVLwaA" title="Chairman&#39;s Award Video 2023" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-100 transition-colors duration-300">
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="reveal order-1 lg:order-2" style={{ transitionDelay: '0.2s' }}>
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                About The Team
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                Who We Are
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  FRC Team 1294 Pack of Parts, formerly known as Top Gun, began in 2004. Over the past 
                  22 years, Pack of Parts (POP) has grown to be a consistently diverse group of dedicated 
                  students from the Sammamish area.
                </p>
                <p>
                  Based out of Eastlake High School, POP's members are high school (9-12) students from 
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
                className="btn-primary-light mt-8 inline-flex items-center gap-2"
              >
                Learn More About Joining
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What is FIRST Section */}
      <section id="community" className="section-padding bg-white">
        <div className="container-custom">
          {/* FRC Block */}
          <div className="reveal mb-16 lg:mb-24">
            <div className="max-w-4xl">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                The Competition
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                What is the FIRST Robotics Competition?
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                Combining the excitement of sport with the rigors of science and technology, we call the 
                FIRST Robotics Competition the ultimate Sport for the Mind. Under strict rules, limited 
                resources, and an intense six-week time limit, teams of students are challenged to raise 
                funds, design a team "brand," hone teamwork skills, and build & program industrialize robots 
                to play a difficult field game against like-minded competitors. It's as close to real-world 
                engineering as a student can get. Volunteer professional mentors lend their time and talents 
                to guide each team. Each season ends with an exciting FIRST Championship in Houston, TX, and Detroit, MI.
              </p>
            </div>
          </div>

          {/* Connector Line */}
          <div className="hidden lg:block relative h-20 mb-16">
            <svg className="absolute left-1/4 top-0 w-1/2 h-full" viewBox="0 0 400 80" fill="none">
              <path 
                d="M0 0 Q200 80 400 0" 
                stroke="#80D3EE" 
                strokeWidth="2" 
                strokeDasharray="8 4"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* FIRST Block */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              {/* FRC logo – fills all the space to the left of the text.
                  To make it smaller/larger, add a max-w-* class, e.g. max-w-xs (smaller)
                  or remove max-h-* to let it grow taller.
                  On mobile the logo stacks above the text. */}
              <img
                src="/frc-logo.avif"
                alt="FIRST Robotics Competition logo"
                className="w-full max-h-72 object-contain mx-auto"
              />
              <div className="lg:max-w-2xl text-right">
              <span className="text-light-blue font-orbitron text-sm tracking-widest uppercase mb-4 block">
                The Organization
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-6">
                What is FIRST?
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">
                FIRST (For Inspiration and Recognition of Science and Technology) is an international youth 
                organization that operates the FIRST Robotics Competition, FIRST Tech Challenge, FIRST LEGO 
                League, FIRST Lego League Jr., and FIRST LEGO League Jr. Discovery Edition competitions. 
                FIRST was founded by inventor Dean Kamen and former MIT professor Woodie Flowers in 1989 to 
                inspire young people's interest and participation in science and technology.
              </p>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8">
                FIRST is "More Than Robots". FIRST participation is proven to encourage students to pursue 
                education and careers in STEM-related fields, inspire them to become leaders and innovators, 
                and enhance their work and life skills.
              </p>
              <a 
                href="https://www.firstinspires.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-light inline-flex items-center gap-2"
              >
                Visit FIRST Website
                <ChevronRight className="w-4 h-4" />
              </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="donate" className="section-padding bg-navy overflow-hidden">
        <div className="container-custom mb-12">
          <div className="text-center reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-4">
              Our <span className="text-gradient">Sponsors</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We are incredibly grateful to the following organizations that keep our team running. 
              If you would like to become a sponsor, please contact us.
            </p>
            <button 
              onClick={() => window.location.href = '/donate'}
              className="mt-6 btn-primary"
            >
              Become a Sponsor
            </button>
          </div>
        </div>

        {/* Sponsor Logo Carousel
            - SPONSOR_JUMP_FACTOR (defined near top of file) controls how many sponsor slots
              the arrow buttons jump per click. Both arrows use the same factor.
            - SPONSOR_SCROLL_SPEED controls the auto-scroll speed (pixels per frame at ~60fps).
            - SPONSOR_ITEM_WIDTH must match the Tailwind classes used on each sponsor slot
              (w-80 = 320px + mx-8 = 32px per side = 384px total).
            - To update sponsor links, modify the 'sponsors' array above the App function.
              Each sponsor has: { image: '/sponsor-X.png', url: 'https://...', name: 'Sponsor Name' }
              Set url to '' (empty string) if no link is available yet.
        */}
        <div className="flex items-center gap-4 px-4">
          {/* Left arrow — jumps backward in the rotation */}
          <button
            onClick={() => jumpSponsors('left')}
            aria-label="Scroll sponsors left"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scrolling strip */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={sponsorStripRef}
              className="flex"
              style={{ willChange: 'transform' }}
              onMouseEnter={() => { sponsorPausedRef.current = true; }}
              onMouseLeave={() => { sponsorPausedRef.current = false; }}
            >
              {[...sponsors, ...sponsors].map((sponsor, index) => {
                const hasValidUrl = sponsor.url && sponsor.url !== '#' && sponsor.url !== '';
                const isExternalUrl = hasValidUrl && (sponsor.url.startsWith('http://') || sponsor.url.startsWith('https://'));

                return hasValidUrl ? (
                  <a
                    key={index}
                    href={sponsor.url}
                    target={isExternalUrl ? "_blank" : undefined}
                    rel={isExternalUrl ? "noopener noreferrer" : undefined}
                    className="flex-shrink-0 mx-8 w-80 h-48 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    title={sponsor.name}
                  >
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="sponsor-logo max-w-full max-h-full object-contain"
                    />
                  </a>
                ) : (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-8 w-80 h-48 flex items-center justify-center"
                    title={sponsor.name}
                  >
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="sponsor-logo max-w-full max-h-full object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow — jumps forward in the rotation */}
          <button
            onClick={() => jumpSponsors('right')}
            aria-label="Scroll sponsors right"
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          >
            <ChevronRight size={24} />
          </button>
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
            <QuickLinks scrollToSection={scrollToSection} />

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

      {/* Summer Camps Section - Anchor target */}
      <div id="camps" className="hidden" />
      {/* </ScrollExpandMedia> */}
    </div>
  );
}

export default App;
