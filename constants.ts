import { Lightbulb, Code, BarChart, Smartphone, Globe, ShieldCheck, GraduationCap, FileCheck, Layers, BookOpen } from 'lucide-react';
import { NavItem, Service, Testimonial, Stat, Partner, HeroSlide } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
];

export const UNIVERSITIES: Partner[] = [
  { id: 'ui', name: 'University of Ibadan', logo: '/logos/university of ibadan logo png.png' },
  { id: 'unilag', name: 'University of Lagos', logo: '/logos/University of Lagos.png' },
  { id: 'covenant', name: 'Covenant University', logo: '/logos/Covenant University.png' },
  { id: 'unn', name: 'University of Nigeria, Nsukka', logo: '/logos/University of Nigeria, Nsukka.png' },
  { id: 'abu', name: 'Ahmadu Bello University', logo: '/logos/Ahmadu Bello University.png' },
  { id: 'buk', name: 'Bayero University Kano', logo: '/logos/Bayero University Kano.jpg' },
  { id: 'futa', name: 'FUTA', logo: '/logos/FUTA (Federal University of Technology, Akure).jpeg' },
];

export const SCHOOLS: Partner[] = [
  { id: 'loyola', name: 'Loyola Jesuit College', logo: '/logos/Loyola Jesuit College.png' },
  { id: 'grange', name: 'Grange School', logo: '/logos/Grange School.jpeg' },
  { id: 'daywaterman', name: 'Day Waterman College', logo: '/logos/Day Waterman College.png' },
  { id: 'ambassadors', name: 'The Ambassadors College', logo: '/logos/The Ambassadors College.jpeg' },
  { id: 'atlantic', name: 'Atlantic Hall', logo: '/logos/Atlantic Hall.jpeg' },
  { id: 'chrisland', name: 'Chrisland High School', logo: '/logos/Chrisland High School.jpeg' },
  { id: 'greensprings', name: 'Greensprings School', logo: '/logos/Greensprings School.png' },
  { id: 'corona', name: 'Corona Secondary School', logo: '/logos/Corona Secondary School.png' },
];

export const RESEARCH_INSTITUTIONS: Partner[] = [
  { id: 'iita', name: 'IITA', logo: '/logos/IITA (International Institute of Tropical Agriculture).jpg' },
  { id: 'uch', name: 'UCH Ibadan', logo: '/logos/UCH Ibadan (University College Hospital).jpeg' },
  { id: 'nitr', name: 'NITR', logo: '/logos/NITR (Nigerian Institute of Trypanosomiasis Research).png' },
  { id: 'niomr', name: 'NIOMR', logo: '/logos/NIOMR (Nigerian Institute for Oceanography and Marine Research).png' },
  { id: 'niprd', name: 'NIPRD', logo: '/logos/NIPRD (National Institute for Pharmaceutical Research and Development).png' },
];

export const PARTNERS: Partner[] = [
  {
    id: 'turnitin',
    name: 'Turnitin',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Turnitin_logo.svg/2560px-Turnitin_logo.svg.png',
    isOfficial: true,
  },
  {
    id: 'gradescope',
    name: 'Gradescope',
    logo: 'https://www.gradescope.com/assets/gradescope_logo_color-03be81a8b329402280d0d6118d533116.svg',
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'breakthrough',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    title: 'Breakthrough Thinking',
    subtitle: 'Oraco TSL Africa'
  },
  {
    id: 'turnitin-partner',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
    title: 'Academic Integrity',
    subtitle: 'Official Turnitin Partner'
  },
  {
    id: 'innovation',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
    title: 'EdTech Innovation',
    subtitle: 'Building the classrooms of tomorrow'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'edutech',
    title: 'Educational Technology',
    description: 'Advisory, LMS deployments, IT outsourcing, and infrastructure solutions for modern learning environments.',
    icon: GraduationCap,
  },
  {
    id: 'systems-integration',
    title: 'Systems Integration',
    description: 'Planning, interface design, middleware, and application development to unify your business processes.',
    icon: Layers,
  },
  {
    id: 'business-strategy',
    title: 'Business Strategy',
    description: 'Project management, digital archiving, and process reengineering to drive operational efficiency.',
    icon: BarChart,
  },
  {
    id: 'e-verification',
    title: 'Credentials Verification',
    description: 'Blockchain-based document signing, certification, and verification innovative solutions.',
    icon: FileCheck,
  },
  {
    id: 'analytics',
    title: 'Data Analytics',
    description: 'Transforming raw educational and business data into clear, actionable insights.',
    icon: Lightbulb,
  },
  {
    id: 'incubation',
    title: 'Incubation',
    description: 'Fostering innovation and supporting early-stage ideas to market maturity.',
    icon: Globe,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Ndlovu',
    role: 'Vice Chancellor',
    company: 'Pan-African University',
    quote: 'Oraco TSL Africa has been instrumental in upholding academic integrity across our campus through their Turnitin deployment.',
    avatar: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: '2',
    name: 'David Omondi',
    role: 'Registrar',
    company: 'Capital City College',
    quote: 'Their e-Verification system transformed how we handle transcripts and certificates. Simple, secure, and fast.',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Director of IT',
    company: 'EduTech Global',
    quote: 'Breakthrough thinking isn\'t just a slogan for them. Oraco brought real innovation to our systems integration project.',
    avatar: 'https://picsum.photos/100/100?random=3',
  },
];

export const STATS: Stat[] = [
  { label: 'Partner Institutions', value: '50+' },
  { label: 'Students Impacted', value: '100k+' },
  { label: 'Integrity Score', value: '99%' },
  { label: 'Years Experience', value: '10+' },
];