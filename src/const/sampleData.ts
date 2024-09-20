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

/*
Los registros se realizan each 3 seg, para evaluar las estadisticas por tic
*/
export const sampleRegisters: Register[] = [
  {
    wpm: 65,
    time: 60,
    total_words: 130,
    errors: 5,
  },
  {
    wpm: 70,
    time: 60,
    total_words: 140,
    errors: 3,
  },
];

/*
Los erros se toman cada 1 seg, siempre y cuando existan, sino, no existirán objetos
*/
export const sampleErrors: Error[] = [
  {
    amount_errors: 5,
    time: 60,
  },
  {
    amount_errors: 3,
    time: 60,
  },
];

export const sampleSession: Omit<Session, "id" | "user_id"> = {
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