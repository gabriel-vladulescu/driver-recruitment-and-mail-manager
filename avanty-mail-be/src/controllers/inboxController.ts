import { Request, Response } from "express";
import { ApiResponse } from "../utils/common";
import { InboxEmailQuery, ResponseStatus } from "../types";
import emailService from "../services/emailService";
import labelService from "../services/labelService";
import archiveService from "../services/archiveService";
import trashService from "../services/trashService";
import categoryService from "../services/categoryService";

export const getEmails = async (req: Request, res: Response): Promise<Response> => {
  try {
    const query = req.query as InboxEmailQuery;
    const result = await emailService.getEmails(query);

    return ApiResponse(res, ResponseStatus.Success, result);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Nu s-au putut obține email-urile", 500);
  }
};

export const getLabels = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const labels = await labelService.getLabels();

    return ApiResponse(res, ResponseStatus.Success, labels);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Nu s-au putut obține etichetele", 500);
  }
};

export const createLabel = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { label, color, icon } = req.body;
    const newLabel = await labelService.createLabel({ label, color, icon });

    return ApiResponse(res, ResponseStatus.Success, newLabel, "Eticheta a fost creată", 201);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Eticheta nu a putut fi creeată", 500);
  }
};

export const updateLabel = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { label, color, icon } = req.body;
    const updatedLabel = await labelService.updateLabel(id, { label, color, icon });

    return ApiResponse(res, ResponseStatus.Success, updatedLabel, "Eticheta a fost actualizată");
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Eticheta nu a putut fi actualizată", 500);
  }
};

export const deleteLabel = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await labelService.deleteLabel(id);

    return ApiResponse(res, ResponseStatus.Success, "Eticheta a fost ștearsă");
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Eticheta nu a putut fi ștearsă", 500);
  }
};

export const getCategories = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await categoryService.getCategories();
    return ApiResponse(res, ResponseStatus.Success, categories);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Categoriile nu au putut fi preluate", 500);
  }
};

export const getEmailsFromTrash = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const result = await trashService.getTrashedEmails(
      parseInt(page as string),
      parseInt(limit as string),
      search as string
    );

    return ApiResponse(res, ResponseStatus.Success, result);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Email-urile din trash nu au putut fi preluate", 500);
  }
};

export const getEmailsFromArchive = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const result = await archiveService.getArchivedEmails(
      parseInt(page as string),
      parseInt(limit as string),
      search as string
    );

    return ApiResponse(res, ResponseStatus.Success, result);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Email-urile din arhiva nu au putut fi preluate.", 500);
  }
};

export const restoreFromTrash = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ids } = req.body;

    const validation = trashService.validateIds(ids);
    if (!validation.valid) {
      return ApiResponse(res, ResponseStatus.Error, validation.error!);
    }

    const result = await trashService.restoreFromTrash(ids);
    const message = trashService.generateRestoreMessage(result.restoredCount);

    if (result.foundCount < ids.length) {
      return ApiResponse(res, ResponseStatus.Warning,
        {
          restoredCount: result.restoredCount,
          requestedCount: ids.length
        },
        trashService.generatePartialWarningMessage(message, ids.length - result.foundCount)
      );
    }

    return ApiResponse(res, ResponseStatus.Success,
      {
        restoredCount: result.restoredCount
      },
      message
    );
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Email-urile nu au putut fi restaurate din trash.", 500);
  }
};

export const cleanTrash = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ids } = req.body;

    const validation = trashService.validateIds(ids);
    if (!validation.valid) {
      return ApiResponse(res, ResponseStatus.Error, validation.error!);
    }

    const result = await trashService.cleanTrash(ids);
    const message = trashService.generateDeleteMessage(result.deletedCount);

    if (result.foundCount < ids.length) {
      return ApiResponse(res, ResponseStatus.Warning,
        { 
          deletedCount: result.deletedCount, 
          requestedCount: ids.length 
        },
        trashService.generatePartialWarningMessage(message, ids.length - result.foundCount)
      );
    }

    return ApiResponse(res, ResponseStatus.Success,
      {
        deletedCount: result.deletedCount
      },
      message
    );
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Coșul de gunoi nu a putut fi golit.", 500);
  }
};

export const restoreFromArchive = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ids } = req.body;

    const validation = archiveService.validateIds(ids);
    if (!validation.valid) {
      return ApiResponse(res, ResponseStatus.Error, validation.error!);
    }

    const result = await archiveService.restoreFromArchive(ids);
    const message = archiveService.generateRestoreMessage(result.restoredCount);

    if (result.foundCount < ids.length) {
      return ApiResponse(res, ResponseStatus.Warning,
        {
          restoredCount: result.restoredCount,
          requestedCount: ids.length
        },
        archiveService.generatePartialWarningMessage(message, ids.length - result.foundCount, 'archive')
      );
    }

    return ApiResponse(res, ResponseStatus.Success,
      {
        restoredCount: result.restoredCount
      },
      message
    );
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, undefined, 500);
  }
};

