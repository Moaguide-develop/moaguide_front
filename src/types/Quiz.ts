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
