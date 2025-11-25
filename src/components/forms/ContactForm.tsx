import React from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import FormField from './FormField';
import useForm from '../../hooks/useForm';
import { validateEmail } from '../../utils/security';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  interest: string;
}

const ContactForm: React.FC = () => {
  const {
    values,
    errors,
    isSubmitting,
    setValue,
    handleSubmit
  } = useForm<ContactFormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      subject: '',
      message: '',
      interest: ''
    },
    validationSchema: {
      firstName: { required: true },
      lastName: { required: true },
      email: { 
        required: true,
        validate: (value: string) => validateEmail(value) ? null : 'Please enter a valid email address'
      },
      organization: { required: true },
      subject: { required: true },
      message: { 
        required: true,
        validate: (value: string) => value.length >= 10 ? null : 'Message must be at least 10 characters long'
      }
    },
    onSubmit: async (formData) => {
      // In a real app, this would send the form data to an API
      console.log('Contact form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and show success message
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        subject: '',
        message: '',
        interest: ''
      });
      
      // You could also use a toast notification here instead
      window.alert('Thank you for your message! We\'ll get back to you soon.');
    }
  });

  const interestOptions = [
    { value: '', label: 'Select an area of interest' },
    { value: 'governance', label: 'Cybersecurity Governance' },
    { value: 'framework-mapping', label: 'Framework Fusion Technology™' },
    { value: 'executive-intelligence', label: 'Executive Command Center' },
    { value: 'maturity-tracking', label: 'Maturity Acceleration' },
    { value: 'ermits-integration', label: 'ERMITS Ecosystem Integration' },
    { value: 'enterprise-solutions', label: 'Enterprise Solutions' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          name="firstName"
          label="First Name"
          type="text"
          value={values.firstName}
          onChange={(value) => setValue('firstName', value)}
          error={errors.firstName}
          placeholder="Your first name"
          required
        />
        
        <FormField
          name="lastName"
          label="Last Name"
          type="text"
          value={values.lastName}
          onChange={(value) => setValue('lastName', value)}
          error={errors.lastName}
          placeholder="Your last name"
          required
        />
      </div>
      
      <FormField
        name="email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={(value) => setValue('email', value)}
        error={errors.email}
        placeholder="you@example.com"
        required
      />
      
      <FormField
        name="organization"
        label="Organization"
        type="text"
        value={values.organization}
        onChange={(value) => setValue('organization', value)}
        error={errors.organization}
        placeholder="Your organization"
        required
      />
      
      <FormField
        name="interest"
        label="Area of Interest"
        type="select"
        value={values.interest}
        onChange={(value) => setValue('interest', value)}
        error={errors.interest}
        options={interestOptions}
      />
      
      <FormField
        name="subject"
        label="Subject"
        type="text"
        value={values.subject}
        onChange={(value) => setValue('subject', value)}
        error={errors.subject}
        placeholder="How can we help you?"
        required
      />
      
      <FormField
        name="message"
        label="Message"
        type="textarea"
        value={values.message}
        onChange={(value) => setValue('message', value)}
        error={errors.message}
        placeholder="Tell us about your cybersecurity governance needs..."
        required
        rows={6}
      />
      
      <div className="pt-4">
        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full"
          size="lg"
        >
          <Send className="h-5 w-5 mr-2" />
          Send Message
        </Button>
      </div>
    </motion.form>
  );
};

export default ContactForm;