export const getEmailCounts = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const result = await emailService.getAllEmailCounts();
    return ApiResponse(res, ResponseStatus.Success, result);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Counter-ele pentru email-uri nu au putut fi obtinute.", 500);
  }
};

export const moveToTrash = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ids, from_archive } = req.body;

    const validation = trashService.validateIds(ids);
    if (!validation.valid) {
      return ApiResponse(res, ResponseStatus.Error, validation.error!);
    }

    const result = await trashService.moveToTrash(ids, from_archive);
    const message = trashService.generateMoveMessage(result.movedCount);

    if (result.foundCount < ids.length) {
      return ApiResponse(res, ResponseStatus.Warning,
        {
          movedCount: result.movedCount,
          requestedCount: ids.length
        },
        archiveService.generatePartialWarningMessage(message, ids.length - result.foundCount)
      );
    }

    return ApiResponse(res, ResponseStatus.Success,
      {
        movedCount: result.movedCount
      },
      message
    );
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Email-urile nu au putut fi mutate in cosul de gunoi.", 500);
  }
};

export const moveToLabel = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { labelId } = req.params;
    const { ids } = req.body;

    const validation = emailService.validateIds(ids);
    if (!validation.valid) {
      return ApiResponse(res, ResponseStatus.Error, validation.error!);
    }

    // Validate label exists
    const label = await labelService.getLabelById(labelId);
    if (!label) {
      return ApiResponse(res, ResponseStatus.Error, "Eticheta nu a fost găsită");
    }

    const result = await emailService.moveToLabel(ids, labelId);

    if (result.updatedCount === 0) {
      return ApiResponse(res, ResponseStatus.Error, `No Update: Eticheta este deja aplicată.`);
    }

    const message = `Eticheta a fost aplicată la ${result.updatedCount} ` +
      `email${result.updatedCount > 1 ? "-uri" : ""} din ${ids.length} `;

    const existing = result.foundCount - result.updatedCount;
    if (existing > 0) {
      return ApiResponse(res, ResponseStatus.Warning, `Partial Update: ${message}.`);
    }

    return ApiResponse(res, ResponseStatus.Success, message);
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Eticheta nu a putut fi aplicată pe email-urile selectate.", 500);
  }
};

export const moveToArchive = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ids } = req.body;

    const validation = archiveService.validateIds(ids);
    if (!validation.valid) {
      return ApiResponse(res, ResponseStatus.Error, validation.error!);
    }

    const result = await archiveService.moveToArchive(ids);
    const message = archiveService.generateArchiveMessage(result.archivedCount);

    if (result.foundCount < ids.length) {
      return ApiResponse(res, ResponseStatus.Warning,
        {
          archivedCount: result.archivedCount,
          requestedCount: ids.length
        },
        archiveService.generatePartialWarningMessage(message, ids.length - result.foundCount)
      );
    }

    return ApiResponse(res, ResponseStatus.Success,
      {
        archivedCount: result.archivedCount
      },
      message
    );
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Email-urile selectate nu au putut fi mutate in arhiva.", 500);
  }
};

export const markAsRead = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ids, is_read } = req.body;

    const idsValidation = emailService.validateIds(ids);
    if (!idsValidation.valid) {
      return ApiResponse(res, ResponseStatus.Error, idsValidation.error!);
    }

    const readValidation = emailService.validateReadStatus(is_read);
    if (!readValidation.valid) {
      return ApiResponse(res, ResponseStatus.Error, readValidation.error!);
    }

    const result = await emailService.markAsRead(ids, is_read);
    const message = emailService.generateReadMessage(result.foundCount, is_read);

    if (result.foundCount < ids.length) {
      return ApiResponse(res, ResponseStatus.Warning,
        {
          updatedCount: result.updatedCount,
          foundCount: result.foundCount,
          requestedCount: ids.length
        },
        emailService.generatePartialWarningMessage(message, ids.length - result.foundCount)
      );
    }

    return ApiResponse(res, ResponseStatus.Success,
      {
        updatedCount: result.updatedCount
      },
      message
    );
  } catch (error) {
    return ApiResponse(res, ResponseStatus.Error, error, "Email-urile selectate nu au putut fi marcate ca citite", 500);
  }
};