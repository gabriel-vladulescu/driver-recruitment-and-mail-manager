import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface InboxCategoryAttributes {
  id: number;
  category: string;
  name: string;
}

export interface InboxCategoryCreationAttributes extends Omit<InboxCategoryAttributes, 'id'> {}

class InboxCategory extends Model<InboxCategoryAttributes, InboxCategoryCreationAttributes> implements InboxCategoryAttributes {
  public id!: number;
  public category!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InboxCategory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'inbox_categories',
  timestamps: true
});

export default InboxCategory;