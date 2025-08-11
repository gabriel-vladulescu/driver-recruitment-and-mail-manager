import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface InboxTypeAttributes {
  id: number;
  icon: string;
  type: string;
}

export interface InboxTypeCreationAttributes extends Omit<InboxTypeAttributes, 'id'> {}

class InboxType extends Model<InboxTypeAttributes, InboxTypeCreationAttributes> implements InboxTypeAttributes {
  public id!: number;
  public icon!: string;
  public type!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InboxType.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  icon: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  tableName: 'inbox_types',
  timestamps: true
});

export default InboxType;