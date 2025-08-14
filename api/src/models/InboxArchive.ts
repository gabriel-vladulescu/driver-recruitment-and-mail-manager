import { DataTypes, Model, ForeignKey, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../config/database';
import InboxType from './InboxType';
import InboxCategory from './InboxCategory';
import InboxLabel from './InboxLabel';

export interface InboxArchiveAttributes {
  id: number;
  inbox_type_id: ForeignKey<InboxType['id']>;
  inbox_category_id: ForeignKey<InboxCategory['id']>;
  inbox_label_id?: ForeignKey<InboxLabel['id']>;
  email_from: string;
  email_from_name: string;
  email_to: string;
  email_to_name: string;
  subject: string;
  message: string;
  custom_data?: object | null;
  is_read: boolean;
  archived_at: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InboxArchiveCreationAttributes extends Omit<InboxArchiveAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class InboxArchive extends Model<InboxArchiveAttributes, InboxArchiveCreationAttributes> implements InboxArchiveAttributes {
  public id!: number;
  public inbox_type_id!: ForeignKey<InboxType['id']>;
  public inbox_category_id!: ForeignKey<InboxCategory['id']>;
  public inbox_label_id?: ForeignKey<InboxLabel['id']>;
  public email_from!: string;
  public email_from_name!: string;
  public email_to!: string;
  public email_to_name!: string;
  public subject!: string;
  public message!: string;
  public custom_data?: object | null;
  public is_read!: boolean;
  public archived_at!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getInboxType!: BelongsToGetAssociationMixin<InboxType>;
  public getInboxCategory!: BelongsToGetAssociationMixin<InboxCategory>;
  public getInboxLabel!: BelongsToGetAssociationMixin<InboxLabel>;
}

InboxArchive.init({
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
  email_to_name: {
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
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const value = this.getDataValue('custom_data') as unknown as string;
      if (!value) return null;
      try {
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    },
    set(value: any) {
      if (value === null || value === undefined) {
        this.setDataValue('custom_data', null as any);
      } else {
        this.setDataValue('custom_data', JSON.stringify(value) as any);
      }
    }
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  archived_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'inbox_archive',
  timestamps: true,
  paranoid: false
});

// Define associations
InboxArchive.belongsTo(InboxType, { foreignKey: 'inbox_type_id', as: 'inboxType' });
InboxArchive.belongsTo(InboxCategory, { foreignKey: 'inbox_category_id', as: 'inboxCategory' });
InboxArchive.belongsTo(InboxLabel, { foreignKey: 'inbox_label_id', as: 'inboxLabel' });

export default InboxArchive;