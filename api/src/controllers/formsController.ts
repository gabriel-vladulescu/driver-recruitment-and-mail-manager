import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { FormSubmission } from '../models';
import { ApiResponse } from '../types';

export const getAllForms = async (req: Request, res: Response) => {
  try {
    const forms = await FormSubmission.findAll({
      order: [
        ['is_read', 'ASC'], // Unread first
        ['created_at', 'DESC'] // Newest first
      ]
    });

    const formattedForms = forms.map(form => form.toApiResponse());

    res.json(formattedForms);

  } catch (error) {
    console.error('Get all forms error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la încărcarea formularelor'
    } as ApiResponse);
  }
};

export const getFormById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const form = await FormSubmission.findByPk(id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Formularul nu a fost găsit'
      } as ApiResponse);
    }

    const response = form.toApiResponse();
    res.json(response.details);

  } catch (error) {
    console.error('Get form by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la încărcarea formularului'
    } as ApiResponse);
  }
};

export const updateReadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    if (typeof isRead !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Statusul de citire trebuie să fie boolean'
      } as ApiResponse);
    }

    const form = await FormSubmission.findByPk(id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Formularul nu a fost găsit'
      } as ApiResponse);
    }

    await form.update({ is_read: isRead });

    res.json({
      success: true,
      message: 'Statusul a fost actualizat cu succes'
    } as ApiResponse);

  } catch (error) {
    console.error('Update read status error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la actualizarea statusului'
    } as ApiResponse);
  }
};

export const updateArchiveStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isArchived } = req.body;

    if (typeof isArchived !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Statusul de arhivare trebuie să fie boolean'
      } as ApiResponse);
    }

    const form = await FormSubmission.findByPk(id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Formularul nu a fost găsit'
      } as ApiResponse);
    }

    await form.update({ is_archived: isArchived });

    res.json({
      success: true,
      message: 'Statusul de arhivare a fost actualizat cu succes'
    } as ApiResponse);

  } catch (error) {
    console.error('Update archive status error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la actualizarea statusului de arhivare'
    } as ApiResponse);
  }
};

export const createForm = async (req: Request, res: Response) => {
  try {
    const { type, formData } = req.body;

    // Validate required fields
    if (!type || !formData) {
      return res.status(400).json({
        success: false,
        message: 'Tipul și datele formularului sunt obligatorii'
      } as ApiResponse);
    }

    // Validate form type
    const validTypes = ['TYPE_CONTACT', 'TYPE_RECRUITMENT', 'TYPE_EXTERNAL_CAR_RENT'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Tip de formular invalid'
      } as ApiResponse);
    }

    // Extract contact information
    const contactEmail = formData.email && formData.email.trim() ? formData.email.trim() : null;
    const contactPhone = formData.phone && formData.phone.trim() ? formData.phone.trim() : null;

    // Generate subject based on form type
    let subject = '';
    let previewMessage = '';

    switch (type) {
      case 'TYPE_CONTACT':
        subject = formData.subject || 'Mesaj de contact nou';
        previewMessage = formData.message?.substring(0, 100) + '...' || 'Mesaj de contact';
        break;
      case 'TYPE_RECRUITMENT':
        subject = 'Aplicație pentru poziția de șofer';
        previewMessage = `Aplicație nouă de la ${formData.firstName || 'N/A'} ${formData.lastName || ''}`.trim();
        break;
      case 'TYPE_EXTERNAL_CAR_RENT':
        subject = `Cerere închiriere vehicul - ${formData.firstName || 'N/A'} ${formData.lastName || ''}`.trim();
        previewMessage = formData.additionalMessage?.substring(0, 100) + '...' || 'Cerere de închiriere vehicul';
        break;
    }

    // Create form submission
    const form = await FormSubmission.create({
      type,
      subject,
      preview_message: previewMessage,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      form_data: formData
    });

    res.status(201).json({
      success: true,
      message: 'Formularul a fost trimis cu succes',
      data: { id: form.id }
    } as ApiResponse);

  } catch (error) {
    console.error('Create form error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la salvarea formularului'
    } as ApiResponse);
  }
};