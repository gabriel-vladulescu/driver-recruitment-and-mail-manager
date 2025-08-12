import sequelize from '../config/database';
import env from '../config/env';
import { syncDatabase } from '../models';

async function resetDatabase() {
  try {
    console.log('🔄 Starting database reset...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connection established.');
    
    // Disable foreign key checks temporarily
    console.log('⚠️  Disabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    
    // Drop all tables and recreate them
    console.log('🗑️  Dropping all tables...');
    await sequelize.drop();
    console.log('✅ All tables dropped.');
    
    // Re-enable foreign key checks
    console.log('✅ Re-enabling foreign key checks...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    
    // Recreate all tables with fresh structure and seed data
    console.log('🏗️  Creating tables and seeding initial data...');
    await syncDatabase(true); // force: true to recreate everything
    
    console.log('🎉 Database reset completed successfully!');
    console.log(`📝 Default admin user: ${env.ADMIN_EMAIL}`);
    console.log('📝 Default categories and types created');
    
  } catch (error) {
    console.error('❌ Database reset failed:', error);
    
    // Make sure to re-enable foreign key checks even if there's an error
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
      console.log('✅ Foreign key checks re-enabled after error');
    } catch (fkError) {
      console.error('⚠️  Could not re-enable foreign key checks:', fkError);
    }
    
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

// Run the reset
resetDatabase();