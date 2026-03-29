export interface TopicMeta {
  id: number;
  sem: number;
  title: string;
  desc: string;
}

export interface MCQuestion {
  q: string;
  opts: string[];
  ans: number;
  explain: string;
}

export interface TopicContent {
  meta: TopicMeta;
  notes: string | null;
  questions: MCQuestion[] | null;
}
