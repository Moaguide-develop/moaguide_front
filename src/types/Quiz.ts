export interface RankingEntry {
  name: string;
  score: number;
  time: string;
}

export interface IQuiz {
  Ranking: RankingEntry[];
}

export interface IQuizScore {
  score: number;
  fail: number;
  avag: number;
  plus: number;
  nickname: string;
  time: string;
}

export interface QuizTitle {
  id: number;
  title: string;
  questionRange: string;
  startDate: string;
  endDate: string;
  prize: string;
  questions: number;
  paymentDate: string;
  ranking: string;
}

export interface QuizResponse {
  quiz: QuizTitle;
}
