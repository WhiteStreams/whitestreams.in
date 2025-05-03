import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';

// EmailJS configuration
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS with init options
emailjs.init({
  publicKey: PUBLIC_KEY,
  limitRate: true
});

interface EmailParams {
  from_name: string;
  from_email: string;
  phone: string;
  interest: string;
  message: string;
  submission_id?: string;
}

export const sendEmail = async (params: EmailParams) => {
  const submission_id = params.submission_id || uuidv4();
  
  try {
    // Store in database first
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        submission_id,
        first_name: params.from_name.split(' ')[0],
        last_name: params.from_name.split(' ').slice(1).join(' '),
        email: params.from_email,
        phone: params.phone,
        interest: params.interest,
        message: params.message,
        metadata: {
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }
      });

    if (dbError) throw dbError;

    // Send email to admin using updated EmailJS send method
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: 'ceo.whitestreams@gmail.com',
        from_name: params.from_name,
        from_email: params.from_email,
        phone: params.phone || 'Not provided',
        interest: params.interest,
        message: params.message,
        submission_id
      }
    );

    // Update database with email status
    await supabase
      .from('contact_submissions')
      .update({
        status: 'processed',
        email_sent: true,
        confirmation_sent: true
      })
      .eq('submission_id', submission_id);

    return {
      success: true,
      submission_id
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Update database with error status
    await supabase
      .from('contact_submissions')
      .update({
        status: 'error',
        metadata: {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      })
      .eq('submission_id', submission_id);

    throw error;
  }
};