/** Detailed error information returned by failed backend operations. */
export interface ApiError {
  /** Human readable message describing the failure. */
  message: string;
  /** Categorization tags provided by the server. */
  tags: string[];
  /** Numeric severity from the backend. */
  severity: number;
  /** Optional arguments giving extra context. */
  args: unknown[];
  /** Source or component that produced the error. */
  source: string | null;
  /** Optional exception details. */
  exception: string | null;
  /** Location in the server source code where the error originated. */
  originInformation: {
    filePath: string;
    lineNumber: number;
    linkString: string;
  } | null;
}
