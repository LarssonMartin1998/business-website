import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { raw, text } from 'design-system/colors';
import { sendContactMail, SendContactMailRequestBody } from 'api/contact';
import { isStringValidEmail } from 'utils/helpers';

import Header from 'components/Header';
import Main from 'components/Main';
import Footer from 'components/Footer';
import Services from 'components/Services';
import MainHeading from 'components/MainHeading';
import Banner from 'components/Banner';
import { Field, TextAreaField } from 'components/forms/FormFields';
import { ButtonAccent } from 'components/Button';

const constraints = {
  name: { min: 2, max: 128 },
  company: { min: 0, max: 128 },
  message: { min: 1, max: 8000 }
} as const;

function validateAll(data: SendContactMailRequestBody) {
  const nextErrors: Partial<Record<keyof SendContactMailRequestBody, string>> = {};
  (Object.keys(data) as (keyof SendContactMailRequestBody)[]).forEach(k => {
    const err = validateField(k, data[k]);
    if (err) {
      nextErrors[k] = err;
    }
  });

  return nextErrors;
}

function validateField(name: keyof SendContactMailRequestBody, rawValue: string): string | undefined {
  const hasNewline = (v: string) => /[\r\n]/.test(v);
  const value = rawValue.trim();

  switch (name) {
    case 'name':
      if (hasNewline(value)) return 'Name contains invalid characters.';
      if (value.length < constraints.name.min) return `Name must be at least ${constraints.name.min} characters.`;
      if (value.length > constraints.name.max) return `Name cannot exceed ${constraints.name.max} characters.`;
      return;
    case 'email':
      if (value.length === 0) return 'Email is required.';
      if (!isStringValidEmail(value)) return 'Enter a valid email address.';
      return;
    case 'company':
      if (value.length === constraints.company.min) return;
      if (hasNewline(value)) return 'Company contains invalid characters.';
      if (value.length > constraints.company.max) return `Company cannot exceed ${constraints.company.max} characters.`;
      return;
    case 'message':
      if (value.length === 0) return 'Message is required.';
      if (value.length > 8000) return 'Message cannot exceed 8000 characters.';
      return;
    default:
      return;
  }
}

function ContactForm() {
  const [errors, setErrors]
    = useState<Partial<Record<keyof SendContactMailRequestBody, string>>>({});
  const [formData, setFormData] = useState<SendContactMailRequestBody>({
    name: '', email: '', company: '', message: ''
  });
  const [submissionState, setSubmissionState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (submissionState === 'success') {
      const t = setTimeout(() => setSubmissionState('idle'), 5000);
      return () => clearTimeout(t);
    }
  }, [submissionState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('idle'); // reset any prior banner while validating

    const trimmed: SendContactMailRequestBody = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      message: formData.message.trim()
    };
    setFormData(trimmed);

    const nextErrors = validateAll(trimmed);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmissionState('error');
      return;
    }

    setSubmissionState('sending');
    try {
      const result = await sendContactMail(trimmed);
      if (result.state === 'success') {
        setSubmissionState('success');
        // reset form
        setFormData({ name: '', email: '', company: '', message: '' });
        setErrors({});
      } else {
        setSubmissionState('error');
      }
    } catch {
      setSubmissionState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof SendContactMailRequestBody;
    let nextValue = value;

    if (key === 'name' && nextValue.length > constraints.name.max) nextValue = nextValue.slice(0, constraints.name.max);
    if (key === 'company' && nextValue.length > constraints.company.max) nextValue = nextValue.slice(0, constraints.company.max);
    if (key === 'message' && nextValue.length > constraints.message.max) nextValue = nextValue.slice(0, constraints.message.max);

    setFormData(prev => ({ ...prev, [key]: nextValue }));
    setErrors(prev => {
      const clone = { ...prev };
      const err = validateField(key, nextValue);
      if (err) clone[key] = err; else delete clone[key];
      return clone;
    });
  };

  const fields = [
    { label: 'Name *', type: 'text', name: 'name' as keyof SendContactMailRequestBody, placeholder: 'Your full name', required: true },
    { label: 'Email *', type: 'email', name: 'email' as keyof SendContactMailRequestBody, placeholder: 'your.email@company.com', required: true },
    { label: 'Company/Organization', type: 'text', name: 'company' as keyof SendContactMailRequestBody, placeholder: 'Your company name (optional)', required: false }
  ] as const;

  let iter = 0;
  const nextField = () => {
    const field = fields[iter++];
    return (
      <div key={field.name} className='flex flex-col'>
        <Field
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required}
          error={errors[field.name]}
        />
      </div>
    );
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
        {submissionState === 'success' && (
          <Banner state='success'>
            <span className='font-semibold'>Success:</span>
            <span>Message sent. I will get back to you soon.</span>
          </Banner>
        )}
        {submissionState === 'error' && (
          <Banner state='error'>
            <span className='font-semibold'>Error:</span>
            <span>There was a problem. Please review the fields and try again.</span>
          </Banner>
        )}
        {submissionState === 'sending' && (
          <Banner state='sending'>
            <span className='font-semibold'>Sending:</span>
            <span>Submitting your message...</span>
          </Banner>
        )}

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
          error={errors.message}
        />

        <ButtonAccent
          aria-label='Submit the contact form and I will get back to you'
          type='submit'
          className='w-full h-fit py-3 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={submissionState === 'sending'}
        >
          {submissionState === 'sending' ? 'Sending...' : "Let’s Talk"}
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
