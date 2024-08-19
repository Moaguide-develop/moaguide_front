export interface MainReportType {
  id?: number;
  title: string;
  category: string;
  date: string;
}

export interface MainNews {
  id: number;
  title: string;
  category: string;
  link: string;
  date: string;
}

export interface MainReportNewsType {
  mainReport: MainReportType[];
  mainNews: MainNews[];
}

export interface RealtimeRankType {
  keyword: string;
  rank: number;
}

export interface IssueListItem {
  id: number;
  title: string;
  category: string;
  link: string;
  date: string;
}
