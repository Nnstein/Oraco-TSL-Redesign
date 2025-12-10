import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, GraduationCap, BookOpen, Presentation, ScrollText, Check, Users, ShieldCheck, Clock, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '../components/ScrollReveal';
import { HERO_SLIDES, STATS, SERVICES, TESTIMONIALS, UNIVERSITIES, SCHOOLS, RESEARCH_INSTITUTIONS } from '../constants';
import HeroSection from '@/components/ui/hero-section';
import LogoCloud from '@/components/ui/logo-cloud';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const academicIcons = [GraduationCap, BookOpen, Presentation, ScrollText];

  // Distribute Research Institutions into the two rows randomly
  const { row1Partners, row2Partners } = React.useMemo(() => {
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

  const heroStats = [
    {
      value: STATS[0].value, // 50+
      label: STATS[0].label,
      icon: <GraduationCap className="h-5 w-5 text-brand-primary" />,
    },
    {
      value: STATS[1].value, // 100k+
      label: STATS[1].label,
      icon: <Users className="h-5 w-5 text-brand-primary" />,
    },
    {
      value: STATS[2].value, // 99%
      label: STATS[2].label,
      icon: <ShieldCheck className="h-5 w-5 text-brand-primary" />,
    },
    {
      value: STATS[3].value, // 10+
      label: STATS[3].label,
      icon: <Clock className="h-5 w-5 text-brand-primary" />,
    },
  ];

  const heroImages = HERO_SLIDES.map(slide => slide.image);

  return (
    <div className="pb-24">
      {/* New Hero Section */}
      <HeroSection
        title={
          <>
            Breakthrough <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-teal-400">Thinking.</span>
          </>
        }
        subtitle="Oraco TSL Africa fosters partnerships with global innovators to provide premier educational technology, credentials verification, and systems integration solutions."
        actions={[
          {
            text: 'Explore Solutions',
            onClick: () => navigate('/services'),
            variant: 'default', // Using default variant from new button
          },
          {
            text: 'Book Consultation',
            onClick: () => navigate('/contact'),
            variant: 'outline',
          }
        ]}
        stats={heroStats}
        images={heroImages}
        className="pt-32 pb-12"
      />

      {/* Logo Cloud - Partners */}
      <LogoCloud
        logos={[
          ...row1Partners.map(p => ({ src: p.logo, alt: p.name, height: 24 })),
          ...row2Partners.map(p => ({ src: p.logo, alt: p.name, height: 24 }))
        ]}
        title="Trusted by leading institutions"
      />

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
                      <img src={item.image} alt={item.title} width="180" height="48" className="max-h-8 md:max-h-12 max-w-[140px] md:max-w-[180px] object-contain dark:bg-white/90 dark:px-2 dark:rounded" />
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

              {/* Mobile: Grid cols 1, Tablet: 2, Desktop: 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                {SERVICES.slice(0, 3).map((service, idx) => (
                  <ScrollReveal key={service.id} delay={idx * 150} className="h-full">
                    <div className="group p-4 sm:p-6 md:p-8 rounded-xl md:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm h-full flex flex-col">
                      <service.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-brand-primary mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-4 leading-tight">{service.title}</h3>
                      <p className="text-slate-400 mb-3 sm:mb-4 md:mb-8 leading-relaxed text-xs sm:text-sm md:text-base flex-grow">{service.description}</p>
                      <div className="flex items-center text-brand-primary font-medium group-hover:gap-2 transition-all text-xs sm:text-sm md:text-base">
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
                  <img src={t.avatar} alt={t.name} width="48" height="48" className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover" />
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

export default HomePage;
