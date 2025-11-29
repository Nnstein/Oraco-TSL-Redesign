import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X, Twitter, Linkedin, Facebook, Mail, MapPin, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import ChatWidget from './ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

// Custom Logo Component to match the Oraco Africa Brand
const Logo: React.FC<{ variant?: 'default' | 'footer' }> = ({ variant = 'default' }) => {
  const isFooter = variant === 'footer';
  
  return (
    <div className="flex items-center gap-2 md:gap-3 select-none">
      {/* Main Text Part */}
      <div className="relative flex items-baseline">
         <span className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter ${isFooter ? 'text-lime-400' : 'text-lime-500 dark:text-lime-400'} font-sans lowercase leading-none`}>
           ôraco
         </span>
         <span className={`absolute -top-1 -right-2 text-[8px] md:text-[10px] font-bold ${isFooter ? 'text-lime-400' : 'text-lime-500 dark:text-lime-400'}`}>®</span>
      </div>
      
      {/* Stacked Tagline Part */}
      <div className="flex flex-col justify-center leading-[0.8] text-[0.45rem] md:text-[0.6rem] font-bold tracking-widest uppercase font-sans ml-1">
        <span className={isFooter ? 'text-sky-400' : 'text-sky-500 dark:text-sky-400'}>Platforms</span>
        <span className={isFooter ? 'text-pink-400' : 'text-pink-600 dark:text-pink-400'}>Solutions</span>
        <span className={isFooter ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}>Technology</span>
      </div>
    </div>
  );
};

const ThemeToggle: React.FC<{ isDark: boolean; toggle: () => void; className?: string }> = ({ isDark, toggle, className = "" }) => (
  <div 
    onClick={toggle}
    className={`w-10 h-6 md:w-14 md:h-8 rounded-full p-0.5 md:p-1 cursor-pointer transition-colors duration-300 relative ${isDark ? 'bg-slate-700' : 'bg-slate-200'} ${className}`}
    aria-label="Toggle Theme"
  >
    <div 
      className={`w-5 h-5 md:w-6 md:h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-4 md:translate-x-6' : 'translate-x-0'}`}
    >
      {isDark ? <Moon size={12} className="md:w-[14px] md:h-[14px] text-slate-700" /> : <Sun size={12} className="md:w-[14px] md:h-[14px] text-amber-500" />}
    </div>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, navItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Theme
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden selection:bg-brand-primary/20 selection:text-brand-dark dark:selection:text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'glass-nav py-2 md:py-3' : 'bg-transparent py-3 md:py-5'
        } ${isMobileMenuOpen ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800' : ''}`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <nav className="flex items-center gap-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 lg:px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'bg-brand-primary text-white shadow-md' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

             {/* Theme Toggle Switch */}
             <ThemeToggle isDark={isDark} toggle={toggleTheme} />

            <Link to="/contact">
              <Button size="sm" variant={isScrolled ? "primary" : "secondary"} className="md:px-4 lg:px-5 md:text-xs lg:text-sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden relative z-50">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} className="scale-75 origin-right" />
            <button
              className="p-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 pt-24 px-6 transition-all duration-300 ease-in-out md:hidden flex flex-col items-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <nav className="flex flex-col gap-4 text-center items-center w-full max-w-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-lg font-serif font-medium text-brand-dark dark:text-white hover:text-brand-primary transition-colors py-3 w-full border-b border-slate-100 dark:border-slate-800/50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 w-full">
              <Link to="/contact">
                <Button className="w-full h-12 text-base" size="md">Let's Talk</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isMobileMenuOpen ? 'blur-sm brightness-75 scale-95' : ''}`}>
        {children}
      </main>

      {/* Interactive Chat */}
      <ChatWidget />

      {/* Footer */}
      <footer className="bg-brand-dark text-slate-300 py-10 md:py-20 rounded-t-[2rem] md:rounded-t-[3rem] mt-12 dark:border-t dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 border-b border-slate-800 pb-10 md:pb-16">
            <div className="md:col-span-5 space-y-6">
              <div className="mb-4 md:mb-6">
                <Logo variant="footer" />
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md text-xs md:text-base">
                Oraco TSL is a technology solutions provider, with core focus on Educational Technology, 
                Credentials Verification and innovative solutions that guarantee simplicity and ease of processes.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-slate-400"><Twitter size={16} className="md:w-[18px] md:h-[18px]" /></a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-slate-400"><Linkedin size={16} className="md:w-[18px] md:h-[18px]" /></a>
                <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all text-slate-400"><Facebook size={16} className="md:w-[18px] md:h-[18px]" /></a>
              </div>
            </div>

            {/* Mobile: 2-column grid for links to save vertical space */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Services</h4>
                <ul className="space-y-2 md:space-y-4 text-xs md:text-sm">
                  <li><Link to="/services" className="hover:text-brand-primary transition-colors">Edutech</Link></li>
                  <li><Link to="/services" className="hover:text-brand-primary transition-colors">Digitization</Link></li>
                  <li><Link to="/services" className="hover:text-brand-primary transition-colors">Verification</Link></li>
                  <li><Link to="/services" className="hover:text-brand-primary transition-colors">Analytics</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Company</h4>
                <ul className="space-y-2 md:space-y-4 text-xs md:text-sm">
                  <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
                  <li><Link to="/insights" className="hover:text-brand-primary transition-colors">Insights</Link></li>
                  <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Careers</Link></li>
                  <li><Link to="/contact" className="hover:text-brand-primary transition-colors">News</Link></li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-3">
               <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Get in Touch</h4>
               <div className="space-y-4">
                  <div className="flex items-start gap-3 text-xs md:text-sm text-slate-400">
                    <MapPin size={16} className="mt-1 text-brand-primary flex-shrink-0" />
                    <span>1st Floor, 21 Norman Williams St,<br/>Ikoyi, Lagos</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs md:text-sm text-slate-400">
                    <Mail size={16} className="text-brand-primary flex-shrink-0" />
                    <a href="mailto:info@oracoafrica.com" className="hover:text-brand-primary">info@oracoafrica.com</a>
                  </div>
               </div>
            </div>
          </div>
          <div className="pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-slate-500">
            <div className="text-center md:text-left">© {new Date().getFullYear()} Oraco Technology Solutions Limited. All Rights Reserved.</div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-brand-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;