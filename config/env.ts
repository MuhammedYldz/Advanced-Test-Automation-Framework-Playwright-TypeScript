import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.automationexercise.com',
  username: process.env.USERNAME || 'testuser@example.com',
  password: process.env.PASSWORD || 'password123',
  env: process.env.ENV || 'staging',
};
