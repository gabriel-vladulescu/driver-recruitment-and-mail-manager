import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface FormSubmissionAttributes {
  id: number;
  type: 'TYPE_CONTACT' | 'TYPE_RECRUITMENT' | 'TYPE_EXTERNAL_CAR_RENT';
  subject: string;
  preview_message: string;
  is_read: boolean;
  is_archived: boolean;
  contact_email?: string;
  contact_phone?: string;
  form_data: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface FormSubmissionCreationAttributes extends Optional<FormSubmissionAttributes, 'id' | 'is_read' | 'is_archived' | 'created_at' | 'updated_at' | 'deleted_at'> {}

class FormSubmission extends Model<FormSubmissionAttributes, FormSubmissionCreationAttributes> implements FormSubmissionAttributes {
  public id!: number;
  public type!: 'TYPE_CONTACT' | 'TYPE_RECRUITMENT' | 'TYPE_EXTERNAL_CAR_RENT';
  public subject!: string;
  public preview_message!: string;
  public is_read!: boolean;
  public is_archived!: boolean;
  public contact_email?: string;
  public contact_phone?: string;
  public form_data!: Record<string, any>;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;
  
  // Sequelize camelCase aliases
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Instance method to format for API response
  public toApiResponse() {
    const formTypes = {
      'TYPE_CONTACT': { icon: 'MessageCircle', label: 'Contact' },
      'TYPE_RECRUITMENT': { icon: 'Briefcase', label: 'Recrutare' },
      'TYPE_EXTERNAL_CAR_RENT': { icon: 'Car', label: 'Închiriere' }
    };

    // Use createdAt (camelCase) which is what Sequelize actually returns
    const actualCreatedAt = this.createdAt || this.created_at;
    
    return {
      id: this.id.toString(),
      type: this.type,
      icon: formTypes[this.type].icon,
      subject: this.subject,
      preview_message: this.preview_message,
      isRead: this.is_read,
      isArchived: this.is_archived,
      timestamp: actualCreatedAt ? actualCreatedAt.toISOString() : new Date().toISOString(),
      details: {
        subject: this.subject,
        from: this.contact_email || this.contact_phone || 'N/A',
        contact: {
          email: this.contact_email || undefined,
          phone: this.contact_phone || undefined,
        },
        data: this.formatFormData(),
      },
    };
  }

  // Helper method to format form data for display
  private formatFormData() {
    const data = this.form_data;
    const formatted: Array<{ title: string; info: string }> = [];

    // Complete field mappings with translations
    const fieldMappings = {
      // Personal Information
      firstName: 'Prenume',
      lastName: 'Nume',
      fullName: 'Nume Complet',
      phone: 'Telefon',
      email: 'Email',
      
      // Contact Form
      subject: 'Subiect',
      message: 'Mesaj',
      additionalMessage: 'Mesaj suplimentar',
      
      // Driver Application
      experience: 'Experiență',
      hasVehicle: 'Deține vehicul',
      vehicleBrand: 'Marcă și model vehicul',
      vehicleYear: 'An fabricație vehicul', 
      vehicleFuel: 'Combustibil vehicul',
      vehicleColor: 'Culoare vehicul',
      availability: 'Disponibilitate',
      preferredSchedule: 'Program preferat',
      
      // Car Rental
      carInfo: 'Informații mașină',
      carBrand: 'Marcă și model',
      carYear: 'An fabricație',
      carFuel: 'Combustibil', 
      carColor: 'Culoare',
      vehicle: 'Vehicul',
      
      // System fields
      source: 'Sursă',
      acceptTerms: 'Termeni și condiții',
      
      // Legacy fields
      schedule: 'Program preferat',
    };

    // Value translations for specific fields
    const valueTranslations: Record<string, Record<string, string>> = {
      hasVehicle: {
        'yes': 'Da, am vehicul propriu',
        'no': 'Nu, nu am vehicul',
        'rental': 'Nu, doresc să închirez prin Bloom'
      },
      vehicleFuel: {
        'benzina': 'Benzină',
        'motorina': 'Motorină', 
        'hibrid': 'Hibrid',
        'electric': 'Electric',
        'gpl': 'GPL'
      },
      experience: {
        '2-3-ani': '2-3 ani',
        '3-5-ani': '3-5 ani',
        'peste-5-ani': 'Peste 5 ani',
        'mai-putin-de-2-ani': 'Mai puțin de 2 ani'
      },
      availability: {
        'imediat': 'Imediat',
        '1-saptamana': 'În 1 săptămână',
        '2-saptamani': 'În 2 săptămâni', 
        '1-luna': 'În 1 lună',
        'mai-mult-de-1-luna': 'Mai mult de 1 lună'
      },
      preferredSchedule: {
        'full-time': 'Full-time (8+ ore/zi)',
        'part-time': 'Part-time (4-6 ore/zi)',
        'weekend': 'Doar weekend',
        'flexible': 'Program flexibil'
      },
      acceptTerms: {
        'true': 'Acceptat',
        'false': 'Neacceptat'
      }
    };

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        let displayValue = String(value).trim();
        
        // Apply value translations if available
        if (valueTranslations[key] && valueTranslations[key][displayValue]) {
          displayValue = valueTranslations[key][displayValue];
        }
        
        // Get translated field name
        const title = fieldMappings[key as keyof typeof fieldMappings] || key;
        
        if (displayValue) {
          formatted.push({ title, info: displayValue });
        }
      }
    });

    return formatted;
  }
}

FormSubmission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('TYPE_CONTACT', 'TYPE_RECRUITMENT', 'TYPE_EXTERNAL_CAR_RENT'),
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preview_message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    contact_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    form_data: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const value = this.getDataValue('form_data') as unknown as string;
        return value ? JSON.parse(value) : {};
      },
      set(value: Record<string, any>) {
        this.setDataValue('form_data', JSON.stringify(value) as unknown as Record<string, any>);
      },
    },
  },
  {
    sequelize,
    modelName: 'FormSubmission',
    tableName: 'form_submissions',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        fields: ['type'],
      },
      {
        fields: ['is_read'],
      },
      {
        fields: ['is_archived'],
      },
      {
        fields: ['created_at'],
      },
    ],
  }
);

export default FormSubmission;