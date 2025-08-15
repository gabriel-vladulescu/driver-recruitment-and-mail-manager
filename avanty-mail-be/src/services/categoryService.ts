import { InboxCategory } from "../models";

class CategoryService {
  async getCategories() {
    return await InboxCategory.findAll({
      order: [["name", "ASC"]],
    });
  }
}

export default new CategoryService();