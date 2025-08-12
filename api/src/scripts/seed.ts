import dotenv from 'dotenv';
import sequelize from '../config/database';
import { User, InboxType, InboxCategory, InboxLabel } from '../models';

// Load environment variables
dotenv.config();

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database (this will create tables if they don't exist)
    await sequelize.sync({ force: true }); // WARNING: This will drop all tables!
    console.log('✅ Database synced successfully');

    // Get admin credentials from environment
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@bloom.ro';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Create admin user (password will be hashed automatically by User model hook)
    const adminUser = await User.create({
      email: adminEmail,
      password: adminPassword,
    });

    console.log('✅ Admin user created successfully');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   ID: ${adminUser.id}`);

    // Seed inbox types
    const inboxTypes = [
      { name: 'Inbox Intern', type: 'INTERNAL_INBOX' },
      { name: 'Formulare Externe', type: 'EXTERNAL_FORMS' }
    ];

    for (const typeData of inboxTypes) {
      await InboxType.create(typeData);
    }
    console.log('✅ Inbox types created successfully');

    // Seed inbox categories  
    const inboxCategories = [
      { category: 'EMAILS_RECEIVED', name: 'Mesaje Primite' },
      { category: 'EMAILS_SENT', name: 'Trimise' }
    ];

    for (const categoryData of inboxCategories) {
      await InboxCategory.create(categoryData);
    }
    console.log('✅ Inbox categories created successfully');

    // Seed default labels
    const defaultLabels = [
      { label: 'Business', color: '#1f2937', icon: 'Briefcase' },
      { label: 'Salvate', color: '#059669', icon: 'Bookmark' },
      { label: 'Arhivate', color: '#6b7280', icon: 'Archive' }
    ];

    for (const labelData of defaultLabels) {
      await InboxLabel.create(labelData);
    }
    console.log('✅ Default labels created successfully');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Admin Login Credentials:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Only run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('\n✨ Seeding process completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Seeding process failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;