import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { InboxEmail, InboxType, InboxCategory } from '../models';
import { ApiResponse, FormCustomData } from '../types';

export const getAllForms = async (req: Request, res: Response) => {
  try {
    // Get forms from inbox_emails where inbox_category_id = 1 (forms)
    const forms = await InboxEmail.findAll({
      where: {
        inbox_category_id: 1 // Forms category
      },
      include: [
        { model: InboxType, as: 'inboxType' },
        { model: InboxCategory, as: 'inboxCategory' }
      ],
      order: [
        ['is_read', 'ASC'], // Unread first
        ['createdAt', 'DESC'] // Newest first
      ]
    });

    const formattedForms = forms.map((form: any) => ({
      id: form.id,
      type: (form.custom_data as FormCustomData)?.type || 'TYPE_CONTACT',
      subject: form.subject,
      previewMessage: form.message.length > 100 ? form.message.substring(0, 100) + '...' : form.message,
      contactEmail: form.email_from,
      contactPhone: (form.custom_data as FormCustomData)?.formData?.phone || null,
      isRead: form.is_read,
      createdAt: form.createdAt,
      details: {
        id: form.id,
        type: (form.custom_data as FormCustomData)?.type || 'TYPE_CONTACT',
        subject: form.subject,
        message: form.message,
        contactEmail: form.email_from,
        contactName: form.email_from_name,
        contactPhone: (form.custom_data as FormCustomData)?.formData?.phone || null,
        formData: (form.custom_data as FormCustomData)?.formData || {},
        isRead: form.is_read,
        createdAt: form.createdAt,
        updatedAt: form.updatedAt
      }
    }));

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
    
    const form = await InboxEmail.findOne({
      where: {
        id: id,
        inbox_category_id: 1 // Forms category
      },
      include: [
        { model: InboxType, as: 'inboxType' },
        { model: InboxCategory, as: 'inboxCategory' }
      ]
    });
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Formularul nu a fost găsit'
      } as ApiResponse);
    }

    const response = {
      id: form.id,
      type: (form.custom_data as FormCustomData)?.type || 'TYPE_CONTACT',
      subject: form.subject,
      message: form.message,
      contactEmail: form.email_from,
      contactName: form.email_from_name,
      contactPhone: (form.custom_data as FormCustomData)?.formData?.phone || null,
      formData: (form.custom_data as any)?.formData || {},
      isRead: form.is_read,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt
    };
    
    res.json(response);

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

    const form = await InboxEmail.findOne({
      where: {
        id: id,
        inbox_category_id: 1 // Forms category
      }
    });
    
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

// Move to trash (soft delete)
export const moveToTrash = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const form = await InboxEmail.findOne({
      where: {
        id: id,
        inbox_category_id: 1 // Forms category
      }
    });
    
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Formularul nu a fost găsit'
      } as ApiResponse);
    }

    // Move to trash (soft delete)
    await form.destroy();

    res.json({
      success: true,
      message: 'Formularul a fost mutat în trash'
    } as ApiResponse);

  } catch (error) {
    console.error('Move to trash error:', error);
    res.status(500).json({
      success: false,
      message: 'Eroare la mutarea în trash'
    } as ApiResponse);
  }
};

export const createForm = async (req: Request, res: Response) => {
  try {
    const { mapping, formData } = req.body;

    // Validate required fields
    if (!mapping || !formData) {
      return res.status(400).json({
        success: false,
        message: 'Mapping-ul și datele formularului sunt obligatorii'
      } as ApiResponse);
    }

    // Validate mapping structure
    if (!mapping.emailFromProperty || !mapping.emailFromName) {
      return res.status(400).json({
        success: false,
        message: 'Mapping-ul trebuie să conțină emailFromProperty și emailFromName'
      } as ApiResponse);
    }

    // Type is now inside formData
    const type = formData.type;
    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Tipul formularului este obligatoriu în formData'
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

    // Extract email information based on mapping
    const emailFrom = formData[mapping.emailFromProperty];
    const emailFromName = formData[mapping.emailFromName];
    
    if (!emailFrom) {
      return res.status(400).json({
        success: false,
        message: 'Email-ul expeditorului este obligatoriu'
      } as ApiResponse);
    }

    // Determine email_to based on mapping
    let emailTo = 'admin@example.com'; // default
    if (mapping.emailTo === 'admin') {
      // Use SMTP username from environment
      emailTo = process.env.SMTP_USER || 'admin@example.com';
    } else {
      emailTo = mapping.emailTo;
    }

    // Generate subject and message based on form type
    let subject = '';
    let message = '';

    switch (type) {
      case 'TYPE_CONTACT':
        subject = formData.subject || 'Mesaj de contact nou';
        message = formData.message || 'Mesaj de contact';
        break;
      case 'TYPE_RECRUITMENT':
        subject = 'Aplicație pentru poziția de șofer';
        message = `Aplicație nouă de la ${emailFromName || emailFrom}. Vârsta: ${formData.age || 'N/A'}, Experiență: ${formData.experience || 'N/A'}`;
        break;
      case 'TYPE_EXTERNAL_CAR_RENT':
        subject = `Cerere închiriere vehicul - ${emailFromName || emailFrom}`;
        message = formData.additionalMessage || 'Cerere de închiriere vehicul';
        break;
    }

    // Create inbox email entry
    const form = await InboxEmail.create({
      inbox_type_id: 2, // External forms type
      inbox_category_id: 1, // Forms category  
      email_from: emailFrom,
      email_from_name: emailFromName || emailFrom,
      email_to: emailTo,
      email_to_name: 'Admin',
      subject: subject,
      message: message,
      custom_data: {
        type: type,
        formData: formData,
        mapping: mapping
      },
      is_read: false
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