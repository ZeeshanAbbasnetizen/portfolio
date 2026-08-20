// Email and Contact configuration
export const EMAIL_CONFIG = {
  // Recipient email address
  recipientEmail: 'zeeshan.abbas.dev@gmail.com',

  // Web3Forms Access Key:
  // 1. Visit https://web3forms.com
  // 2. Enter your email (zeeshan.abbas.dev@gmail.com)
  // 3. Paste the Access Key you receive here or in .env as VITE_WEB3FORMS_ACCESS_KEY
  web3FormsAccessKey:
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',

  // Email subject prefix
  subjectPrefix: 'Portfolio Inquiry from',
};
