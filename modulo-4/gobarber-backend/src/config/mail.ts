interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
  region: string;
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'supreme@proofapp.dev',
      name: 'Genivaldo',
    },
  },

  region: 'us-east-1',
} as IMailConfig;
