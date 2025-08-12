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

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // 1. Authenticate with database
    await sequelize.authenticate();
    
    // 2. Create 10 sample labels
    const labelNames = ['Business', 'Urgent', 'Personal', 'Marketing', 'Support', 'Development', 'Sales', 'Finance', 'HR', 'Research'];
    const labelColors = ['#1f2937', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0284c7', '#16a34a', '#ca8a04', '#be123c', '#9333ea'];
    const labelIcons = ['Briefcase', 'AlertTriangle', 'User', 'TrendingUp', 'HelpCircle', 'Code', 'DollarSign', 'PieChart', 'Users', 'Search'];
    
    for (let i = 0; i < 10; i++) {
      await InboxLabel.create({
        label: labelNames[i],
        color: labelColors[i],
        icon: labelIcons[i]
      });
    }
    
    // 3. Create 100 emails with inbox_type_id 1 (INTERNAL_INBOX)
    const sampleEmails1 = [];
    for (let i = 1; i <= 100; i++) {
      sampleEmails1.push({
        email_from: `sender${i}@company.com`,
        email_to_name: `Internal User ${i}`,
        email_to: 'internal@company.com',
        subject: `Internal Message ${i}`,
        message: `This is internal message number ${i} for testing purposes.`,
        inbox_type_id: 1,
        inbox_category_id: 1,
        inbox_label_id: (i % 10) + 1, // Rotate through labels 1-10
        is_read: i % 3 === 0 // Mark every 3rd as read
      });
    }
    await InboxEmail.bulkCreate(sampleEmails1);
    
    // 4. Create 100 emails with inbox_type_id 2 (EXTERNAL_FORMS)
    const sampleEmails2 = [];
    for (let i = 1; i <= 100; i++) {
      sampleEmails2.push({
        email_from: `external${i}@client.com`,
        email_to_name: `Form Handler ${i}`,
        email_to: 'forms@company.com',
        subject: `External Form ${i}`,
        message: `This is external form submission number ${i} from website contact form.`,
        inbox_type_id: 2,
        inbox_category_id: 1,
        inbox_label_id: (i % 10) + 1, // Rotate through labels 1-10
        is_read: i % 4 === 0 // Mark every 4th as read
      });
    }
    await InboxEmail.bulkCreate(sampleEmails2);
    
    console.log('✅ Database seeding completed');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

seedDatabase();