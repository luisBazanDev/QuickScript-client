export interface Register {
  wpm: number;
  time: number;
  total_words: number;
}

export interface Error {
  amount_errors: number;
  time: number;
}

export interface Language {
  id: number;
  name: string;
  display_name: string;
}

export interface Session {
  id: number;
  user_id: number;
  average_wpm: number;
  language: Language;
  precision: number;
  min_wpm: number;
  max_wpm: number;
  start_time: number;
  end_time: number;
  registers: Register[];
  errors: Error[];
}

export interface SessionContextType {
  session: Omit<Session, "id"> | null;
  addRegister: (register: Register) => void;
  addError: (error: Error) => void;
  start: () => void;
  duration: number | null;
  text: string | null;
  startTime: number | null;
  endTime: number | null;
  setEndTime: (time: number) => void;
  buildSession: () => void;
}

export interface UserType{
  id: number;
  username: string;
}