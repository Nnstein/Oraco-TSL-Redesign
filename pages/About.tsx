import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const AboutPage: React.FC = () => (
    <div className="pb-24 pt-24 md:pt-32">
        <div className="container mx-auto px-6">
            <ScrollReveal>
                <div className="max-w-4xl mx-auto text-center mb-12 md:mb-24">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-dark dark:text-white mb-4 md:mb-10 transition-colors">Our Story</h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
                        Oraco TSL is a technology solutions provider, with core focus on Educational Technology, Credentials Verification and innovative solutions that guarantee simplicity and ease of processes.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-32">
                <ScrollReveal delay={200}>
                    <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-square md:aspect-auto h-[300px] md:h-auto">
                        <div className="absolute inset-0 bg-brand-primary/20 mix-blend-multiply z-10"></div>
                        <img src="https://picsum.photos/800/800?grayscale" alt="Team working" width="800" height="800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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

export default AboutPage;
