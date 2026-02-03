'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Animation constants
const WHEEL_SCROLL_SENSITIVITY = 0.0009;
const TOUCH_SCROLL_BACK_SENSITIVITY = 0.008;
const TOUCH_SCROLL_FORWARD_SENSITIVITY = 0.005;
const SCROLL_THRESHOLD = 5;
const TOUCH_SWIPE_THRESHOLD = -20;

// Pause duration at the end of animation (in milliseconds)
const END_PAUSE_DURATION = 800;
// Scroll-back animation duration (in milliseconds)
const SCROLL_BACK_DURATION = 600;

// Dimension constants for responsive media sizing
const MEDIA_BASE_WIDTH = 300;
const MEDIA_MOBILE_WIDTH_DELTA = 650;
const MEDIA_DESKTOP_WIDTH_DELTA = 1250;
const MEDIA_BASE_HEIGHT = 400;
const MEDIA_MOBILE_HEIGHT_DELTA = 200;
const MEDIA_DESKTOP_HEIGHT_DELTA = 400;
const TEXT_MOBILE_TRANSLATE_FACTOR = 180;
const TEXT_DESKTOP_TRANSLATE_FACTOR = 150;

interface HeroContentRenderProps {
  scrollProgress: number;
  isMobile: boolean;
  textTranslateX: number;
}

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  heroContent?: ReactNode | ((props: HeroContentRenderProps) => ReactNode); // Custom hero content to display above the expanding media
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  heroContent,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  
  // New states for the requested features
  const [isPaused, setIsPaused] = useState(false); // Pause at end of animation
  const [isScrollingBack, setIsScrollingBack] = useState(false); // Smooth scroll-back
  const [animationCompleted, setAnimationCompleted] = useState(false); // Animation viewed once - permanent section

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollBackAnimationRef = useRef<number | null>(null);

  // Check localStorage on mount to see if animation was already viewed
  useEffect(() => {
    const hasViewedAnimation = localStorage.getItem('scrollHeroAnimationViewed');
    if (hasViewedAnimation === 'true') {
      // Skip directly to expanded state with video
      queueMicrotask(() => {
        setScrollProgress(1);
        setShowContent(true);
        setMediaFullyExpanded(true);
        setAnimationCompleted(true);
      });
    }
  }, []);

  // Reset state when mediaType changes - this is an intentional pattern for resetting animation state
  useEffect(() => {
    // Only reset if animation hasn't been permanently completed
    if (!animationCompleted) {
      queueMicrotask(() => {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
      });
    }
  }, [mediaType, animationCompleted]);

  // Smooth scroll-back animation function
  const animateScrollBack = useCallback(() => {
    if (scrollBackAnimationRef.current) {
      cancelAnimationFrame(scrollBackAnimationRef.current);
    }
    
    setIsScrollingBack(true);
    const startProgress = scrollProgress;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCROLL_BACK_DURATION, 1);
      
      // Easing function for smooth animation (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newProgress = startProgress * (1 - easeOut);
      
      setScrollProgress(newProgress);
      
      if (progress < 1) {
        scrollBackAnimationRef.current = requestAnimationFrame(animate);
      } else {
        setScrollProgress(0);
        setIsScrollingBack(false);
        scrollBackAnimationRef.current = null;
      }
    };
    
    scrollBackAnimationRef.current = requestAnimationFrame(animate);
  }, [scrollProgress]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If animation is permanently completed, don't handle scroll events for animation
      if (animationCompleted) return;
      
      // If currently in scroll-back animation, ignore wheel events
      if (isScrollingBack) {
        e.preventDefault();
        return;
      }
      
      // If paused at end, ignore forward scrolling but allow scroll back
      if (isPaused) {
        if (e.deltaY < 0) {
          // User wants to scroll back - cancel pause and start scroll back
          setIsPaused(false);
          animateScrollBack();
        }
        e.preventDefault();
        return;
      }
      
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= SCROLL_THRESHOLD) {
        // Instead of immediately resetting, start smooth scroll-back animation
        setMediaFullyExpanded(false);
        setShowContent(false);
        animateScrollBack();
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * WHEEL_SCROLL_SENSITIVITY;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          // Start pause phase before allowing normal scrolling
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setMediaFullyExpanded(true);
            setShowContent(true);
            // Mark animation as completed and store in localStorage
            setAnimationCompleted(true);
            localStorage.setItem('scrollHeroAnimationViewed', 'true');
          }, END_PAUSE_DURATION);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (animationCompleted) return;
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (animationCompleted) return;
      if (!touchStartY) return;
      
      // If currently in scroll-back animation, ignore touch events
      if (isScrollingBack) {
        e.preventDefault();
        return;
      }
      
      // If paused at end, ignore forward scrolling but allow scroll back
      if (isPaused) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        if (deltaY < 0) {
          // User wants to scroll back - cancel pause and start scroll back
          setIsPaused(false);
          animateScrollBack();
        }
        e.preventDefault();
        setTouchStartY(touchY);
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < TOUCH_SWIPE_THRESHOLD && window.scrollY <= SCROLL_THRESHOLD) {
        // Instead of immediately resetting, start smooth scroll-back animation
        setMediaFullyExpanded(false);
        setShowContent(false);
        animateScrollBack();
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        // Increase sensitivity for mobile, especially when scrolling back
        const scrollFactor = deltaY < 0 ? TOUCH_SCROLL_BACK_SENSITIVITY : TOUCH_SCROLL_FORWARD_SENSITIVITY;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          // Start pause phase before allowing normal scrolling
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setMediaFullyExpanded(true);
            setShowContent(true);
            // Mark animation as completed and store in localStorage
            setAnimationCompleted(true);
            localStorage.setItem('scrollHeroAnimationViewed', 'true');
          }, END_PAUSE_DURATION);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded && !animationCompleted) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (scrollBackAnimationRef.current) {
        cancelAnimationFrame(scrollBackAnimationRef.current);
      }
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isPaused, isScrollingBack, animationCompleted, animateScrollBack]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = MEDIA_BASE_WIDTH + scrollProgress * (isMobileState ? MEDIA_MOBILE_WIDTH_DELTA : MEDIA_DESKTOP_WIDTH_DELTA);
  const mediaHeight = MEDIA_BASE_HEIGHT + scrollProgress * (isMobileState ? MEDIA_MOBILE_HEIGHT_DELTA : MEDIA_DESKTOP_HEIGHT_DELTA);
  const textTranslateX = scrollProgress * (isMobileState ? TEXT_MOBILE_TRANSLATE_FACTOR : TEXT_DESKTOP_TRANSLATE_FACTOR);

  // Split title for the animation effect
  const titleWords = title ? title.split(' ') : [];
  const firstWord = titleWords[0] || '';
  const restOfTitle = titleWords.slice(1).join(' ');

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{
        minHeight: mediaFullyExpanded ? 'auto' : '100vh',
      }}
    >
      {/* If animation is permanently completed, show a static video hero section */}
      {animationCompleted && mediaFullyExpanded ? (
        <>
          {/* Static Video Hero Section (no animation) */}
          <div className="relative w-full h-screen flex items-center justify-center bg-black">
            <video
              src={mediaSrc}
              autoPlay
              muted
              loop
              playsInline
              poster={posterSrc}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          {/* Scrollable Content Section */}
          <div className="relative z-30 bg-transparent">
            {children}
          </div>
        </>
      ) : (
        <>
          {/* Fixed Background Section - Animation Mode */}
          <div
            className="fixed inset-0 z-0 flex items-center justify-center"
            style={{
              display: mediaFullyExpanded ? 'none' : 'flex',
            }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={bgImageSrc}
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Hero Content Section */}
            {heroContent ? (
              // Custom hero content provided by parent
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                {typeof heroContent === 'function' 
                  ? heroContent({ scrollProgress, isMobile: isMobileState, textTranslateX })
                  : heroContent}
              </div>
            ) : (
              // Default title/date structure with scroll animation
              <div
                className={`absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center text-center px-4 ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
                style={{
                  top: isMobileState
                    ? `${15 - scrollProgress * 10}%`
                    : `${20 - scrollProgress * 10}%`,
                }}
              >
                {date && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block text-[#80D3EE] font-orbitron text-sm md:text-base tracking-widest mb-4"
                  >
                    {date}
                  </motion.span>
                )}
                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold tracking-tighter text-white ${
                    textBlend ? 'mix-blend-difference' : ''
                  }`}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `translateX(-${textTranslateX}px)`,
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    {firstWord}
                  </span>{' '}
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `translateX(${textTranslateX}px)`,
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    {restOfTitle}
                  </span>
                </h1>
                {scrollToExpand && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-white/70 text-sm mt-8"
                  >
                    {scrollToExpand}
                  </motion.p>
                )}
              </div>
            )}

            {/* Media Container */}
            <div
              className="relative z-10 flex items-center justify-center"
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: '95vw',
                maxHeight: '85vh',
                transition: 'all 0.1s ease-out',
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                {mediaType === 'video' ? (
                  <video
                    src={mediaSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={posterSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div
            className="relative z-30 bg-transparent"
            style={{
              marginTop: mediaFullyExpanded ? 0 : '100vh',
              opacity: showContent ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export type { HeroContentRenderProps };
export default ScrollExpandMedia;
