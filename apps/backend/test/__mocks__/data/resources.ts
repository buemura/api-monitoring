const resources = [
  {
    id: '50453c17-2776-4c64-b5da-ea7f7d83dc91',
    name: 'User registration',
    description: null,
    url: 'http://localhost:3001/api/health',
    accessToken: null,
    checkFrequency: 20000,
    status: 'Down',
    lastCheck: new Date('2023-05-14T03:43:00.001Z'),
    createdAt: new Date('2023-05-13T23:09:02.000Z'),
    updatedAt: new Date('2023-05-14T03:43:00.000Z'),
  },
  {
    id: '967b7825-68d7-4643-a2fa-de98aea6c066',
    name: 'Product registration',
    description: null,
    url: 'http://localhost:3002/api/health',
    accessToken: null,
    checkFrequency: 30000,
    status: 'Down',
    lastCheck: new Date('2023-05-14T03:43:00.001Z'),
    createdAt: new Date('2023-05-13T23:09:02.000Z'),
    updatedAt: new Date('2023-05-14T03:43:00.000Z'),
  },
];

const expectedResource = [
  {
    id: '50453c17-2776-4c64-b5da-ea7f7d83dc91',
    name: 'User registration',
    description: null,
    url: 'http://localhost:3001/api/health',
    accessToken: null,
    checkFrequency: 20000,
    status: 'Down',
    lastCheck: new Date('2023-05-14T03:43:00.001Z'),
    createdAt: new Date('2023-05-13T23:09:02.000Z'),
    updatedAt: new Date('2023-05-14T03:43:00.000Z'),
  },
];

export const resourcesMock = {
  resources,
  expectedResource,
};
