import sequelize from '../config/database';
import User from './User';
import InboxType from './InboxType';
import InboxCategory from './InboxCategory';
import InboxLabel from './InboxLabel';
import InboxEmail from './InboxEmail';
import InboxDeleted from './InboxDeleted';
import InboxArchive from './InboxArchive';
import InboxTrash from './InboxTrash';

export {
  sequelize,
  User,
  InboxType,
  InboxCategory,
  InboxLabel,
  InboxEmail,
  InboxDeleted,
  InboxArchive,
  InboxTrash,
};