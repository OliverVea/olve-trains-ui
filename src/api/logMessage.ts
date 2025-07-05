export enum LogLevel {
  Debug = 0,
  Info,
  Warning,
  Error,
  Critical,
}

export interface LogMessage {
  level: LogLevel;
  message: string;
  sourcePath?: string | null;
  sourceLine?: number | null;
  time: string; // ISO8601 string
  tags?: string[] | null;
}
