// Email and Contact configuration
export const EMAIL_CONFIG = {
  // Recipient email address where all portfolio messages are sent
  recipientEmail: 'zeeshan.abbas.dev@gmail.com',

  // Direct FormSubmit backend endpoint (No drafts, sends directly in background)
  formSubmitEndpoint: 'https://formsubmit.co/ajax/zeeshan.abbas.dev@gmail.com',

  // Optional Web3Forms Access Key if desired
  web3FormsAccessKey:
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',

  // Email subject prefix
  subjectPrefix: 'Portfolio Inquiry from',
};
