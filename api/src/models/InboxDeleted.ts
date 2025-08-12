import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface InboxDeletedAttributes {
  id: number;
  message_id: string; // The original Message-ID from email headers
  email_from: string;
  subject: string;
  deleted_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InboxDeletedCreationAttributes extends Omit<InboxDeletedAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class InboxDeleted extends Model<InboxDeletedAttributes, InboxDeletedCreationAttributes> implements InboxDeletedAttributes {
  public id!: number;
  public message_id!: string;
  public email_from!: string;
  public subject!: string;
  public deleted_at!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InboxDeleted.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message_id: {
    type: DataTypes.STRING(191),
    allowNull: false,
    unique: true // Ensure we don't duplicate deleted email records
  },
  email_from: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'inbox_deleted',
  timestamps: true,
  paranoid: false, // Disable soft deletes for this model
  underscored: true, // Use snake_case for database columns
  deletedAt: false, // Explicitly disable deletedAt field detection
  indexes: [
    {
      fields: ['message_id']
    },
    {
      fields: ['email_from']
    }
  ]
});

export default InboxDeleted;