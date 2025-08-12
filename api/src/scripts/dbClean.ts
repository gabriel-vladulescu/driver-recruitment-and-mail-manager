import sequelize from '../config/database';
import { Op } from 'sequelize';
import env from '../config/env';
import { 
  InboxEmail, 
  InboxType, 
  InboxCategory, 
  InboxLabel, 
  InboxDeleted, 
  User 
} from '../models';

async function cleanDatabase() {
  try {
    console.log('🧹 Starting database cleanup...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connection established.');
    
    // Clean all tables (delete all records but keep structure)
    console.log('🗑️  Cleaning all tables...');
    
    await InboxEmail.destroy({ where: {}, force: true });
    console.log('✅ Cleaned inbox_emails');
    
    await InboxDeleted.destroy({ where: {}, force: true });
    console.log('✅ Cleaned inbox_deleted');
    
    await InboxLabel.destroy({ where: {} });
    console.log('✅ Cleaned inbox_labels');
    
    // Keep categories and types as they are essential
    console.log('ℹ️  Keeping inbox_categories and inbox_types (essential data)');
    
    // Optional: Clean users except admin
    const adminEmail = env.ADMIN_EMAIL;
    await User.destroy({ 
      where: { 
        email: { [Op.not]: adminEmail } 
      } 
    });
    console.log(`✅ Cleaned users (kept ${adminEmail})`);
    
    console.log('🎉 Database cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database cleanup failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

// Run the cleanup
cleanDatabase();