import { motion } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button'; // Assuming Button is in your components folder
import { cn } from '@/lib/utils'; // Your utility for class names
import React from 'react';

// Define the props for reusability
interface StatProps {
    value: string;
    label: string;
    icon: React.ReactNode;
}

interface ActionProps {
    text: string;
    onClick: () => void;
    variant?: ButtonProps['variant'];
    className?: string;
}

interface HeroSectionProps {
    title: React.ReactNode;
    subtitle: string;
    actions: ActionProps[];
    stats: StatProps[];
    images: string[];
    className?: string;
}

// Animation variants for Framer Motion
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

const floatingVariants = {
    animate: {
        y: [0, -8, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

const HeroSection = ({ title, subtitle, actions, stats, images, className }: HeroSectionProps) => {
    return (
        <section className={cn('w-full overflow-hidden bg-background py-12 sm:py-16 md:py-20 lg:py-24', className)}>
            <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 px-4 md:px-6">
                {/* Left Column: Text Content */}
                <motion.div
                    className="flex flex-col items-center text-center lg:items-start lg:text-left"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Turnitin Partner Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/20 mb-4 md:mb-6"
                    >
                        <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs md:text-sm font-semibold text-brand-primary">Official Turnitin Partner</span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                        variants={itemVariants}
                    >
                        {title}
                    </motion.h1>
                    <motion.p className="mt-4 md:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed" variants={itemVariants}>
                        {subtitle}
                    </motion.p>
                    <motion.div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4 lg:justify-start" variants={itemVariants}>
                        {actions.map((action, index) => (
                            <Button key={index} onClick={action.onClick} variant={action.variant} size="default" className={action.className}>
                                {action.text}
                            </Button>
                        ))}
                    </motion.div>
                    <motion.div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-start" variants={itemVariants}>
                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center gap-2 md:gap-3">
                                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-muted">{stat.icon}</div>
                                <div>
                                    <p className="text-lg md:text-xl font-bold text-foreground">{stat.value}</p>
                                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Column: Image Collage */}
                <motion.div
                    className="relative h-[400px] w-full sm:h-[500px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Decorative Shapes */}
                    <motion.div
                        className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-blue-200/50 dark:bg-blue-800/30"
                        variants={floatingVariants}
                        animate="animate"
                    />
                    <motion.div
                        className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-purple-200/50 dark:bg-purple-800/30"
                        variants={floatingVariants}
                        animate="animate"
                        style={{ transitionDelay: '0.5s' }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-green-200/50 dark:bg-green-800/30"
                        variants={floatingVariants}
                        animate="animate"
                        style={{ transitionDelay: '1s' }}
                    />

                    {/* Images */}
                    <motion.div
                        className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl bg-muted p-2 shadow-lg sm:h-64 sm:w-64"
                        style={{ transformOrigin: 'bottom center' }}
                        variants={imageVariants}
                    >
                        <img src={images[0]} alt="Student learning" className="h-full w-full rounded-xl object-cover" />
                    </motion.div>
                    <motion.div
                        className="absolute right-0 top-1/3 h-40 w-40 rounded-2xl bg-muted p-2 shadow-lg sm:h-56 sm:w-56"
                        style={{ transformOrigin: 'left center' }}
                        variants={imageVariants}
                    >
                        <img src={images[1]} alt="Tutor assisting" className="h-full w-full rounded-xl object-cover" />
                    </motion.div>
                    <motion.div
                        className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-muted p-2 shadow-lg sm:h-48 sm:w-48"
                        style={{ transformOrigin: 'top right' }}
                        variants={imageVariants}
                    >
                        <img src={images[2]} alt="Collaborative discussion" className="h-full w-full rounded-xl object-cover" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
