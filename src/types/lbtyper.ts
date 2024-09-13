export type LbChar = {
  letter: string;
  void: boolean;
  correct: boolean;
  extra: boolean;
};

export type LbWord = {
  word: string;
  type: "correct" | "error" | "void";
  chars: LbChar[];
};
