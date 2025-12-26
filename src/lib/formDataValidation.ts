import { z } from "zod";

// Maximum sizes to prevent DoS attacks
const MAX_STRING_LENGTH = 10000;
const MAX_ARRAY_LENGTH = 1000;
const MAX_OBJECT_DEPTH = 10;
const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB

// Generic Fabric.js object schema
const fabricObjectSchema = z.object({
  type: z.string().max(50),
}).passthrough();

// Page canvas data schema
const pageCanvasDataSchema = z.record(
  z.string(),
  z.object({
    version: z.string().optional(),
    objects: z.array(fabricObjectSchema).max(MAX_ARRAY_LENGTH).optional(),
  }).passthrough()
);

// Form data schema for saved_forms
export const savedFormDataSchema = z.object({
  pageCanvasData: pageCanvasDataSchema.optional(),
}).passthrough();

/**
 * Sanitize a string by removing potential XSS vectors
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  
  // Remove script tags and event handlers
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+\s*=/gi, "data-removed=")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "");
  
  // Trim to max length
  if (sanitized.length > MAX_STRING_LENGTH) {
    sanitized = sanitized.substring(0, MAX_STRING_LENGTH);
  }
  
  return sanitized;
}

/**
 * Deep sanitize an object recursively
 */
export function deepSanitize(obj: unknown, depth = 0): unknown {
  if (depth > MAX_OBJECT_DEPTH) {
    return null;
  }

  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    return sanitizeString(obj);
  }

  if (typeof obj === "number" || typeof obj === "boolean") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const arr = obj as unknown[];
    const limited = arr.length > MAX_ARRAY_LENGTH ? arr.slice(0, MAX_ARRAY_LENGTH) : arr;
    return limited.map((item: unknown) => deepSanitize(item, depth + 1));
  }

  if (typeof obj === "object") {
    const sanitized: Record<string, unknown> = {};
    const entries = Object.entries(obj);
    
    for (const [key, value] of entries) {
      const sanitizedKey = sanitizeString(key);
      sanitized[sanitizedKey] = deepSanitize(value, depth + 1);
    }
    
    return sanitized;
  }

  return null;
}

/**
 * Validate and sanitize form data before saving
 */
export function validateAndSanitizeFormData(data: unknown): {
  isValid: boolean;
  data: unknown;
  error?: string;
} {
  try {
    // Check total size
    const jsonString = JSON.stringify(data);
    if (jsonString.length > MAX_TOTAL_SIZE) {
      return {
        isValid: false,
        data: null,
        error: "Form data exceeds maximum allowed size",
      };
    }

    // Deep sanitize the data
    const sanitized = deepSanitize(data);

    // Validate against schema
    const result = savedFormDataSchema.safeParse(sanitized);

    if (!result.success) {
      return {
        isValid: false,
        data: null,
        error: "Invalid form data structure",
      };
    }

    return {
      isValid: true,
      data: result.data,
    };
  } catch (error) {
    return {
      isValid: false,
      data: null,
      error: "Failed to validate form data",
    };
  }
}

/**
 * Validate form data when loading (less strict, just sanitize)
 */
export function sanitizeLoadedFormData(data: unknown): unknown {
  try {
    return deepSanitize(data);
  } catch {
    return null;
  }
}
