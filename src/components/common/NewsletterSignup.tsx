import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNotify } from '../notifications/NotificationSystem';

interface NewsletterSignupProps {
  onDismiss?: () => void;
  compact?: boolean;
  className?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = memo(({ 
  onDismiss, 
  compact = false, 
  className = '' 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      notify.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubscribed(true);
      setEmail('');
      notify.success('Successfully subscribed to newsletter!');
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      notify.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-xl ${
        compact ? 'p-6' : 'p-8'
      } text-center relative ${className}`}
    >
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-blue-200 hover:text-white transition-colors"
          title="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Mail className={`${compact ? 'h-6 w-6' : 'h-8 w-8'} text-white`} />
          </div>
        </div>
        
        <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-white mb-2`}>
          Stay Updated
        </h3>
        <p className={`text-blue-100 ${compact ? 'mb-4 text-sm' : 'mb-6'}`}>
          Get the latest security insights, platform updates, and governance best practices delivered to your inbox.
        </p>
        
        {isSubscribed ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center text-white"
          >
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-medium">Thank you for subscribing!</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${compact ? 'text-sm' : ''}`}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-blue-200"
              required
            />
            <Button
              type="submit"
              loading={isSubmitting}
              className={`bg-white text-blue-600 hover:bg-blue-50 ${compact ? 'px-4' : 'px-6'}`}
            >
              <Send className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} mr-2`} />
              Subscribe
            </Button>
          </form>
        )}
        
        <p className={`text-xs text-blue-200 ${compact ? 'mt-3' : 'mt-4'}`}>
          No spam, unsubscribe at any time. Read our{' '}
          <a href="/privacy" className="underline hover:no-underline">
            privacy policy
          </a>
        </p>
      </div>
    </motion.div>
  );
});

NewsletterSignup.displayName = 'NewsletterSignup';

export default NewsletterSignup;