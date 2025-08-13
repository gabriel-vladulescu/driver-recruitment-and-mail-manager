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
    
    // 3. Create emails with mixed labeling strategy
    const sampleEmails = [];
    
    // Create 50 emails for category 1 (EMAILS_RECEIVED) WITHOUT labels
    for (let i = 1; i <= 50; i++) {
      sampleEmails.push({
        email_from: `sender${i}@company.com`,
        email_from_name: `Sender ${i}`,
        email_to_name: `Internal User ${i}`,
        email_to: 'internal@company.com',
        subject: `Received Message ${i}`,
        message: `This is received message number ${i} without label.`,
        inbox_type_id: 1,
        inbox_category_id: 1,
        inbox_label_id: undefined, // No label
        is_read: i % 4 === 0 // Mark every 4th as read
      });
    }
    
    // Create 25 emails for category 2 (EMAILS_SENT) WITHOUT labels  
    for (let i = 1; i <= 25; i++) {
      sampleEmails.push({
        email_from: 'internal@company.com',
        email_from_name: 'Internal System',
        email_to_name: `External User ${i}`,
        email_to: `external${i}@client.com`,
        subject: `Sent Message ${i}`,
        message: `This is sent message number ${i} without label.`,
        inbox_type_id: 1,
        inbox_category_id: 2,
        inbox_label_id: undefined, // No label
        is_read: true // Sent emails are marked as read
      });
    }
    
    // Create 50 emails WITH labels (10 emails per label)
    for (let labelId = 1; labelId <= 10; labelId++) {
      for (let i = 1; i <= 5; i++) {
        sampleEmails.push({
          email_from: `labeled${labelId}_${i}@company.com`,
          email_from_name: `Labeled Sender ${labelId}-${i}`,
          email_to_name: `Label User ${labelId}-${i}`,
          email_to: 'labels@company.com',
          subject: `Labeled Message ${labelId}-${i}`,
          message: `This is labeled message ${i} for label ${labelId}.`,
          inbox_type_id: 1,
          inbox_category_id: 1,
          inbox_label_id: labelId,
          is_read: i % 2 === 0 // Mark every 2nd as read
        });
      }
    }
    
    await InboxEmail.bulkCreate(sampleEmails);
    
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