export default {
  type: 'object',
  properties: {
    companyName: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
  required: ['companyName', 'firstName', 'lastName'],
} as const;
