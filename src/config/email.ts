// Email and Contact configuration
export const EMAIL_CONFIG = {
  // Recipient email address where all portfolio messages are sent
  recipientEmail: 'zeeshan.abbas.dev@gmail.com',

  // WhatsApp Contact Information
  whatsappNumber: '+923014173009',
  whatsappDisplay: '+92 301 4173009',
  whatsappUrl: 'https://wa.me/923014173009?text=Hi%20Zeeshan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!',

  // Direct FormSubmit backend endpoint (No drafts, sends directly in background)
  formSubmitEndpoint: 'https://formsubmit.co/ajax/zeeshan.abbas.dev@gmail.com',

  // Optional Web3Forms Access Key if desired
  web3FormsAccessKey:
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',

  // Email subject prefix
  subjectPrefix: 'Portfolio Inquiry from',
};
