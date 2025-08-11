import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SentReplyAttributes {
  id: number;
  original_form_id?: number;
  subject: string;
  sent_to: string;
  message: string;
  signature?: string;
  sent_by_user_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface SentReplyCreationAttributes extends Optional<SentReplyAttributes, 'id' | 'original_form_id' | 'signature' | 'created_at' | 'updated_at' | 'deleted_at'> {}

class SentReply extends Model<SentReplyAttributes, SentReplyCreationAttributes> implements SentReplyAttributes {
  public id!: number;
  public original_form_id?: number;
  public subject!: string;
  public sent_to!: string;
  public message!: string;
  public signature?: string;
  public sent_by_user_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  // Sequelize camelCase aliases
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Instance method to format for API response
  public toApiResponse() {
    const actualCreatedAt = this.createdAt || this.created_at;
    
    return {
      id: this.id.toString(),
      originalFormId: this.original_form_id?.toString() || null,
      subject: this.subject,
      sentTo: this.sent_to,
      message: this.message,
      signature: this.signature || null,
      sentByUserId: this.sent_by_user_id.toString(),
      timestamp: actualCreatedAt ? actualCreatedAt.toISOString() : new Date().toISOString(),
    };
  }
}

SentReply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    original_form_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'form_submissions',
        key: 'id'
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sent_to: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    signature: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sent_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: 'SentReply',
    tableName: 'sent_replies',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        fields: ['original_form_id'],
      },
      {
        fields: ['sent_to'],
      },
      {
        fields: ['sent_by_user_id'],
      },
      {
        fields: ['created_at'],
      },
    ],
  }
);

export default SentReply;