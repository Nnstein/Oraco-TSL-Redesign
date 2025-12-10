import React, { useState, FormEvent } from 'react';
import { Target, MapPin, Users, ChevronRight, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import { Toast } from '../components/ui/toast';
import { validateContactForm, FormErrors } from '../utils/validation';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    service: string;
    message: string;
}

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        service: 'Edutech Solutions',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
        message: '',
        type: 'success',
        isVisible: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateContactForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setToast({
                message: 'Please fill in all required fields correctly.',
                type: 'error',
                isVisible: true,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // EmailJS configuration from environment variables
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // Check if EmailJS is configured
            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS is not configured. Please add your credentials to .env.local file.');
            }

            // Send email using EmailJS
            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    service_interest: formData.service,
                    message: formData.message,
                    to_name: 'Oraco TSL Africa',
                },
                publicKey
            );

            // Show success message
            setToast({
                message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
                type: 'success',
                isVisible: true,
            });

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                service: 'Edutech Solutions',
                message: '',
            });
            setErrors({});
        } catch (error) {
            console.error('EmailJS Error:', error);
            setToast({
                message: error instanceof Error ? error.message : 'Failed to send message. Please try again or contact us directly at info@oracoafrica.com',
                type: 'error',
                isVisible: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pb-24 pt-24 md:pt-32 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-start">
                    <div className="md:sticky md:top-32">
                        <ScrollReveal>
                            <span className="text-brand-primary font-bold tracking-widest uppercase text-xs sm:text-sm md:text-base mb-2 md:mb-4 block">Get in Touch</span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-dark dark:text-white mb-4 md:mb-8 transition-colors">Let's build something<br />extraordinary.</h1>
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 mb-6 md:mb-12 font-light transition-colors">
                                Have a project in mind? We'd love to hear about it. Fill out the form, and we'll get back to you within 24 hours.
                            </p>
                        </ScrollReveal>

                        <div className="space-y-4 md:space-y-8">
                            <ScrollReveal delay={200}>
                                <div className="flex gap-4 md:gap-6 items-center p-4 md:p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-light dark:bg-slate-800 text-brand-primary flex items-center justify-center flex-shrink-0">
                                        <Target size={20} className="md:w-6 md:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-dark dark:text-white text-sm md:text-lg transition-colors">Lagos Office</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-base transition-colors">1st Floor, 21 Norman Williams Street,<br />off Awolowo Road, Ikoyi, Lagos</p>
                                        <p className="text-brand-primary text-xs md:text-sm font-semibold mt-1">Tel: +234-818-153-5455</p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={300}>
                                <div className="flex gap-4 md:gap-6 items-center p-4 md:p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-light dark:bg-slate-800 text-brand-primary flex items-center justify-center flex-shrink-0">
                                        <MapPin size={20} className="md:w-6 md:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-dark dark:text-white text-sm md:text-lg transition-colors">Abuja Office</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-base transition-colors">139B Adetokunbo Ademola Crescent,<br />Wuse II, Abuja, FCT</p>
                                        <p className="text-brand-primary text-xs md:text-sm font-semibold mt-1">Tel: +234 (9) 8725121</p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={400}>
                                <div className="flex gap-4 md:gap-6 items-center p-4 md:p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-light dark:bg-slate-800 text-brand-primary flex items-center justify-center flex-shrink-0">
                                        <Users size={20} className="md:w-6 md:h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-dark dark:text-white text-sm md:text-lg transition-colors">Email Us</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-base transition-colors">info@oracoafrica.com</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    <ScrollReveal delay={500}>
                        <div className="bg-white dark:bg-slate-950 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors mt-8 lg:mt-0">
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 ${errors.firstName ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary/20'
                                                } focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white text-sm md:text-base`}
                                            placeholder="Jane"
                                        />
                                        {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                                    </div>
                                    <div className="space-y-1.5 md:space-y-2">
                                        <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 ${errors.lastName ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary/20'
                                                } focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white text-sm md:text-base`}
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 ${errors.email ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary/20'
                                            } focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white text-sm md:text-base`}
                                        placeholder="jane@company.com"
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Service Interest</label>
                                    <div className="relative">
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all appearance-none dark:text-white text-sm md:text-base"
                                        >
                                            <option>Edutech Solutions</option>
                                            <option>System Integration</option>
                                            <option>Business Strategy</option>
                                            <option>Verification</option>
                                            <option>Other</option>
                                        </select>
                                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <label className="text-xs md:text-sm font-semibold text-brand-dark dark:text-slate-300">Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-4 py-3 md:py-4 rounded-xl bg-slate-50 dark:bg-slate-900 border-none focus:ring-2 ${errors.message ? 'ring-2 ring-red-500' : 'focus:ring-brand-primary/20'
                                            } focus:bg-white dark:focus:bg-slate-800 outline-none transition-all resize-none dark:text-white text-sm md:text-base`}
                                        placeholder="Tell us about your project..."
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 md:py-5 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </Button>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
