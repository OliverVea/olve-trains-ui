/** Severity level for log messages. Mirrors the server enum. */
export enum LogLevel {
  Debug = 0,
  Info,
  Warning,
  Error,
  Critical,
}

/** Log message entry returned by the backend API. */
export interface LogMessage {
  /** Severity level for the message. */
  level: LogLevel;
  /** Text of the log entry. */
  message: string;
  /** Optional file path associated with the event. */
  sourcePath?: string | null;
  /** Optional line number associated with the event. */
  sourceLine?: number | null;
  /** Timestamp in ISO8601 format. */
  time: string;
  /** Arbitrary classification tags. */
  tags?: string[] | null;
}
