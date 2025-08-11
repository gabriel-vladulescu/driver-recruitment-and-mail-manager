import { DataTypes, Model, ForeignKey, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import InboxType from './InboxType';
import InboxCategory from './InboxCategory';
import InboxLabel from './InboxLabel';

export interface InboxEmailAttributes {
  id: number;
  inbox_type_id: ForeignKey<InboxType['id']>;
  inbox_category_id: ForeignKey<InboxCategory['id']>;
  inbox_label_id?: ForeignKey<InboxLabel['id']>;
  email_from: string;
  email_from_name: string;
  email_to: string;
  email_mail_to: string;
  subject: string;
  message: string;
  custom_data?: object | null;
  is_read: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InboxEmailCreationAttributes extends Omit<InboxEmailAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class InboxEmail extends Model<InboxEmailAttributes, InboxEmailCreationAttributes> implements InboxEmailAttributes {
  public id!: number;
  public inbox_type_id!: ForeignKey<InboxType['id']>;
  public inbox_category_id!: ForeignKey<InboxCategory['id']>;
  public inbox_label_id?: ForeignKey<InboxLabel['id']>;
  public email_from!: string;
  public email_from_name!: string;
  public email_to!: string;
  public email_mail_to!: string;
  public subject!: string;
  public message!: string;
  public custom_data?: object | null;
  public is_read!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getInboxType!: BelongsToGetAssociationMixin<InboxType>;
  public getInboxCategory!: BelongsToGetAssociationMixin<InboxCategory>;
  public getInboxLabel!: BelongsToGetAssociationMixin<InboxLabel>;
}

InboxEmail.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  inbox_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: InboxType,
      key: 'id'
    }
  },
  inbox_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: InboxCategory,
      key: 'id'
    }
  },
  inbox_label_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: InboxLabel,
      key: 'id'
    }
  },
  email_from: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email_from_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email_to: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email_mail_to: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  subject: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  custom_data: {
    type: DataTypes.JSON,
    allowNull: true
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  tableName: 'inbox_emails',
  timestamps: true
});

// Define associations
InboxEmail.belongsTo(InboxType, { foreignKey: 'inbox_type_id', as: 'inboxType' });
InboxEmail.belongsTo(InboxCategory, { foreignKey: 'inbox_category_id', as: 'inboxCategory' });
InboxEmail.belongsTo(InboxLabel, { foreignKey: 'inbox_label_id', as: 'inboxLabel' });

export default InboxEmail;