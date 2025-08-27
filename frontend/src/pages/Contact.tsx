import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';
import Services from 'components/Services';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { bg, text } from 'design-system/colors';
import MainHeading from 'components/MainHeading';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', company: '', projectType: '', timeline: '', budget: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - integrate with your preferred service
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = twMerge(
    'w-full p-3 border rounded-lg',
    'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
    'transition-colors duration-200'
  );

  return (
    <div className='py-6 max-w-2xl mx-auto'>
      <div className='text-center mb-8'>
        <p className={twMerge(text('default'), 'text-sm')}>
          I typically respond within 24 hours. Feel free to reach out at{' '}
          <a href="mailto:larssonmartin1998@gmail.com" className="text-blue-600 hover:underline font-semibold">
            larssonmartin1998@gmail.com
          </a>{' '}
          or use the form below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="your.email@company.com"
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Company/Organization</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={inputClass}
            placeholder="Your company name (optional)"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>What kind of help do you need?</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select what applies</option>
              <option value="technical-consulting">Technical Consulting</option>
              <option value="code-review">Code Review & Architecture</option>
              <option value="performance-optimization">Performance Analysis</option>
              <option value="development-support">Development Support</option>
              <option value="technology-decisions">Technology Stack Guidance</option>
              <option value="team-mentoring">Team Mentoring</option>
              <option value="just-exploring">Just exploring options</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>When do you need help?</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select timeframe</option>
              <option value="asap">As soon as possible</option>
              <option value="few-weeks">In a few weeks</option>
              <option value="planning-ahead">Planning ahead</option>
              <option value="ongoing">Ongoing basis</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Tell me about your challenge *</label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={inputClass}
            placeholder="What technical challenges are you facing? What kind of guidance are you looking for? Feel free to share details about your project, current setup, team size, or any specific pain points..."
          />
        </div>

        <button
          type="submit"
          className={twMerge(
            bg('accent'), text('accent'),
            'w-full py-3 px-6 rounded-lg font-semibold',
            'hover:opacity-90 transition-opacity duration-200',
            'focus:ring-4 focus:ring-blue-200'
          )}
        >
          Let's Talk
        </button>
      </form>

      <div className='mt-12 pt-8 border-t border-gray-200'>
        <div className='text-center text-sm space-y-2'>
          <p className={twMerge(text('default'))}>
            🕒 Usually responds within 24 hours
          </p>
          <p className={twMerge(text('default'))}>
            💬 Always happy to discuss your project, no commitment needed
          </p>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const headline = "Need Technical Expertise? Let's Discuss Your Project";
  return (
    <>
      <Header />
      <Main className='flex flex-col items-center p-2.5'>
        <Services className='mt-4'
          highlight='default'
          title={
            <MainHeading className='self-start'>{headline}</MainHeading>
          }
          cta={
            <ContactForm />
          } />
      </Main >
      <Footer />
    </>
  );
}

export default Contact;
