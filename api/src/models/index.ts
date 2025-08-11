import sequelize from '../config/database';
import User from './User';
import FormSubmission from './FormSubmission';
import SentReply from './SentReply';
import InboxType from './InboxType';
import InboxCategory from './InboxCategory';
import InboxLabel from './InboxLabel';
import InboxEmail from './InboxEmail';

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
    
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};