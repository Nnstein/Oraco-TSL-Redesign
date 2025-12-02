import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

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
);

export default InsightsPage;
