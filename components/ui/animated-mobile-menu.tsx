import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MenuItem {
    label: string;
    path: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
}

interface AnimatedMobileMenuProps {
    menuItems: MenuItem[];
    isDark: boolean;
    onToggleTheme?: () => void;
    className?: string;
}

export default function AnimatedMobileMenu({
    menuItems,
    isDark,
    onToggleTheme,
    className
}: AnimatedMobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dragX = useMotionValue(0);
    const dragOpacity = useTransform(dragX, [-200, 0], [0, 1]);

    const handleDragEnd = (_event: any, info: any) => {
        if (info.offset.x > 100) {
            setIsOpen(false);
        }
        dragX.set(0);
    };

    const menuVariants = {
        closed: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 30,
                mass: 0.8,
            },
        },
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 30,
                mass: 0.8,
            },
        },
    };

    const itemVariants = {
        closed: { x: 50, opacity: 0 },
        open: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.1 + i * 0.08,
                type: 'spring',
                stiffness: 250,
                damping: 25,
            },
        }),
    };

    const overlayVariants = {
        closed: {
            opacity: 0,
            transition: {
                duration: 0.3,
            },
        },
        open: {
            opacity: 1,
            transition: {
                duration: 0.4,
            },
        },
    };

    return (
        <>
            {/* Menu Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "p-2 rounded-lg transition-colors shadow-lg md:hidden",
                    isDark
                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                        : 'bg-white text-slate-900 hover:bg-slate-100',
                    className
                )}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Side Menu */}
            <motion.nav
                variants={menuVariants}
                initial="closed"
                animate={isOpen ? 'open' : 'closed'}
                drag="x"
                dragConstraints={{ left: 0, right: 320 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ x: dragX }}
                className={cn(
                    "fixed top-0 right-0 h-full w-80 z-50 shadow-2xl md:hidden",
                    isDark ? 'bg-slate-800' : 'bg-white'
                )}
            >
                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                        "absolute top-6 left-6 p-2 rounded-full transition-colors",
                        isDark
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    )}
                    aria-label="Close menu"
                >
                    <X size={24} />
                </motion.button>

                {/* Drag Indicator */}
                <motion.div
                    style={{ opacity: dragOpacity }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none"
                >
                    <ChevronLeft
                        size={32}
                        className={isDark ? 'text-slate-600' : 'text-slate-400'}
                        style={{ transform: 'rotate(180deg)' }}
                    />
                </motion.div>

                <div className="p-8 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                        className="mb-12"
                    >
                        <h2
                            className={cn(
                                "text-3xl font-bold font-serif",
                                isDark ? 'text-white' : 'text-slate-900'
                            )}
                        >
                            Navigation
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                            className={cn(
                                "h-1 mt-2 rounded",
                                isDark ? 'bg-brand-primary' : 'bg-brand-primary'
                            )}
                        />
                    </motion.div>

                    <ul className="space-y-4">
                        {menuItems.map((item, i) => (
                            <motion.li
                                key={item.label}
                                custom={i}
                                variants={itemVariants}
                                initial="closed"
                                animate={isOpen ? 'open' : 'closed'}
                            >
                                <Link
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center space-x-4 p-4 rounded-lg transition-all group",
                                        isDark
                                            ? 'hover:bg-slate-700 text-slate-200'
                                            : 'hover:bg-slate-100 text-slate-800'
                                    )}
                                >
                                    {item.icon && (
                                        <motion.div
                                            whileHover={{ scale: 1.15, rotate: 8 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={cn(
                                                "p-2 rounded-lg transition-all duration-300",
                                                isDark ? 'bg-slate-700' : 'bg-slate-200',
                                                'group-hover:bg-brand-primary group-hover:text-white'
                                            )}
                                        >
                                            <item.icon size={24} />
                                        </motion.div>
                                    )}
                                    <span className="text-lg font-medium">{item.label}</span>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className={cn(
                            "absolute bottom-8 left-8 right-8 p-4 rounded-lg",
                            isDark ? 'bg-slate-700' : 'bg-slate-100'
                        )}
                    >
                        <p
                            className={cn(
                                "text-sm",
                                isDark ? 'text-slate-300' : 'text-slate-600'
                            )}
                        >
                            💡 Drag right to close
                        </p>
                    </motion.div>
                </div>
            </motion.nav>
        </>
    );
}
