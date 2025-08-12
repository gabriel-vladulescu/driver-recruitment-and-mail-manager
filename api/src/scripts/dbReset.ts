import sequelize from '../config/database';
import env from '../config/env';
import { 
  InboxEmail, 
  InboxType, 
  InboxCategory, 
  InboxLabel, 
  InboxDeleted, 
  User 
} from '../models';

async function resetDatabase() {
  try {
    console.log('🔄 Starting database reset...');
    
    // 1. Authenticate with database
    await sequelize.authenticate();
    
    // 2. Drop all tables completely (ignore foreign key constraints)
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.drop();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // 3. Recreate all tables with latest model changes
    await sequelize.sync({ force: true });
    
    // 4. Populate with default data
    await User.create({
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD
    });
    
    await InboxType.bulkCreate([
      { name: 'Inbox Intern', type: 'INTERNAL_INBOX' },
      { name: 'Formulare Externe', type: 'EXTERNAL_FORMS' }
    ]);
    
    await InboxCategory.bulkCreate([
      { category: 'EMAILS_RECEIVED', name: 'E-mailuri Primite' },
      { category: 'EMAILS_SENT', name: 'E-mailuri Trimise' }
    ]);
    
    console.log('✅ Database reset completed');
    
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

resetDatabase();