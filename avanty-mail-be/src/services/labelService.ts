import { InboxEmail, InboxLabel } from "../models";
import { LabelData } from "../types";

export class LabelService {
  
  async getLabels(): Promise<InboxLabel[]> {
    return await InboxLabel.findAll({
      order: [["label", "ASC"]],
    });
  }

  async createLabel(labelData: LabelData): Promise<InboxLabel> {
    if (!labelData.label) {
      throw new Error("Numele etichetei este obligatoriu");
    }

    return await InboxLabel.create({
      label: labelData.label,
      color: labelData.color || "#6b7280",
      icon: labelData.icon || "Tag",
    });
  }

  async updateLabel(id: string, labelData: Partial<LabelData>): Promise<InboxLabel> {
    const existingLabel = await InboxLabel.findByPk(id);
    
    if (!existingLabel) {
      throw new Error("Eticheta nu a fost găsită");
    }

    await existingLabel.update({
      label: labelData.label || existingLabel.label,
      color: labelData.color || existingLabel.color,
      icon: labelData.icon || existingLabel.icon,
    });

    return existingLabel;
  }

  async deleteLabel(id: string): Promise<void> {
    const label = await InboxLabel.findByPk(id);
    
    if (!label) {
      throw new Error("Eticheta nu a fost găsită");
    }

    // Remove label from all emails before deleting
    await InboxEmail.update({ inbox_label_id: null } as any, {
      where: { inbox_label_id: id },
    });

    await label.destroy();
  }

  async getLabelById(id: string): Promise<InboxLabel | null> {
    return await InboxLabel.findByPk(id);
  }
}

export default new LabelService();