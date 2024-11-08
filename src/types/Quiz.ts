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
export interface FailItem {
  explanation: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  choice5: string;
  link: string;
}

export interface ScoreData {
  score: number;
  faillist: FailItem[];
  failanswer: number[];
  plus: number;
  time: string;
}

export interface QuizFinishPageProps {
  scoreData: ScoreData;
  userName: string;
}
