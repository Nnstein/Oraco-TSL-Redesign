export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};

export const validatePhone = (phone: string): boolean => {
    // Optional phone validation - accepts various formats
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length === 0 || phoneRegex.test(phone);
};

export interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
}

export const validateContactForm = (formData: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}): FormErrors => {
    const errors: FormErrors = {};

    if (!validateRequired(formData.firstName)) {
        errors.firstName = "First name is required";
    }

    if (!validateRequired(formData.lastName)) {
        errors.lastName = "Last name is required";
    }

    if (!validateRequired(formData.email)) {
        errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!validateRequired(formData.message)) {
        errors.message = "Message is required";
    }

    return errors;
};
