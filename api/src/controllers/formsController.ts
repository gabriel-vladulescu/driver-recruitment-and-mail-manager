import { Request, Response } from 'express';
import { InboxEmail } from '../models';
import { ApiResponse } from '../types';

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