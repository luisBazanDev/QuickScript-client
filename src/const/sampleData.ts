import { Session, Register, Error, Language } from '../types';

export const sampleLanguage: Language = {
  id: 1,
  name: "es",
  display_name: "Spanish",
};

export const sampleLanguage2: Language = {
    id: 2,
    name: "en",
    display_name: "English",
};

export const sampleRegisters: Register[] = [
  {
    wpm: 65,
    time: 60,
    total_words: 130,
  },
  {
    wpm: 70,
    time: 55,
    total_words: 30,
  },
  {
    wpm: 50,
    time: 50,
    total_words: 40,
  },
  {
    wpm: 55,
    time: 45,
    total_words: 60,
  },
];

export const sampleErrors: Error[] = [
  {
    amount_errors: 5,
    time: 10,
  },
  {
    amount_errors: 3,
    time: 20,
  },
  {
    amount_errors: 7,
    time: 30,
  },
  {
    amount_errors: 2,
    time: 40,
  },
];

export const sampleSession: Omit<Session, "id"> = {
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
