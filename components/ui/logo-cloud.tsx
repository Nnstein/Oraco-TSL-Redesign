import React from 'react';
import { BlurredInfiniteSlider } from '@/components/ui/infinite-slider';

interface LogoCloudProps {
    logos: Array<{
        src: string;
        alt: string;
        height: number;
    }>;
    title?: string;
    className?: string;
}

export default function LogoCloud({ logos, title = "Trusted by leading institutions", className = "" }: LogoCloudProps) {
    return (
        <section className={`bg-background overflow-hidden py-12 md:py-16 w-full ${className}`}>
            <div className="m-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="flex-shrink-0 text-center md:text-right md:max-w-44 md:border-r md:border-gray-200 dark:md:border-gray-800 md:pr-6">
                        <p className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            {title}
                        </p>
                    </div>
                    <div className="w-full py-6 md:w-auto md:flex-1">
                        <BlurredInfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}
                            fadeWidth={80}
                        >
                            {logos.map((logo) => (
                                <div key={logo.src} className="flex">
                                    <img
                                        className="mx-auto w-fit dark:invert"
                                        src={logo.src}
                                        alt={logo.alt}
                                        style={{ height: `${logo.height}px` }}
                                        width="auto"
                                    />
                                </div>
                            ))}
                        </BlurredInfiniteSlider>
                    </div>
                </div>
            </div>
        </section>
    );
}
