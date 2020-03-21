export interface HistoryState {
  items: HistoryItem[];
}

export interface HistoryItem {
  description: string;
  duration: number;
  timeCompleted: number;
  timeInitiated: number;
}
