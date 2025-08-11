import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface InboxDeletedAttributes {
  id: number;
  message_id: string; // The original Message-ID from email headers
  email_from: string;
  subject: string;
  deletion_date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InboxDeletedCreationAttributes extends Omit<InboxDeletedAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class InboxDeleted extends Model<InboxDeletedAttributes, InboxDeletedCreationAttributes> implements InboxDeletedAttributes {
  public id!: number;
  public message_id!: string;
  public email_from!: string;
  public subject!: string;
  public deletion_date!: Date;

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
    type: DataTypes.STRING(191), // Max length for unique key in utf8mb4
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
  deletion_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'deleted_at' // Map to database column 'deleted_at'
  }
}, {
  sequelize,
  tableName: 'inbox_deleted',
  timestamps: true,
  paranoid: false, // Disable soft deletes for this model
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