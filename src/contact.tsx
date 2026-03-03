import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  MapPin,
  School,
  Instagram,
  Facebook,
  Youtube,
  Github,
  Linkedin,
} from 'lucide-react';
import './contact.css';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';
import QuickLinks from '@/components/QuickLinks';

function Contact() {
  const MAP_HEIGHT = 400;
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Contact | Pack of Parts';

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsNavVisible(window.scrollY > 100 || window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey || !mapRef.current) return;

    const scriptId = 'google-maps-script';
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const location = { lat: 47.6321, lng: -122.0356 };

      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
        disableDefaultUI: false,
        mapTypeControl: false,
        streetViewControl: false,
        // mapId: 'YOUR_MAP_ID', // Required for AdvancedMarkerElement – see step 6 below
      });

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: location,
        title: 'Pack of Parts – Eastlake High School',
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content:
          '<div style="font-family:sans-serif;padding:4px">' +
          '<strong>Pack of Parts – FRC 1294</strong><br/>' +
          'Eastlake High School<br/>' +
          '400 228th AVE NE, Sammamish, WA 98074' +
          '</div>',
      });

      marker.addListener('click', () => {
        infoWindow.open({ anchor: marker, map });
      });

      infoWindow.open({ anchor: marker, map });
    };

    if (window.google?.maps) {
      initMap();
      return;
    }

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      (window as unknown as Record<string, unknown>).initGoogleMap = initMap;
      document.head.appendChild(script);
    }
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <DesktopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MobileNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </nav>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative z-10 container-custom text-center px-4 py-20">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Have questions about joining, sponsorships, or camps? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-[52.5rem] mx-auto">
            <div className="space-y-6">
              <div className="reveal contact-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-light-blue" />
                  </div>
                  <div>
                    <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Email Us</h3>
                    <a href="mailto:info@packofparts.org" className="text-gray-600 hover:text-light-blue transition-colors duration-200">info@packofparts.org</a>
                  </div>
                </div>
              </div>

              <div className="reveal contact-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-light-blue/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-light-blue" />
                  </div>
                  <div>
                    <h3 className="text-navy font-orbitron font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-600">Eastlake High School</p>
                    <p className="text-gray-600">400 228th AVE NE, Sammamish, WA 98074</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Google Maps Embed */}
            <div className="reveal map-embed-card mt-8">
              <div className="p-6">
                <h3 className="text-2xl font-orbitron font-bold text-navy mb-4 text-center">
                  Our Location
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Find us at Eastlake High School in Sammamish, Washington
                </p>
                {/*
                  ── Steps to make this Google Map functional ──
                  1. Go to https://console.cloud.google.com/ and create (or select) a project.
                  2. Enable the "Maps JavaScript API" for that project:
                     APIs & Services → Library → search "Maps JavaScript API" → Enable.
                  3. Create an API key:
                     APIs & Services → Credentials → Create Credentials → API Key.
                  4. (Recommended) Restrict the key:
                     • Application restriction → HTTP referrers → add your domain(s).
                     • API restriction → restrict to "Maps JavaScript API".
                  5. Add the key to your environment as VITE_GOOGLE_MAPS_API_KEY:
                     • Local dev: create a .env file with  VITE_GOOGLE_MAPS_API_KEY=YOUR_KEY
                     • Production: set it in your hosting provider's environment variables.
                  6. To use AdvancedMarkerElement (custom markers), create a Map ID:
                     Google Cloud Console → Google Maps Platform → Map Management → Create Map ID.
                     Then pass  mapId: 'YOUR_MAP_ID'  in the Map constructor options above.
                  7. Reload the page – the interactive map will appear below.
                */}
                <div className="w-full rounded-lg overflow-hidden mb-4">
                  <div
                    ref={mapRef}
                    className="w-full"
                    style={{ height: MAP_HEIGHT }}
                  />
                </div>
                <p className="text-gray-600 text-sm text-center italic">
                  The shop is located in room D-125 with access from the back of the high school across from the Renaissance school.
                </p>
              </div>
            </div>

            <div className="reveal mt-12">
              <h3 className="text-navy font-orbitron font-semibold text-xl mb-6">Connect With Us</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/packofparts', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/packofparts', label: 'Facebook' },
                  { icon: Youtube, href: 'https://youtube.com/@packofparts', label: 'YouTube' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/packofparts', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/packofparts', label: 'GitHub' },
                ].map((social) => (
                  <a key={social.label} href={social.href} className="social-icon w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all duration-300" aria-label={social.label}>
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
                <a href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary" target="_blank" rel="noopener noreferrer" className="social-icon group relative w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center hover:bg-navy transition-all duration-300" aria-label="ChiefDelphi">
                  <img src="/chiefdelphi-logo-navy.svg" alt="" aria-hidden="true" className="w-8 h-8 transition-opacity duration-300 opacity-100 group-hover:opacity-0" />
                  <img src="/chiefdelphi-logo.svg" alt="" aria-hidden="true" className="w-8 h-8 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-navy pt-16 pb-8 border-t border-white/10">
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
              <p className="text-white/70 mb-6 max-w-md">Building robots. Building futures. Inspiring the next generation of STEM leaders in Sammamish, Washington.</p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/packofparts', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/packofparts', label: 'Facebook' },
                  { icon: Youtube, href: 'https://youtube.com/@packofparts', label: 'YouTube' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/packofparts', label: 'Linkedin' },
                  { icon: Github, href: 'https://github.com/packofparts', label: 'Github' },
                ].map((social) => (
                  <a key={social.label} href={social.href} className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue" aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
                <a href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary" target="_blank" rel="noopener noreferrer" className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue" aria-label="ChiefDelphi">
                  <img src="/chiefdelphi-logo.svg" alt="ChiefDelphi" className="w-7 h-7" />
                </a>
              </div>
            </div>

            <div className="reveal">
              <QuickLinks scrollToSection={scrollToSection} />
            </div>

            <div className="reveal">
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
          <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">&copy; {new Date().getFullYear()} Pack of Parts (FRC 1294). All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
