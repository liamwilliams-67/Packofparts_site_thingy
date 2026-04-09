import { useEffect, useState } from 'react';
import { 
  Mail, 
  MapPin, 
  School, 
  Instagram,
  Facebook,
  Youtube,
  Github,
  ArrowRight,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import './SummerCamps.css';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';
import QuickLinks from '@/components/QuickLinks';

// Backend API URL – leave empty for dev (Vite proxy), or set VITE_API_URL for production
function SummerCamps() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setScrollY] = useState(0);

  const campsList = [
    {
      key: 'CAD & Design',
      title: 'CAD & Design',
      weekId: 'week1',
      dates: 'August 17-21, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      description: `For rising 6th-8th graders. This hands-on, week-long camp is all about introducing students to the exciting world of CAD & Design. Using Onshape, an online CAD tool, students will learn how to create their own CAD models, from simple shapes to personalized projects like name tags and desk organizers. Along the way, they'll explore how CAD is used in the real world in industries such as Semiconductors, Automotive, Aerospace, and many more. They will also get a behind-the-scenes look at how 3D printing works, and get to print some of their own designs. The week wraps up with a fun showcase where students present their final projects to other students, where their project would get voted on to win a trophy at the end of the camp.`,
      image: '/summercamps/cad.png',
    },
    {
      key: 'Programming',
      title: 'Programming',
      weekId: 'week2',
      dates: 'August 24-28, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      description: `For rising 6th-8th graders. In this camp, students will learn how to program robots using the WPILib framework. Each student will work with a Pololu ROMI robot throughout the week, applying new concepts as they learn them. The course introduces Java, one of the world’s most popular programming languages, and exposes students to programming techniques used by Team 1294 on competition robots, including PID control, commands, and subsystems. Over five days, students will progressively build their skills with the goal of programming their robot to autonomously complete an obstacle course as quickly as possible. No prior experience is required, but students must bring a personal (non-school) laptop.`,
      image: '/summercamps/prog.jpg',    },
    {
      key: 'Engineering 1',
      title: 'Engineering 1',
      weekId: 'week1',
      dates: 'August 17-21, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      description: `For rising 6th-7th graders. This camp is for students who enjoy figuring out how things work and like to build with their hands. Each day features a new project—like experimenting with simple circuits, building a foam boat that actually moves, and working in teams to design a drawbridge. The projects are designed to be beginner-friendly but open-ended, so students can experiment, problem-solve, and make their ideas come to life. No prior experience is needed—just an interest in building and trying new things!`,
      image: '/summercamps/engineering1.png',    },
    {
      key: 'Engineering 2',
      title: 'Engineering 2',
      weekId: 'week2',
      dates: 'August 24-28, 2025',
      time: '9:00 AM - 12:00 PM',
      price: 250,
      description: `For rising 8th-9th graders. The engineering 2 summer camp serves to be a more advanced version of engineering 1, designed for older students. It will consist of larger, more in depth projects fit for an older age group with longer attention spans. There will not be any content overlap between the Engineering 1 and Engineering 2 camps. Engineering 2 aims to provide students with projects that allow them to explore more complicated topics with electrical and mechanical. It could also possibly include basic programming depending on the projects we select.`,
      image: '/summercamps/engineering2.avif',
    }
  ];

  const addonsList = [
    {
      key: 'Womens Leadership',
      title: "Women's Leadership Add-on",
      price: 100,
      description: `The women’s leadership camp will be held 1 hour before both Engineering 1 and 2 from 8 AM - 9 AM. This class teaches young women leadership skills that will help them navigate the world of engineering as a minority. During this camp, we will be teaching different leadership styles, communication styles, and learn how to navigate conflicts in order to teach young women to be confident in their areas of work.`,
      time: '8:00 AM - 9:00 AM',      image: '/summercamps/womens.png',    }
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <DesktopNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <MobileNav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
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
            style={{ animationDelay: '0.1s' }}
          >
            <span className="inline-block text-light-blue font-orbitron text-sm md:text-base tracking-widest mb-4">
              SUMMER 2026
            </span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.25s' }}
          >
            Robotics Summer Camps
          </h1>
          
          <p 
            className="text-white/80 text-base md:text-lg lg:text-xl max-w-3xl mx-auto animate-fade-in-up mb-8"
            style={{ animationDelay: '0.4s' }}
          >
            Week-long STEM camps for middle school students. Build, code, and compete 
            with robots while making new friends and learning from FRC mentors!
          </p>

          <div 
            className="animate-fade-in-up flex flex-wrap gap-4 justify-center"
            style={{ animationDelay: '0.55s' }}
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
              <div key={camp.key} className="reveal camp-card bg-white rounded-2xl overflow-hidden" style={{ transitionDelay: `${index * 0.08}s` }}>
                {camp.image && <img src={camp.image} alt={camp.title} className="w-full h-80 object-cover" />}
                <div className="p-6">
                  <h3 className="text-navy font-orbitron font-bold text-xl mb-2">{camp.title}</h3>
                  <div className="mb-1 text-sm text-navy font-medium">Dates: {camp.dates}</div>
                  <div className="mb-1 text-sm text-navy font-medium">Time: {camp.time}</div>
                  <div className="mb-3 text-sm text-navy font-medium">Price: ${camp.price}</div>
                  <p className="text-gray-600">{camp.description}</p>
                </div>
              </div>
            ))}

            {addonsList.map((addon, i) => (
              <div key={addon.key} className="reveal camp-card bg-white rounded-2xl overflow-hidden md:col-span-2" style={{ transitionDelay: `${(campsList.length + i) * 0.08}s` }}>
                {addon.image && <img src={addon.image} alt={addon.title} className="w-full h-80 object-cover" />}
                <div className="p-6">
                  <h3 className="text-navy font-orbitron font-bold text-xl mb-2">{addon.title}</h3>
                  <div className="mb-1 text-sm text-navy font-medium">Time: {addon.time}</div>
                  <div className="mb-3 text-sm text-navy font-medium">Price: ${addon.price}</div>
                  <p className="text-gray-600">{addon.description}</p>
                </div>
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
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-navy mb-4">
              Register for Summer Camps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Ready to join? Click the button below to complete your registration and payment.
            </p>
            <a
              href="https://buy.stripe.com/28EaEY7Bf4ah0al24LbQY01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg px-8 py-3 bg-navy text-white font-semibold rounded-pill transition-all duration-300 hover:bg-navy/90 hover:scale-105"
            >
              Register Now <ExternalLink className="w-5 h-5" />
            </a>
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
                answer: "We will be providing snacks; however, it is still recommended to bring some snacks with you, as we will have a limited amount. There will be a water fountain available as well."
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
                answer: "Campers will be supervised by a mentor or parent at all times. We follow shop safety protocols for all equipment and activities."
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
                    className="social-icon w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
                <a
                  href="https://www.chiefdelphi.com/u/1294_pack_of_parts/summary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-light-blue"
                  aria-label="ChiefDelphi"
                >
                  <img src="/chiefdelphi-logo.svg" alt="ChiefDelphi" className="w-7 h-7" />
                </a>
              </div>
            </div>

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
    </div>
  );
}

export default SummerCamps;
