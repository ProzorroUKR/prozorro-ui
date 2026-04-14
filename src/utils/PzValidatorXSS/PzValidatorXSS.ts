import type { PzValidatorXSSQuery } from "./types";

/**
 * Utility class for sanitizing inputs and preventing XSS attacks.
 */
export class PzValidatorXSS {
  /**
   * Sanitizes a query object, removing HTML tags from all string values.
   *
   * @param query - The query object to sanitize.
   * @returns A new object with sanitized values.
   */
  static validQuery(query: PzValidatorXSSQuery): PzValidatorXSSQuery {
    const validParams: PzValidatorXSSQuery = {};

    Object.keys(query).forEach((key: string) => {
      const value = query[key];

      if (Array.isArray(value)) {
        validParams[key] = value.map(param => PzValidatorXSS.validString(param));
      } else {
        validParams[key] = PzValidatorXSS.validString(value);
      }
    });

    return validParams;
  }

  /**
   * Removes HTML tags from a string and trims the result.
   *
   * @param str - The string or number to sanitize.
   * @returns The sanitized string.
   */
  static validString(str: string | number): string {
    if (str === null || str === undefined) {
      return "";
    }

    return String(str)
      .replace(/<[^>]*>/gim, "")
      .trim();
  }
}
