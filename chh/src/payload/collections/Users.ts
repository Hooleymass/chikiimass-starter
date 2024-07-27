import type { CollectionConfig } from 'payload';

const rootUrl = process.env.PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  auth: {
    useAPIKey: true,
    verify: true
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  /*auth: {
    useAPIKey: true,
    verify: {
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/verify?token=${token}`;
        return `
          <p>Welcome</p>
          <p>Verify your email by clicking <a href="${url}">here</a>.</p>
        `;
      },
    },
    forgotPassword: {
      generateEmailHTML: ({ token }) => {
        const url = `${rootUrl}/auth/reset?token=${token}`;
        return `
          <p>Reset your password by clicking <a href="${url}">here</a>.</p>
        `;
      },
    },
  },*/
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Regular',
          value: 'regular'
        },
      ],
      required: true,
      defaultValue: 'user',
    },
  ],
};
