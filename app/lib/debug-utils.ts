/**
 * Debug utilities for troubleshooting data issues
 */

/**
 * Safely stringify any object, handling circular references and special objects like Dates
 * @param obj The object to stringify
 * @returns A string representation of the object
 */
export function safeStringify(obj: any): string {
  try {
    // Handle null or undefined
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    
    // Use a replacer function to handle special cases
    return JSON.stringify(obj, (key, value) => {
      // Handle Date objects
      if (value instanceof Date) {
        return `Date(${value.toISOString()})`;
      }
      
      // Handle Firestore Timestamp objects
      if (value && typeof value === 'object' && value.toDate && typeof value.toDate === 'function') {
        return `Timestamp(${value.toDate().toISOString()})`;
      }
      
      // Handle Error objects
      if (value instanceof Error) {
        return `Error(${value.message})`;
      }
      
      // Handle functions
      if (typeof value === 'function') {
        return `Function(${value.name || 'anonymous'})`;
      }
      
      return value;
    }, 2);
  } catch (error) {
    return `[Error stringifying object: ${error instanceof Error ? error.message : String(error)}]`;
  }
}

/**
 * Validate radar chart data structure
 * @param data The radar data to validate
 * @returns An object with validation results and fixed data if needed
 */
export interface DataPoint {
  label: string;
  value: number;
}

export function validateRadarData(data: any): { 
  isValid: boolean; 
  fixedData: DataPoint[]; 
  errors: string[];
  warnings: string[];
} {
  const result = {
    isValid: true,
    fixedData: [] as DataPoint[],
    errors: [] as string[],
    warnings: [] as string[]
  };
  
  // Check if data is an array
  if (!Array.isArray(data)) {
    result.errors.push(`Data is not an array: ${typeof data}`);
    result.isValid = false;
    result.fixedData = [];
    return result;
  }
  
  // Empty array is valid but generates a warning
  if (data.length === 0) {
    result.warnings.push('Data array is empty');
    result.fixedData = [];
    return result;
  }
  
  // Validate each data point
  result.fixedData = data.map((point, index) => {
    // Check if point is an object
    if (typeof point !== 'object' || point === null) {
      result.errors.push(`Data point at index ${index} is not an object: ${typeof point}`);
      result.isValid = false;
      return { label: `Unknown ${index}`, value: 0 };
    }
    
    // Check if value property exists and is a number
    if (typeof point.value !== 'number' || isNaN(point.value)) {
      result.errors.push(`Value at index ${index} is not a number: ${point.value}`);
      result.isValid = false;
      return { label: point.label || `Unknown ${index}`, value: 0 };
    }
    
    // Ensure label is a string
    const label = point.label || `Unknown ${index}`;
    
    // Check if value is in range 0-1
    if (point.value < 0 || point.value > 1) {
      result.warnings.push(`Value out of range at index ${index}: ${point.value}`);
    }
    
    // Validate value range
    const value = Math.min(Math.max(point.value, 0), 1);
    
    return { label, value };
  });
  
  return result;
}

/**
 * Validate radar chart labels
 * @param labels The labels to validate
 * @param defaultLabels Default labels to use if needed
 * @returns An object with validation results and fixed labels if needed
 */
export function validateRadarLabels(
  labels: any, 
  defaultLabels: string[] = []
): {
  isValid: boolean;
  fixedLabels: string[];
  errors: string[];
  warnings: string[];
} {
  const result = {
    isValid: true,
    fixedLabels: [] as string[],
    errors: [] as string[],
    warnings: [] as string[]
  };
  
  // Check if labels is an array
  if (!Array.isArray(labels)) {
    result.errors.push(`Labels is not an array: ${typeof labels}`);
    result.isValid = false;
    result.fixedLabels = [...defaultLabels];
    return result;
  }
  
  // Empty array is valid but generates a warning
  if (labels.length === 0) {
    result.warnings.push('Labels array is empty');
    result.fixedLabels = [...defaultLabels];
    return result;
  }
  
  // Validate each label
  result.fixedLabels = labels.map((label, index) => {
    if (typeof label !== 'string') {
      result.warnings.push(`Label at index ${index} is not a string: ${typeof label}`);
      return String(label || `Label ${index}`);
    }
    return label;
  });
  
  return result;
}

export default {
  safeStringify,
  validateRadarData,
  validateRadarLabels
};