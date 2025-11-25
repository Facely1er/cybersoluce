// Utility functions for data import operations

export interface ImportResult {
  success: boolean;
  data?: any[];
  errors?: string[];
  message?: string;
}

export interface ImportOptions {
  validateHeaders?: boolean;
  requiredFields?: string[];
  skipEmptyRows?: boolean;
  delimiter?: string;
}

// CSV Import utility
export const importFromCSV = async (
  file: File,
  options: ImportOptions = {}
): Promise<ImportResult> => {
  try {
    const text = await file.text();
    const lines = text.split('\n').filter(line => 
      options.skipEmptyRows !== false ? line.trim() : true
    );
    
    if (lines.length === 0) {
      return { success: false, errors: ['File is empty'] };
    }

    const delimiter = options.delimiter || ',';
    const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
    
    // Validate required headers
    if (options.requiredFields) {
      const missingFields = options.requiredFields.filter(field => 
        !headers.some(header => 
          header.toLowerCase() === field.toLowerCase()
        )
      );
      
      if (missingFields.length > 0) {
        return {
          success: false,
          errors: [`Missing required fields: ${missingFields.join(', ')}`]
        };
      }
    }

    const data = lines.slice(1)
      .filter(line => line.trim())
      .map((line, index) => {
        const values = parseCSVLine(line);
        const row: any = {};
        
        headers.forEach((header, i) => {
          row[header.toLowerCase().replace(/\s+/g, '_')] = values[i]?.trim() || '';
        });
        
        row._originalRowIndex = index + 2; // For error reporting
        return row;
      });

    return {
      success: true,
      data,
      message: `Successfully parsed ${data.length} rows`
    };
  } catch (error) {
    return {
      success: false,
      errors: [`Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`]
    };
  }
};

// JSON Import utility
export const importFromJSON = async (
  file: File,
  options: ImportOptions = {}
): Promise<ImportResult> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (!Array.isArray(data)) {
      return {
        success: false,
        errors: ['JSON file must contain an array of objects']
      };
    }
    
    // Validate required fields
    if (options.requiredFields && data.length > 0) {
      const firstItem = data[0];
      const missingFields = options.requiredFields.filter(field => 
        !(field in firstItem)
      );
      
      if (missingFields.length > 0) {
        return {
          success: false,
          errors: [`Missing required fields: ${missingFields.join(', ')}`]
        };
      }
    }

    return {
      success: true,
      data,
      message: `Successfully imported ${data.length} items`
    };
  } catch (error) {
    return {
      success: false,
      errors: [`Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`]
    };
  }
};

// Parse a single CSV line handling quoted values
const parseCSVLine = (line: string): string[] => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

// Generic data validator
export const validateImportData = (
  data: any[],
  validationRules: Record<string, (value: any) => boolean | string>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  data.forEach((row, index) => {
    Object.entries(validationRules).forEach(([field, validator]) => {
      const value = row[field];
      const result = validator(value);
      
      if (result !== true) {
        const errorMessage = typeof result === 'string' ? result : `Invalid value for ${field}`;
        errors.push(`Row ${index + 1}: ${errorMessage}`);
      }
    });
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Export data transformation utilities
export const transformImportData = (
  data: any[],
  transformRules: Record<string, (value: any) => any>
): any[] => {
  return data.map(row => {
    const transformed = { ...row };
    
    Object.entries(transformRules).forEach(([field, transformer]) => {
      if (field in transformed) {
        transformed[field] = transformer(transformed[field]);
      }
    });
    
    return transformed;
  });
};

// Common validation rules
export const commonValidationRules = {
  required: (value: any) => value != null && value !== '' ? true : 'This field is required',
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : 'Invalid email format',
  date: (value: string) => {
    if (!value) return true; // Optional date fields
    const date = new Date(value);
    return !isNaN(date.getTime()) ? true : 'Invalid date format';
  },
  number: (value: string) => !isNaN(Number(value)) ? true : 'Must be a valid number',
  priority: (value: string) => 
    ['low', 'medium', 'high', 'critical'].includes(value.toLowerCase()) ? true : 'Invalid priority',
  status: (value: string) => 
    ['draft', 'assigned', 'in_progress', 'completed', 'blocked'].includes(value.toLowerCase()) ? true : 'Invalid status'
};

// Common transformation rules
export const commonTransformRules = {
  toLowerCase: (value: string) => value?.toString().toLowerCase(),
  toNumber: (value: string) => parseInt(value) || 0,
  toDate: (value: string) => value ? new Date(value) : undefined,
  splitTags: (value: string) => value ? value.split(';').map(t => t.trim()).filter(t => t) : [],
  parseBoolean: (value: string) => value?.toLowerCase() === 'true' || value === '1'
};