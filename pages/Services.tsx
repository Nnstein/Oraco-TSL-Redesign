import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { SERVICES } from '../constants';

const ServicesPage: React.FC = () => (
    <div className="pb-24 pt-24 md:pt-32">
        <div className="container mx-auto px-6 mb-8 md:mb-24 text-center">
            <ScrollReveal>
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs sm:text-sm md:text-base mb-2 md:mb-4 block">Professional Services For Businesses</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-dark dark:text-white mb-4 md:mb-8 transition-colors">Our Capabilities</h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light leading-relaxed transition-colors">
                    We offer a holistic suite of digital services designed to take your business from concept to market dominance.
                </p>
            </ScrollReveal>
        </div>

        {/* Mobile: Horizontal Swipe (Centered), Desktop: Grid */}
        <div className="container mx-auto px-6">
            <div className="flex overflow-x-auto gap-4 pb-6 -mx-6 px-6 md:grid md:grid-cols-2 md:gap-12 md:overflow-visible md:pb-0 snap-x snap-mandatory">
                {SERVICES.map((service, idx) => (
                    <div key={service.id} className="min-w-[300px] w-[300px] sm:min-w-0 sm:w-auto snap-center flex-shrink-0 h-full">
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

export default ServicesPage;
