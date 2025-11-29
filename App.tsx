import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Layout from './components/Layout';
import { NAV_ITEMS, SERVICES, TESTIMONIALS, STATS, PARTNERS, HERO_SLIDES, UNIVERSITIES, SCHOOLS, RESEARCH_INSTITUTIONS } from './constants';
import Button from './components/Button';
import ScrollReveal from './components/ScrollReveal';
import { ArrowRight, CheckCircle2, ChevronRight, Zap, Target, Users, Play, Quote, Sparkles, GraduationCap, BookOpen, Presentation, ScrollText, Check, MapPin } from 'lucide-react';

// --- ScrollToTop Helper ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Page Components ---

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index);
    startTimer(); // Reset timer on manual interaction
  };

  const getSlideStyle = (index: number) => {
    const total = HERO_SLIDES.length;
    let diff = (index - currentSlide + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) {
      return {
        className: "z-30 opacity-100 scale-100 translate-x-0 grayscale-0 cursor-default",
        isCenter: true
      };
    }
    if (diff === 1 || diff === -total + 1) {
      return {
        className: "z-10 opacity-40 scale-[0.75] translate-x-[25%] lg:translate-x-[45%] grayscale blur-[1px] cursor-pointer hover:opacity-60",
        isCenter: false
      };
    }
    if (diff === -1 || diff === total - 1) {
      return {
        className: "z-10 opacity-40 scale-[0.75] -translate-x-[25%] lg:-translate-x-[45%] grayscale blur-[1px] cursor-pointer hover:opacity-60",
        isCenter: false
      };
    }
    
    return {
      className: "z-0 opacity-0 scale-50 translate-x-0 hidden",
      isCenter: false
    };
  };

  const academicIcons = [GraduationCap, BookOpen, Presentation, ScrollText];

  // Distribute Research Institutions into the two rows randomly
  const { row1Partners, row2Partners } = useMemo(() => {
    // Split research institutions roughly in half
    const researchSplitIndex = Math.ceil(RESEARCH_INSTITUTIONS.length / 2);
    const researchPart1 = RESEARCH_INSTITUTIONS.slice(0, researchSplitIndex);
    const researchPart2 = RESEARCH_INSTITUTIONS.slice(researchSplitIndex);

    // Combine with Universities and Schools
    const list1 = [...UNIVERSITIES, ...researchPart1];
    const list2 = [...SCHOOLS, ...researchPart2];

    // Simple shuffle function
    const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

    return {
      row1Partners: shuffle([...list1]),
      row2Partners: shuffle([...list2])
    };
  }, []);

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-4 md:pt-40 md:pb-12 overflow-hidden">
        
        {/* Background Decor & Patterns */}
        <div className="absolute inset-0 pointer-events-none -z-10 select-none overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[200px] md:w-[800px] h-[200px] md:h-[800px] bg-brand-light dark:bg-brand-primary/10 rounded-full blur-3xl opacity-40 transition-colors" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[150px] md:w-[600px] h-[150px] md:h-[600px] bg-amber-50 dark:bg-amber-500/5 rounded-full blur-3xl opacity-40 transition-colors" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* Mobile: Split Headline and Carousel */}
            <div className="w-full flex lg:hidden items-center justify-between gap-2">
                 {/* Mobile Headline */}
                 <div className="w-[55%]">
                     <ScrollReveal>
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-white dark:bg-slate-900 shadow-soft border border-slate-100 dark:border-slate-800 text-brand-dark dark:text-slate-200 text-[9px] font-medium mb-3 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                          <span>Turnitin Partner</span>
                        </div>
                      </ScrollReveal>
                      <ScrollReveal delay={100}>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-brand-dark dark:text-white tracking-tight leading-[1.1] relative transition-colors">
                          Breakthrough <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-teal-400">Thinking.</span>
                        </h1>
                      </ScrollReveal>
                 </div>
                 
                 {/* Mobile Carousel */}
                 <div className="w-[45%] h-[160px] md:h-[240px] perspective-1000 flex items-center justify-center relative preserve-3d">
                   {HERO_SLIDES.map((slide, index) => {
                      const styleInfo = getSlideStyle(index);
                      const IconComponent = academicIcons[index % academicIcons.length];
                      return (
                        <div 
                          key={slide.id}
                          onClick={() => handleSlideClick(index)}
                          className={`absolute w-[110px] md:w-[160px] aspect-[4/5] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${styleInfo.className}`}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <div className="relative w-full h-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-xl rounded-lg">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover select-none" draggable="false" />
                            {!styleInfo.isCenter && <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/60 transition-opacity"></div>}
                          </div>
                          {styleInfo.isCenter && (
                             <div className="absolute -top-2 -right-2 bg-brand-primary text-white p-1.5 shadow-lg rounded-lg z-20 border-2 border-white dark:border-slate-900">
                               <IconComponent size={14} className="transform -rotate-12 md:w-6 md:h-6" />
                             </div>
                          )}
                        </div>
                      );
                   })}
                 </div>
            </div>

            {/* Desktop Left Content */}
            <div className="hidden lg:block lg:col-span-7 z-20 lg:pr-12 text-center lg:text-left">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow-soft border border-slate-100 dark:border-slate-800 text-brand-dark dark:text-slate-200 text-xs md:text-sm font-medium mb-6 md:mb-8 mx-auto lg:mx-0 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                  <span>Official Partner of Turnitin</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={100}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-dark dark:text-white tracking-tight leading-[1.05] mb-8 md:mb-10 relative transition-colors">
                  Breakthrough <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-teal-400">Thinking.</span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={200}>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 md:mb-12 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0 transition-colors">
                  Oraco TSL Africa fosters partnerships with global innovators to provide premier educational technology, credentials verification, and systems integration solutions.
                </p>
              </ScrollReveal>
            </div>

            {/* Desktop Visual - Carousel */}
            <div className="hidden lg:flex lg:col-span-5 relative h-[350px] lg:h-[500px] w-full perspective-1000 items-center justify-center mt-8 lg:mt-0">
              <ScrollReveal delay={400} className="w-full h-full flex items-center justify-center">
                {/* Carousel Container */}
                <div className="relative w-full h-full flex items-center justify-center preserve-3d">
                   {HERO_SLIDES.map((slide, index) => {
                      const styleInfo = getSlideStyle(index);
                      const IconComponent = academicIcons[index % academicIcons.length];
                      
                      return (
                        <div 
                          key={slide.id}
                          onClick={() => handleSlideClick(index)}
                          className={`absolute w-[200px] sm:w-[280px] lg:w-[350px] aspect-[4/5] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${styleInfo.className}`}
                          style={{
                            transformStyle: 'preserve-3d'
                          }}
                        >
                          {/* Image Container */}
                          <div 
                            className="relative w-full h-full bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-2xl"
                            style={{
                              clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)'
                            }}
                          >
                            <img 
                              src={slide.image} 
                              alt={slide.title}
                              className="w-full h-full object-cover select-none"
                              draggable="false"
                            />
                            {!styleInfo.isCenter && <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/60 transition-opacity"></div>}
                          </div>

                          {/* Geometric Frame */}
                          <div 
                            className={`absolute -inset-4 pointer-events-none transition-opacity duration-500 ${styleInfo.isCenter ? 'opacity-100' : 'opacity-0'}`}
                          >
                            <svg className="w-full h-full text-brand-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
                              <path d="M 12 2 L 2 2 L 2 12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                              <path d="M 88 2 L 98 2 L 98 12" fill="none" stroke="currentColor" strokeWidth="0.5" />
                              <path d="M 98 88 L 98 98 L 88 98" fill="none" stroke="currentColor" strokeWidth="0.5" />
                              <path d="M 12 98 L 2 98 L 2 88" fill="none" stroke="currentColor" strokeWidth="0.5" />
                              
                              <line x1="15" y1="2" x2="85" y2="2" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                              <line x1="98" y1="15" x2="98" y2="85" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                              <line x1="85" y1="98" x2="15" y2="98" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                              <line x1="2" y1="85" x2="2" y2="15" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
                            </svg>

                            <div className="absolute -top-3 -right-3 bg-brand-primary text-white p-3 md:p-4 transform shadow-xl rounded-xl z-20 border-4 border-white dark:border-slate-900 transition-all duration-300 hover:scale-110">
                              <IconComponent size={32} className="transform -rotate-12 md:w-10 md:h-10" />
                            </div>
                            
                            <div className="absolute bottom-10 -right-6 flex flex-col gap-2">
                               <div className="w-1 h-1 bg-brand-dark dark:bg-white rounded-full"></div>
                               <div className="w-1 h-1 bg-brand-dark dark:bg-white rounded-full opacity-50"></div>
                               <div className="w-1 h-1 bg-brand-dark dark:bg-white rounded-full opacity-25"></div>
                            </div>
                          </div>

                          {/* Floating Label */}
                          <div className={`absolute bottom-6 md:bottom-8 left-0 right-0 mx-4 md:mx-6 p-3 md:p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-l-4 border-brand-primary transition-all duration-500 delay-100 ${styleInfo.isCenter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                              <h3 className="font-bold text-brand-dark dark:text-white font-serif text-base md:text-lg">{slide.title}</h3>
                              <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{slide.subtitle}</p>
                          </div>
                        </div>
                      );
                   })}
                </div>
              </ScrollReveal>
            </div>

            {/* Shared CTA Buttons (Below Mobile Split) */}
            <div className="w-full lg:col-span-7 mt-4 lg:mt-8">
               <ScrollReveal delay={300}>
                  <p className="block lg:hidden text-xs sm:text-sm md:text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed font-light">
                    Oraco TSL Africa fosters partnerships with global innovators to provide premier educational technology, credentials verification, and systems integration solutions.
                  </p>
                  <div className="flex flex-row items-center gap-3 justify-between md:justify-start">
                    <Link to="/services" className="w-1/2 md:w-auto">
                        <Button className="w-full h-10 md:h-16 px-2 md:px-10 text-[10px] md:text-lg tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        Explore Solutions
                        <ArrowRight className="ml-1 w-3 h-3 md:w-5 md:h-5 inline" />
                        </Button>
                    </Link>
                    <Link to="/contact" className="w-1/2 md:w-auto">
                        <Button variant="outline" className="w-full h-10 md:h-16 px-2 md:px-10 text-[10px] md:text-lg dark:text-brand-primary dark:border-brand-primary dark:hover:bg-brand-primary/10 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        Book Consultation
                        </Button>
                    </Link>
                  </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Stats & Trust */}
      <section className="container mx-auto px-4 md:px-6 py-4 md:py-8 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-4 gap-2 md:gap-12 text-center divide-x-0 md:divide-x divide-slate-100 dark:divide-slate-800">
            {STATS.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} className="px-1 md:px-4">
                <div className="text-xl md:text-5xl font-serif font-bold text-brand-dark dark:text-white mb-0.5 md:mb-2 transition-colors">{stat.value}</div>
                <div className="text-[9px] md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest transition-colors leading-tight">{stat.label}</div>
              </ScrollReveal>
            ))}
          </div>
      </section>

      {/* Partners Section (Marquee) */}
      <section className="py-4 md:py-6 border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 overflow-hidden transition-colors">
        <ScrollReveal>
          <div className="container mx-auto px-6 mb-4 md:mb-8 text-center">
            <p className="text-[10px] md:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Trusted by leading institutions</p>
          </div>

          {/* Marquee Container with Gradient Mask */}
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_40%,black_60%,transparent)] space-y-4 md:space-y-8">
            
            {/* Row 1: Universities + Research Mixed */}
            <div className="flex whitespace-nowrap overflow-hidden group">
               <div className="flex animate-scroll group-hover:[animation-play-state:paused] items-center">
                 {[...row1Partners, ...row1Partners].map((partner, idx) => (
                    <div key={`${partner.id}-${idx}`} className="mx-4 md:mx-12 hover:scale-105 transition-transform duration-300">
                       <div className="h-10 w-20 md:h-20 md:w-40 bg-white rounded-lg flex items-center justify-center p-1 md:p-2 shadow-sm border border-slate-100 dark:border-slate-800 dark:bg-white/90">
                         <img 
                            src={partner.logo} 
                            alt={partner.name} 
                            title={partner.name}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                         />
                         <span className="hidden text-brand-dark font-serif font-bold text-[8px] md:text-xs text-center whitespace-normal leading-tight">{partner.name}</span>
                       </div>
                    </div>
                 ))}
               </div>
            </div>

            {/* Row 2: Schools + Research Mixed */}
            <div className="flex whitespace-nowrap overflow-hidden group">
               <div className="flex animate-scroll-reverse group-hover:[animation-play-state:paused] items-center">
                 {[...row2Partners, ...row2Partners].map((partner, idx) => (
                    <div key={`${partner.id}-${idx}`} className="mx-4 md:mx-12 hover:scale-105 transition-transform duration-300">
                       <div className="h-10 w-20 md:h-20 md:w-40 bg-white rounded-lg flex items-center justify-center p-1 md:p-2 shadow-sm border border-slate-100 dark:border-slate-800 dark:bg-white/90">
                         <img 
                            src={partner.logo} 
                            alt={partner.name} 
                            title={partner.name}
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                         />
                          <span className="hidden text-brand-dark font-serif font-bold text-[8px] md:text-xs text-center whitespace-normal leading-tight">{partner.name}</span>
                       </div>
                    </div>
                 ))}
               </div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* Solutions Focus Section - Swipeable on Mobile */}
      <section className="container mx-auto px-6 mt-16 md:mt-32">
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-16">
            <span className="text-brand-primary font-bold tracking-widest uppercase text-[10px] md:text-sm mb-2 md:mb-4 block">Our Solutions</span>
            <h2 className="text-2xl md:text-5xl font-serif font-bold text-brand-dark dark:text-white transition-colors">Tools for Academic Integrity</h2>
          </div>
        </ScrollReveal>
        
        {/* Mobile Swipe Container - Peek Style */}
        <div className="flex overflow-x-auto gap-4 pb-6 -mx-6 px-6 md:grid md:grid-cols-3 md:gap-12 md:overflow-visible md:pb-0 snap-x snap-mandatory">
          {[
            { 
              title: "Turnitin", 
              desc: "Prevent plagiarism, uphold academic integrity, and address misconduct. Oraco is a regional Turnitin partner.",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Turnitin_logo.svg/2560px-Turnitin_logo.svg.png" 
            },
            { 
              title: "Gradescope", 
              desc: "Intelligent grading platform for all types of assessments. Streamline grading and get actionable insights.",
              image: "https://www.gradescope.com/assets/gradescope_logo_color-03be81a8b329402280d0d6118d533116.svg" 
            },
            { 
              title: "e-Verification", 
              desc: "Blockchain-based document signing, certification, and verification. Secure, instant, and tamper-proof.",
              image: null,
              icon: Check
            },
          ].map((item, idx) => (
            <div key={idx} className="min-w-[260px] w-[260px] md:w-auto snap-center flex-shrink-0 h-full">
              <ScrollReveal delay={idx * 150} className="h-full">
                <div className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center h-full">
                  <div className="h-12 md:h-16 flex items-center justify-center mb-4 md:mb-6 w-full">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="max-h-8 md:max-h-12 max-w-[140px] md:max-w-[180px] object-contain dark:bg-white/90 dark:px-2 dark:rounded" />
                    ) : (
                      item.icon && <item.icon size={32} className="text-brand-primary md:w-12 md:h-12" />
                    )}
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-brand-dark dark:text-white mb-2 md:mb-4 font-serif transition-colors">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-lg transition-colors">{item.desc}</p>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* Services Highlight */}
      <section className="mt-16 md:mt-32">
        <ScrollReveal className="w-full">
          <div className="bg-brand-dark dark:bg-slate-900 text-white py-10 md:py-32 rounded-[1.5rem] md:rounded-[3rem] mx-4 overflow-hidden relative transition-colors">
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-[150px] md:w-[600px] h-[150px] md:h-[600px] bg-brand-primary/20 rounded-full blur-[40px] md:blur-[100px] -translate-y-1/2 translate-x-1/2" />
             
             <div className="container mx-auto px-4 md:px-6 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-20">
                  <div className="max-w-2xl">
                      <h2 className="text-2xl md:text-6xl font-serif font-bold mb-3 md:mb-6">Comprehensive Expertise</h2>
                      <p className="text-sm md:text-xl text-slate-400 font-light">
                          From educational technology to business strategy, we empower organizations with simplicity and ease of processes.
                      </p>
                  </div>
                  <Link to="/services" className="w-full md:w-auto mt-6 md:mt-0">
                      <Button variant="white" className="w-full md:w-auto text-sm md:text-base h-10 md:h-auto dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:border-slate-700">View All Services</Button>
                  </Link>
               </div>

               {/* Mobile: Grid cols 2, Smaller Tiles */}
               <div className="grid grid-cols-2 gap-2 md:gap-6 lg:grid-cols-3">
                  {SERVICES.slice(0, 3).map((service, idx) => (
                    <ScrollReveal key={service.id} delay={idx * 150} className="h-full">
                      <div className="group p-3 md:p-8 rounded-xl md:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm h-full flex flex-col">
                          <service.icon className="w-6 h-6 md:w-12 md:h-12 text-brand-primary mb-2 md:mb-6 group-hover:scale-110 transition-transform duration-300" />
                          <h3 className="text-xs md:text-2xl font-bold mb-1 md:mb-4 line-clamp-2 md:line-clamp-none leading-tight">{service.title}</h3>
                          <p className="text-slate-400 mb-2 md:mb-8 leading-relaxed text-[10px] md:text-base flex-grow line-clamp-3 md:line-clamp-none">{service.description}</p>
                          <div className="flex items-center text-brand-primary font-medium group-hover:gap-2 transition-all text-[10px] md:text-base">
                              <span>Learn more</span>
                              <ChevronRight size={12} className="ml-1 md:w-4 md:h-4" />
                          </div>
                      </div>
                    </ScrollReveal>
                  ))}
               </div>
             </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Testimonial Carousel */}
      <section className="container mx-auto px-6 max-w-5xl text-center mt-16 md:mt-32">
          <ScrollReveal>
            <Quote size={24} className="text-brand-primary/20 mx-auto mb-4 md:mb-8 md:w-12 md:h-12" />
            <h2 className="text-xl md:text-5xl font-serif font-bold text-brand-dark dark:text-white mb-8 md:mb-16 leading-tight transition-colors">
                "Oraco Africa is the partner you want for serious digital transformation."
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
               {TESTIMONIALS.map((t, idx) => (
                  <ScrollReveal key={t.id} delay={idx * 150} className="h-full">
                    <div className="text-left p-4 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 hover:shadow-soft transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 h-full">
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                            <img src={t.avatar} alt={t.name} className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover" />
                            <div>
                                <div className="font-bold text-brand-dark dark:text-white text-xs md:text-base transition-colors">{t.name}</div>
                                <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">{t.role}, {t.company}</div>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm italic">"{t.quote}"</p>
                    </div>
                  </ScrollReveal>
               ))}
          </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 mt-16 md:mt-32">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-[1.5rem] md:rounded-[3rem] p-8 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-primary/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-6xl font-serif font-bold mb-4 md:mb-8">Ready to innovate?</h2>
                    <p className="text-sm md:text-2xl text-teal-100 mb-6 md:mb-12 font-light">
                        Talk to us about Edutech, Digitization, and Verification solutions.
                    </p>
                    <Link to="/contact">
                         <Button variant="white" size="lg" className="w-full md:w-auto h-12 md:h-16 px-6 md:px-10 text-base md:text-lg dark:text-brand-dark">
                            Get a Free Consultation
                        </Button>
                    </Link>
                </div>
            </div>
          </ScrollReveal>
      </section>
    </div>
  );
};

const ServicesPage: React.FC = () => (
  <div className="pb-24 pt-24 md:pt-32">
    <div className="container mx-auto px-6 mb-8 md:mb-24 text-center">
      <ScrollReveal>
        <span className="text-brand-primary font-bold tracking-widest uppercase text-[10px] md:text-sm mb-2 md:mb-4 block">Professional Services For Businesses</span>
        <h1 className="text-3xl md:text-7xl font-serif font-bold text-brand-dark dark:text-white mb-4 md:mb-8 transition-colors">Our Capabilities</h1>
        <p className="text-sm md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed transition-colors">
          We offer a holistic suite of digital services designed to take your business from concept to market dominance.
        </p>
      </ScrollReveal>
    </div>

    {/* Mobile: Horizontal Swipe (Centered), Desktop: Grid */}
    <div className="container mx-auto px-6">
      <div className="flex overflow-x-auto gap-4 pb-6 -mx-6 px-6 md:grid md:grid-cols-2 md:gap-12 md:overflow-visible md:pb-0 snap-x snap-mandatory">
        {SERVICES.map((service, idx) => (
          <div key={service.id} className="min-w-[280px] w-[280px] md:w-auto snap-center flex-shrink-0 h-full">
            <ScrollReveal delay={idx * 100} className="h-full">
              <div className="group p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-2xl hover:border-brand-primary/20 dark:hover:border-brand-primary/20 transition-all duration-300 flex flex-col items-start h-full">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-brand-light dark:bg-slate-800 text-brand-primary flex items-center justify-center mb-4 md:mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <service.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-3xl font-bold text-brand-dark dark:text-white mb-2 md:mb-4 font-serif transition-colors">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 md:mb-10 text-xs md:text-lg transition-colors">{service.description}</p>
                
                <div className="mt-auto w-full">
                    <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-4 md:mb-8 group-hover:bg-brand-primary/20 transition-colors"></div>
                    <div className="flex flex-col gap-2 md:gap-3">
                        <div className="flex items-center gap-2 md:gap-3 text-slate-700 dark:text-slate-300 text-xs md:text-base transition-colors">
                            <CheckCircle2 size={16} className="text-brand-primary flex-shrink-0 md:w-[18px]" />
                            <span className="font-medium">Strategic Planning</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-slate-700 dark:text-slate-300 text-xs md:text-base transition-colors">
                            <CheckCircle2 size={16} className="text-brand-primary flex-shrink-0 md:w-[18px]" />
                            <span className="font-medium">Expert Execution</span>
                        </div>
                    </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="pb-24 pt-24 md:pt-32">
     <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-24">
            <h1 className="text-3xl md:text-7xl font-serif font-bold text-brand-dark dark:text-white mb-4 md:mb-10 transition-colors">Our Story</h1>
            <p className="text-sm md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
               Oraco TSL is a technology solutions provider, with core focus on Educational Technology, Credentials Verification and innovative solutions that guarantee simplicity and ease of processes.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-32">
           <ScrollReveal delay={200}>
             <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-square md:aspect-auto h-[300px] md:h-auto">
               <div className="absolute inset-0 bg-brand-primary/20 mix-blend-multiply z-10"></div>
               <img src="https://picsum.photos/800/800?grayscale" alt="Team working" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
             </div>
           </ScrollReveal>
           <div className="space-y-6 md:space-y-10">
             <ScrollReveal delay={400}>
               <div>
                  <h3 className="text-2xl md:text-4xl font-serif font-bold text-brand-dark dark:text-white mb-2 md:mb-4 transition-colors">Our Approach</h3>
                  <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                      Our affinity for breakthrough thinking has fostered our partnerships with global innovators. We don't just deliver software; we deliver transformation.
                  </p>
               </div>
             </ScrollReveal>
             
             <div className="space-y-4 md:space-y-6">
                 {[
                    { title: "Discover", desc: "Deep dive into your business needs and market landscape." },
                    { title: "Design", desc: "Crafting intuitive, human-centric user experiences." },
                    { title: "Develop", desc: "Building robust, scalable solutions with clean code." },
                    { title: "Deploy", desc: "Launching with confidence and continuous support." },
                 ].map((step, idx) => (
                    <ScrollReveal key={idx} delay={500 + idx * 100}>
                      <div className="flex gap-3 md:gap-6 group">
                          <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 font-bold flex items-center justify-center group-hover:border-brand-primary group-hover:text-brand-primary transition-colors text-xs md:text-base">
                              {idx + 1}
                          </div>
                          <div>
                              <h4 className="text-base md:text-xl font-bold text-brand-dark dark:text-white transition-colors">{step.title}</h4>
                              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 transition-colors">{step.desc}</p>
                          </div>
                      </div>
                    </ScrollReveal>
                 ))}
             </div>
           </div>
        </div>
     </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="pb-24 pt-24 md:pt-32 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-start">
        <div className="md:sticky md:top-32">
          <ScrollReveal>
            <span className="text-brand-primary font-bold tracking-widest uppercase text-[10px] md:text-sm mb-2 md:mb-4 block">Get in Touch</span>
            <h1 className="text-3xl md:text-7xl font-serif font-bold text-brand-dark dark:text-white mb-4 md:mb-8 transition-colors">Let's build something<br/>extraordinary.</h1>
            <p className="text-sm md:text-xl text-slate-600 dark:text-slate-400 mb-6 md:mb-12 font-light transition-colors">
              Have a project in mind? We'd love to hear about it. Fill out the form, and we'll get back to you within 24 hours.
            </p>
          </ScrollReveal>

          <div className="space-y-4 md:space-y-8">
            <ScrollReveal delay={200}>
              <div className="flex gap-4 md:gap-6 items-center p-4 md:p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-light dark:bg-slate-800 text-brand-primary flex items-center justify-center flex-shrink-0">
                  <Target size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark dark:text-white text-sm md:text-lg transition-colors">Lagos Office</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-base transition-colors">1st Floor, 21 Norman Williams Street,<br/>off Awolowo Road, Ikoyi, Lagos</p>
                  <p className="text-brand-primary text-xs md:text-sm font-semibold mt-1">Tel: +234-818-153-5455</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex gap-4 md:gap-6 items-center p-4 md:p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-light dark:bg-slate-800 text-brand-primary flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark dark:text-white text-sm md:text-lg transition-colors">Abuja Office</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-base transition-colors">139B Adetokunbo Ademola Crescent,<br/>Wuse II, Abuja, FCT</p>
                   <p className="text-brand-primary text-xs md:text-sm font-semibold mt-1">Tel: +234 (9) 8725121</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <div className="flex gap-4 md:gap-6 items-center p-4 md:p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-light dark:bg-slate-800 text-brand-primary flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark dark:text-white text-sm md:text-lg transition-colors">Email Us</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-base transition-colors">info@oracoafrica.com</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={500}>
          <div className="bg-white dark:bg-slate-950 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors mt-8 lg:mt-0">
            <form className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">First Name</label>
                  <input type="text" className="w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white text-sm md:text-base" placeholder="Jane" />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white text-sm md:text-base" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Email Address</label>
                <input type="email" className="w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white text-sm md:text-base" placeholder="jane@company.com" />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Service Interest</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all appearance-none dark:text-white text-sm md:text-base">
                      <option>Edutech Solutions</option>
                      <option>System Integration</option>
                      <option>Business Strategy</option>
                      <option>Verification</option>
                      <option>Other</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={16} />
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all resize-none dark:text-white text-sm md:text-base" placeholder="Tell us about your project..."></textarea>
              </div>
              <Button className="w-full py-3 md:py-5 text-base md:text-lg" size="lg">Send Message</Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
);

const InsightsPage: React.FC = () => (
    <div className="pb-24 pt-24 md:pt-32">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
                 <ScrollReveal>
                   <span className="text-brand-primary font-bold tracking-widest uppercase text-[10px] md:text-sm mb-2 md:mb-4 block">Latest News</span>
                   <h1 className="text-3xl md:text-7xl font-serif font-bold text-brand-dark dark:text-white mb-4 md:mb-8 transition-colors">Insights</h1>
                   <p className="text-sm md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors">Staying ahead of the curve with thoughts on academic integrity, digital transformation, and more.</p>
                 </ScrollReveal>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                    { title: "What are some best practices for remote learning?", category: "EdTech", date: "Oct 12, 2023" },
                    { title: "TURNITIN SIMILARITY: Allow students to upload papers via a submission link", category: "Tutorial", date: "Sep 28, 2023" },
                    { title: "What is Contract Cheating? Why Does it Matter?", category: "Integrity", date: "Sep 15, 2023" },
                    { title: "Turnitin Workaround: Searching through Tables", category: "Tips & Tricks", date: "Aug 30, 2023" },
                    { title: "Academic Integrity in Nigeria: A New Era", category: "Opinion", date: "Aug 10, 2023" },
                ].map((post, idx) => (
                    <ScrollReveal key={idx} delay={idx * 150} className="h-full">
                      <div className="group cursor-pointer h-full flex flex-col">
                          <div className="h-48 md:h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4 md:mb-6 overflow-hidden relative">
                               <img src={`https://picsum.photos/600/400?random=${idx + 10}`} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                               <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-white">
                                   {post.category}
                               </div>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] md:text-xs text-slate-400 mb-2 md:mb-3">
                              <span>{post.date}</span>
                              <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                              <span>5 min read</span>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-brand-dark dark:text-white group-hover:text-brand-primary transition-colors leading-tight mb-2 md:mb-3 font-serif">
                              {post.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm line-clamp-2 transition-colors">
                              Explore the latest trends and detailed guides on how technology is reshaping education and business in Africa.
                          </p>
                      </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </div>
)

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout navItems={NAV_ITEMS}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;