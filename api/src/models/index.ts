import sequelize from '../config/database';
import User from './User';
import FormSubmission from './FormSubmission';
import SentReply from './SentReply';
import InboxType from './InboxType';
import InboxCategory from './InboxCategory';
import InboxLabel from './InboxLabel';
import InboxEmail from './InboxEmail';
import InboxDeleted from './InboxDeleted';

// Define associations here if needed
// User.hasMany(FormSubmission, { foreignKey: 'created_by' });
// FormSubmission.belongsTo(User, { foreignKey: 'created_by' });

// SentReply associations
User.hasMany(SentReply, { foreignKey: 'sent_by_user_id', as: 'sentReplies' });
SentReply.belongsTo(User, { foreignKey: 'sent_by_user_id', as: 'sentByUser' });

FormSubmission.hasMany(SentReply, { foreignKey: 'original_form_id', as: 'replies' });
SentReply.belongsTo(FormSubmission, { foreignKey: 'original_form_id', as: 'originalForm' });

export {
  sequelize,
  User,
  FormSubmission,
  SentReply,
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
        icon: 'inbox',
        type: 'INTERNAL_INBOX'
      });
      console.log('✅ Default inbox type (INTERNAL_INBOX) created.');
    }

    const externalFormsExists = await InboxType.findOne({ where: { type: 'EXTERNAL_FORMS' } });
    if (!externalFormsExists) {
      await InboxType.create({
        icon: 'form-input',
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