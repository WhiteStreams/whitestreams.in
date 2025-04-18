import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = 'service_2qqvxzg';
const TEMPLATE_ID = 'template_8kj5w4j';
const PUBLIC_KEY = 'hPDVLRPVA5H_Ey_Kx';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

interface EmailParams {
  from_name: string;
  from_email: string;
  phone?: string;
  interest?: string;
  message: string;
  listing_title?: string;
}

export const sendEmail = async (params: Omit<EmailParams, 'to_email'>) => {
  try {
    const templateParams = {
      ...params,
      to_email: 'ceo.whitestreams@gmail.com', // Default recipient
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw error;
  }
};