import sequelize from '../config/database';
import User from './User';
import InboxReply from './InboxReply';
import InboxType from './InboxType';
import InboxCategory from './InboxCategory';
import InboxLabel from './InboxLabel';
import InboxEmail from './InboxEmail';
import InboxDeleted from './InboxDeleted';

// Define associations here if needed
// InboxReply associations
User.hasMany(InboxReply, { foreignKey: 'sent_by_user_id', as: 'inboxReplies' });
InboxReply.belongsTo(User, { foreignKey: 'sent_by_user_id', as: 'sentByUser' });

// InboxReply associations with InboxEmail
InboxReply.belongsTo(InboxEmail, { foreignKey: 'original_email_id', as: 'originalEmail' });
InboxEmail.hasMany(InboxReply, { foreignKey: 'original_email_id', as: 'replies' });

export {
  sequelize,
  User,
  InboxReply,
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
    const adminExists = await User.findOne({ where: { email: 'admin@bloom.ro' } });
    if (!adminExists) {
      await User.create({
        email: 'admin@bloom.ro',
        password: 'admin123', // Will be hashed automatically
      });
      console.log('✅ Default admin user created.');
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