import { useState, } from 'react';
import { twMerge } from 'tailwind-merge';

import { raw, text } from 'design-system/colors';

import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';
import Services from 'components/Services';
import MainHeading from 'components/MainHeading';
import { Field, TextAreaField } from 'components/forms/FormFields';
import { ButtonAccent } from 'components/Button';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', company: '', message: ''
  });

  const fields = [
    { label: 'Name *', type: 'text', name: 'name' as keyof ContactFormData, placeholder: 'Your full name', required: true },
    { label: 'Email *', type: 'email', name: 'email' as keyof ContactFormData, placeholder: 'your.email@company.com', required: true },
    { label: 'Company/Organization', type: 'text', name: 'company' as keyof ContactFormData, placeholder: 'Your company name (optional)', required: false }
  ] as const;

  let iter = 0;
  const nextField = () => {
    const field = fields[iter];
    iter++;
    return (
      <Field
        label={field.label}
        type={field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        placeholder={field.placeholder}
        required={field.required}
      />
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div id='contactForm' className='py-6'>
      <div className='text-center mb-8'>
        <p className={twMerge(text('default'), 'text-sm')}>
          Feel free to reach out at{' '}
          <a href='mailto:hello@erikmartinlarsson.dev' className={twMerge(text(raw.emberBarkLight), 'hover:underline font-semibold')}>
            hello@erikmartinlarsson.dev
          </a>{' '}
          or use the form below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6 max-[520px]:px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {nextField()}
          {nextField()}
        </div>

        {nextField()}

        <TextAreaField
          label='Tell me about your project *'
          name='message'
          value={formData.message}
          onChange={handleChange}
          placeholder='What challenges are you facing? Feel free to share details about your project, current setup, team size, etc ...'
          required
          rows={5}
        />

        <ButtonAccent aria-label='Submit the contact form and I will get back to you' type='submit' className='w-full h-fit py-3'>
          Let&apos;s Talk
        </ButtonAccent>
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
        <Services className='max-w-4xl mt-4'
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
