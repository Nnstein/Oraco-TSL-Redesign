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
  { id: 'ui', name: 'University of Ibadan', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/89/University_of_Ibadan_logo.png/200px-University_of_Ibadan_logo.png' },
  { id: 'unilag', name: 'University of Lagos', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/University_of_Lagos_logo.png/200px-University_of_Lagos_logo.png' },
  { id: 'covenant', name: 'Covenant University', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Covenant_University_logo.png/200px-Covenant_University_logo.png' },
  { id: 'unn', name: 'University of Nigeria, Nsukka', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/University_of_Nigeria_Nsukka_Logo.png/200px-University_of_Nigeria_Nsukka_Logo.png' },
  { id: 'abu', name: 'Ahmadu Bello University', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Ahmadu_Bello_University_logo.png/200px-Ahmadu_Bello_University_logo.png' },
  { id: 'buk', name: 'Bayero University Kano', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Bayero_University_Kano_logo.png/200px-Bayero_University_Kano_logo.png' },
  { id: 'futa', name: 'FUTA', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Futa_logo.png' },
];

export const SCHOOLS: Partner[] = [
  { id: 'loyola', name: 'Loyola Jesuit College', logo: 'https://ui-avatars.com/api/?name=Loyola+Jesuit&background=0d9488&color=fff&size=128&bold=true' },
  { id: 'grange', name: 'Grange School', logo: 'https://ui-avatars.com/api/?name=Grange+School&background=115e59&color=fff&size=128&bold=true' },
  { id: 'daywaterman', name: 'Day Waterman College', logo: 'https://ui-avatars.com/api/?name=Day+Waterman&background=0f172a&color=fff&size=128&bold=true' },
  { id: 'ambassadors', name: 'The Ambassadors College', logo: 'https://ui-avatars.com/api/?name=Ambassadors+College&background=0d9488&color=fff&size=128&bold=true' },
  { id: 'atlantic', name: 'Atlantic Hall', logo: 'https://ui-avatars.com/api/?name=Atlantic+Hall&background=115e59&color=fff&size=128&bold=true' },
  { id: 'chrisland', name: 'Chrisland High School', logo: 'https://ui-avatars.com/api/?name=Chrisland&background=0f172a&color=fff&size=128&bold=true' },
  { id: 'greensprings', name: 'Greensprings School', logo: 'https://ui-avatars.com/api/?name=Greensprings&background=0d9488&color=fff&size=128&bold=true' },
  { id: 'corona', name: 'Corona Secondary School', logo: 'https://ui-avatars.com/api/?name=Corona&background=115e59&color=fff&size=128&bold=true' },
];

export const RESEARCH_INSTITUTIONS: Partner[] = [
  { id: 'iita', name: 'IITA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/CGIAR_System_Organization_logo.svg/1200px-CGIAR_System_Organization_logo.svg.png' },
  { id: 'uch', name: 'UCH Ibadan', logo: 'https://ui-avatars.com/api/?name=UCH+Ibadan&background=0f172a&color=fff&size=128&bold=true' },
  { id: 'nitr', name: 'NITR', logo: 'https://ui-avatars.com/api/?name=NITR&background=0d9488&color=fff&size=128&bold=true' },
  { id: 'niomr', name: 'NIOMR', logo: 'https://ui-avatars.com/api/?name=NIOMR&background=115e59&color=fff&size=128&bold=true' },
  { id: 'niprd', name: 'NIPRD', logo: 'https://ui-avatars.com/api/?name=NIPRD&background=0f172a&color=fff&size=128&bold=true' },
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