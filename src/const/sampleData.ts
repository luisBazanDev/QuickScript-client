import { Session, Register, Error, Language } from '../types';

export const sampleLanguage: Language = {
  id: 1,
  name: "en",
  display_name: "Spanish",
};

export const sampleRegisters: Register[] = [
  {
    wpm: 65,
    time: 120,
    total_words: 130,
  },
  {
    wpm: 70,
    time: 130,
    total_words: 140,
  },
];

export const sampleErrors: Error[] = [
  {
    amount_errors: 5,
    time: 100,
  },
  {
    amount_errors: 3,
    time: 110,
  },
];

export const mockSession: Omit<Session, "id"> = {
  user_id: 1,
  average_wpm: 67.5,
  language: sampleLanguage,
  precision: 98.2,
  min_wpm: 60,
  max_wpm: 75,
  start_time: 1609459200,
  end_time: 1609462800,
  registers: sampleRegisters,
  errors: sampleErrors,
};
