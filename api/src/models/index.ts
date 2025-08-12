import sequelize from '../config/database';
import User from './User';
import InboxType from './InboxType';
import InboxCategory from './InboxCategory';
import InboxLabel from './InboxLabel';
import InboxEmail from './InboxEmail';
import InboxDeleted from './InboxDeleted';

// Define associations here if needed

export {
  sequelize,
  User,
  InboxType,
  InboxCategory,
  InboxLabel,
  InboxEmail,
  InboxDeleted,
};

// Function to sync database
export const syncDatabase = async (force = false) => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    await sequelize.sync({ force });
    console.log(`✅ Database synchronized${force ? ' (forced)' : ''}.`);
    
    // Create default admin user if it doesn't exist
    const { default: env } = await import('../config/env');
    const adminEmail = env.ADMIN_EMAIL;
    const adminPassword = env.ADMIN_PASSWORD;
    
    const adminExists = await User.findOne({ where: { email: adminEmail } });
    if (!adminExists) {
      await User.create({
        email: adminEmail,
        password: adminPassword, // Will be hashed automatically
      });
      console.log(`✅ Default admin user created: ${adminEmail}`);
    }

    // Create default inbox types if they don't exist
    const internalInboxExists = await InboxType.findOne({ where: { type: 'INTERNAL_INBOX' } });
    if (!internalInboxExists) {
      await InboxType.create({
        name: 'Inbox Intern',
        type: 'INTERNAL_INBOX'
      });
      console.log('✅ Default inbox type (INTERNAL_INBOX) created.');
    }

    const externalFormsExists = await InboxType.findOne({ where: { type: 'EXTERNAL_FORMS' } });
    if (!externalFormsExists) {
      await InboxType.create({
        name: 'Formulare Externe',
        type: 'EXTERNAL_FORMS'
      });
      console.log('✅ Default inbox type (EXTERNAL_FORMS) created.');
    }

    // Create default inbox categories if they don't exist
    const emailsReceivedExists = await InboxCategory.findOne({ where: { category: 'EMAILS_RECEIVED' } });
    if (!emailsReceivedExists) {
      await InboxCategory.create({
        category: 'EMAILS_RECEIVED',
        name: 'E-mailuri Primite'
      });
      console.log('✅ Default inbox category (EMAILS_RECEIVED) created.');
    }

    const emailsSentExists = await InboxCategory.findOne({ where: { category: 'EMAILS_SENT' } });
    if (!emailsSentExists) {
      await InboxCategory.create({
        category: 'EMAILS_SENT',
        name: 'E-mailuri Trimise'
      });
      console.log('✅ Default inbox category (EMAILS_SENT) created.');
    }
    
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};