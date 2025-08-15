import { Request, Response } from 'express';
import { InboxEmail } from '../models';
import { INBOX_TYPES, INBOX_CATEGORIES, FORM_TYPES, DEFAULT_EMAIL_TO } from '../config/constants';
import { ResponseStatus } from '../types';
import { ApiResponse } from '../utils/common';

export const createForm = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { mapping, formData } = req.body;

    // Validate required fields
    if (!mapping || !formData) {
      return ApiResponse(res, ResponseStatus.Error, 'Mapping-ul și datele formularului sunt obligatorii');
    }

    // Validate mapping structure
    if (!mapping.emailFromProperty || !mapping.emailFromName) {
      return ApiResponse(
        res, 
        ResponseStatus.Error, 
        'Mapping-ul trebuie să conțină emailFromProperty și emailFromName'
      );
    }

    // Type is now inside formData
    const type = formData.type;
    if (!type) {
      return ApiResponse(res, ResponseStatus.Error, 'Tipul formularului este obligatoriu în formData');
    }

    // Validate form type
    const validTypes = Object.values(FORM_TYPES);
    if (!validTypes.includes(type)) {
      return ApiResponse(res, ResponseStatus.Error, 'Tip de formular invalid');
    }

    // Extract email information based on mapping
    const emailFrom = formData[mapping.emailFromProperty];
    const emailFromName = formData[mapping.emailFromName];
    
    if (!emailFrom) {
      return ApiResponse(res, ResponseStatus.Error, 'Email-ul expeditorului este obligatoriu');
    }

    // Determine email_to based on mapping
    let emailTo = DEFAULT_EMAIL_TO; // default
    if (mapping.emailTo === 'admin') {
      emailTo = DEFAULT_EMAIL_TO;
    } else {
      emailTo = mapping.emailTo;
    }

    // Generate subject and message based on form type
    let subject = '';
    let message = '';

    switch (type) {
      case FORM_TYPES.CONTACT:
        subject = formData.subject || 'Mesaj de contact nou';
        message = formData.message || 'Mesaj de contact';
        break;
      case FORM_TYPES.RECRUITMENT:
        subject = 'Aplicație pentru poziția de șofer';
        message = `Aplicație nouă de la ${emailFromName || emailFrom}. ` +
          `Vârsta: ${formData.age || 'N/A'}, Experiență: ${formData.experience || 'N/A'}`;
        break;
      case FORM_TYPES.EXTERNAL_CAR_RENT:
        subject = `Cerere închiriere vehicul - ${emailFromName || emailFrom}`;
        message = formData.additionalMessage || 'Cerere de închiriere vehicul';
        break;
    }

    // Create inbox email entry
    const form = await InboxEmail.create({
      inbox_type_id: INBOX_TYPES.EXTERNAL_FORMS,
      inbox_category_id: INBOX_CATEGORIES.FORMS,
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

    return ApiResponse(
      res, 
      ResponseStatus.Success, 
      { id: form.id },
      'Formularul a fost trimis cu succes',
      201
    );
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Formularul nu a putut fi procesat corespunzator.", 500);
  }
};