import { Session, Register, Error, Language, UserType } from '../types';

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
    wpm: 10,
    time: 3,
    total_words: 10,
  },
  {
    wpm: 7,
    time: 6,
    total_words: 17,
  },
  {
    wpm: 12,
    time: 9,
    total_words: 29,
  },
  {
    wpm: 11,
    time: 12,
    total_words: 40,
  },
  {
    wpm: 10,
    time: 15,
    total_words: 51,
  },
  {
    wpm: 12,
    time: 18,
    total_words: 63,
  },
  {
    wpm: 8,
    time: 21,
    total_words: 71,
  },
];

export const sampleErrors: Error[] = [
  {
    amount_errors: 5,
    time: 2,
  },
  {
    amount_errors: 3,
    time: 9,
  },
  {
    amount_errors: 7,
    time: 18,
  },
  {
    amount_errors: 2,
    time: 21,
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

export const sampleUser: UserType = {
    id: 1,
    username: "luisbazanramos" 
}