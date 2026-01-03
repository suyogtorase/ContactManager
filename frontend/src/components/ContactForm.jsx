import { useState } from 'react';
import axios from 'axios';
import { User, Mail, Phone, AlertCircle, CheckCircle, XCircle, Loader2, Check } from 'lucide-react';

const ContactForm = ({ onContactAdded }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneDigits = phone.replace(/\D/g, '');
    return phoneDigits.length === 10;
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone is required';
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid 10-digit phone number';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    
    setContact({
      ...contact,
      [name]: value
    });

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (submitMessage) {
      setSubmitMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(contact).forEach(key => {
      if (key !== 'message') {
        const error = validateField(key, contact[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const phoneDigits = contact.phone.replace(/\D/g, '');
      
      const { data } = await axios.post('http://localhost:5000/api/submit-contact', {
        name: contact.name.trim(),
        email: contact.email.trim(),
        phone: phoneDigits,
        message: contact.message.trim(),
      });

      if (data.success) {
        setSubmitMessage('Contact submitted successfully!');
        setContact({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setErrors({});
        
        if (onContactAdded) {
          onContactAdded();
        }
      } else {
        setSubmitMessage(data.error || 'Failed to submit contact');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setSubmitMessage(error.response.data.error || 'Failed to submit contact');
      } else {
        setSubmitMessage('Network error. Please try again.');
      }
      console.error('Error submitting contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return contact.name.trim() !== '' &&
           contact.email.trim() !== '' &&
           validateEmail(contact.email) &&
           validatePhone(contact.phone);
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-700">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Add New Contact</h2>
        <p className="text-gray-400">Fill in the details to add a new contact</p>
      </div>
      
      <form onSubmit={onSubmitHandler} className="space-y-6">
        
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={onChangeHandler}
              className={`w-full pl-12 pr-4 py-3.5 bg-gray-700 text-white border-2 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-500 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                  : 'border-gray-600 focus:ring-blue-500/50 focus:border-blue-500'
              }`}
              placeholder="Suyog Torase"
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
            Email Address <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={onChangeHandler}
              className={`w-full pl-12 pr-4 py-3.5 bg-gray-700 text-white border-2 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-500 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                  : 'border-gray-600 focus:ring-blue-500/50 focus:border-blue-500'
              }`}
              placeholder="suyog@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contact.phone}
              onChange={onChangeHandler}
              className={`w-full pl-12 pr-4 py-3.5 bg-gray-700 text-white border-2 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-500 ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                  : 'border-gray-600 focus:ring-blue-500/50 focus:border-blue-500'
              }`}
              placeholder="9874563210"
              maxLength="15"
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.phone}
            </p>
          )}
        </div>
        
        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
            Message <span className="text-gray-500 text-xs font-normal">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={contact.message}
              onChange={onChangeHandler}
              rows="4"
              className="w-full px-4 py-3.5 bg-gray-700 text-white border-2 border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder-gray-500"
              placeholder="Add any additional notes or message..."
            />
          </div>
        </div>

        {submitMessage && (
          <div className={`p-4 rounded-xl flex items-start gap-3 ${
            submitMessage.includes('successfully')
              ? 'bg-green-900/30 border border-green-500/50'
              : 'bg-red-900/30 border border-red-500/50'
          }`}>
            {submitMessage.includes('successfully') ? (
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p className={`text-sm font-medium ${
              submitMessage.includes('successfully') ? 'text-green-300' : 'text-red-300'
            }`}>
              {submitMessage}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            isFormValid() && !isSubmitting
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl shadow-blue-500/50 transform hover:-translate-y-0.5'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Submitting...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Submit Contact
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;