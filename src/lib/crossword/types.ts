export type Board = {
  cells: Array<any>;
};

type Calcs = {
  percentFilled: number;
  secondsSpentSolving: number;
  solved: boolean;
};

type Firsts = {
  opened: number;
  solved: number;
};

export type Puzzle = {
  board: Board;
  calcs: Calcs;
  firsts: Firsts;
  lastCommitID: string;
  lastSolve: number;
  minGuessTime: number;
  puzzleID: number;
  timestamp: number;
  userID: number;
};

export type SolveInfo = {
  puzzle_id: {
    date: string;
  };
  seconds_spent_solving: number;
  opened_at: number;
  board: Board;
};

export type LeaderboardItem = {
  created_at: string;
  id: number;
  name: string;
  is_password_protected: boolean;
};

export type LeaderboardItemResponse = {
  user_count: number;
  id: number;
  name: string;
  is_password_protected: boolean;
};
