import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

type DurationString = `${number}h` | `${number}m` | `${number}s`;
interface Environment {
  // Server Configuration
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';

  // Database Configuration
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;

  // JWT Configuration
  JWT_SECRET: string;
  JWT_EXPIRES_IN: DurationString; // e.g., "7d", "1h", "30m"

  // Admin Authentication
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;

  // CORS Configuration
  ALLOWED_ORIGINS: string;

  // Email Configuration
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASSWORD: string;

  // IMAP Configuration
  IMAP_HOST: string;
  IMAP_PORT: number;
  IMAP_SECURE: boolean;
  IMAP_USER: string;
  IMAP_PASSWORD: string;
}

function validateEnv(): Environment {
  const env = process.env;
  const nodeEnv = env.NODE_ENV as Environment['NODE_ENV'] || 'development';

  // Helper function to get required env var
  const getRequired = (key: string): string => {
    const value = env[key];
    if (!value && value !== '') {
      throw new Error(`Environment variable ${key} is required`);
    }
    return value;
  };

  // Helper function for optional env vars with defaults
  const getOptional = (key: string, defaultValue: string): string => {
    return env[key] || defaultValue;
  };

  // Special case for DB_PASSWORD - allow empty string in development
  const getDbPassword = (): string => {
    const value = env.DB_PASSWORD;
    if (nodeEnv === 'development') {
      return value || ''; // Allow empty string in development
    }
    if (!value) {
      throw new Error('Environment variable DB_PASSWORD is required in production');
    }
    return value;
  };

  return {
    // Server Configuration
    PORT: parseInt(getRequired('PORT')),
    NODE_ENV: nodeEnv,

    // Database Configuration
    DB_HOST: getRequired('DB_HOST'),
    DB_PORT: parseInt(getRequired('DB_PORT')),
    DB_NAME: getRequired('DB_NAME'),
    DB_USER: getRequired('DB_USER'),
    DB_PASSWORD: getDbPassword(),

    // JWT Configuration
    JWT_SECRET: getRequired('JWT_SECRET'),
    JWT_EXPIRES_IN: getRequired('JWT_EXPIRES_IN') as DurationString,

    // Admin Authentication
    ADMIN_EMAIL: getRequired('ADMIN_EMAIL'),
    ADMIN_PASSWORD: getRequired('ADMIN_PASSWORD'),

    // CORS Configuration
    ALLOWED_ORIGINS: getRequired('ALLOWED_ORIGINS'),

    // Email Configuration
    SMTP_HOST: getRequired('SMTP_HOST'),
    SMTP_PORT: parseInt(getRequired('SMTP_PORT')),
    SMTP_SECURE: getRequired('SMTP_SECURE').toLowerCase() === 'true',
    SMTP_USER: getRequired('SMTP_USER'),
    SMTP_PASSWORD: getRequired('SMTP_PASSWORD'),

    // IMAP Configuration
    IMAP_HOST: getRequired('IMAP_HOST'),
    IMAP_PORT: parseInt(getRequired('IMAP_PORT')),
    IMAP_SECURE: getRequired('IMAP_SECURE').toLowerCase() === 'true',
    IMAP_USER: getRequired('IMAP_USER'),
    IMAP_PASSWORD: getRequired('IMAP_PASSWORD'),
  };
}

// Validate and export environment
const env = validateEnv();

export default env;