import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface InboxLabelAttributes {
  id: number;
  label: string;
  color: string;
  icon: string;
}

export interface InboxLabelCreationAttributes extends Omit<InboxLabelAttributes, 'id'> {}

class InboxLabel extends Model<InboxLabelAttributes, InboxLabelCreationAttributes> implements InboxLabelAttributes {
  public id!: number;
  public label!: string;
  public color!: string;
  public icon!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InboxLabel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  color: {
    type: DataTypes.STRING(7),
    allowNull: false,
    defaultValue: '#000000'
  },
  icon: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Tag'
  }
}, {
  sequelize,
  tableName: 'inbox_labels',
  timestamps: true
});

export default InboxLabel;