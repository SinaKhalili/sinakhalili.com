import { Puzzle } from "@/lib/crossword/types";
import { supabaseAdmin } from "./server";

export const addOrRefreshCrosswordUser = async (
  cookie: string,
  username: string,
  user_id: number
) => {
  const { data: users, error: error1 } = await supabaseAdmin
    .from("crosswordusers")
    .select("*")
    .eq("id", user_id);

  if (error1) {
    throw error1;
  }

  if (users.length > 0) {
    const { error: error2 } = await supabaseAdmin
      .from("crosswordusers")
      .update({ cookie, username })
      .eq("id", user_id);

    if (error2) {
      throw error2;
    }
  } else {
    const { error: error3 } = await supabaseAdmin
      .from("crosswordusers")
      .insert([{ cookie, username, id: user_id }]);

    if (error3) {
      throw error3;
    }
  }
};

export const getAllCrosswordUsers = async () => {
  const { data: users, error } = await supabaseAdmin
    .from("crosswordusers")
    .select("*");

  if (error) {
    throw error;
  }

  return users;
};

export const updatePuzzlesTable = async (puzzles: any[]) => {
  const values = puzzles.map((puzzle) => {
    return {
      id: puzzle.puzzle_id,
      date: puzzle.print_date,
    };
  });

  const { data, error } = await supabaseAdmin
    .from("crosswordpuzzles")
    .upsert(values, { onConflict: "id" });

  if (error) {
    throw error;
  }
  console.log(`Updated puzzle rows.`);
};

export const updateSolvesTable = async (user_id: number, solves: any[]) => {
  const values = solves.map((solve) => {
    return {
      user_id,
      puzzle_id: solve.puzzle_id,
      is_solved: solve.solved,
    };
  });

  const { data, error } = await supabaseAdmin
    .from("crosswordsolves")
    .upsert(values, { onConflict: "user_id,puzzle_id" });

  if (error) {
    throw error;
  }
  console.log(`Updated solve rows.`);
};

export const getCrosswordUser = async (user_id: string) => {
  const { data, error } = await supabaseAdmin
    .from("crosswordusers")
    .select("*")
    .eq("id", parseInt(user_id))
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getCrosswordUsers = async () => {
  const { data, error } = await supabaseAdmin
    .from("crosswordusers")
    .select("*");

  if (error) {
    throw error;
  }

  return data.map((user) => {
    return {
      user_id: user.id,
      username: user.username,
    };
  });
};

export const getSolves = async (user_id: string) => {
  const { data, error } = await supabaseAdmin
    .from("crosswordsolves")
    .select("puzzle_id")
    .eq("user_id", parseInt(user_id))
    .eq("is_solved", true);

  if (error) {
    throw error;
  }

  return data.map((solve) => solve.puzzle_id);
};

export const getSolvesFull = async (user_id: string) => {
  const { data, error } = await supabaseAdmin
    .from("crosswordsolves")
    .select(
      `
    board,
    seconds_spent_solving,
    opened_at,
    puzzle_id (
      date
    )
    `
    )
    .eq("user_id", parseInt(user_id))
    .eq("is_solved", true);

  if (error) {
    throw error;
  }

  return data;
};

export const enhanceSolveInformation = async (solveInformation: Puzzle[]) => {
  const puzzles = solveInformation.map((puzzle) => {
    return {
      user_id: puzzle.userID,
      puzzle_id: puzzle.puzzleID,
      seconds_spent_solving: puzzle.calcs.secondsSpentSolving,
      board: puzzle.board,
      opened_at: puzzle.firsts.opened,
    };
  });

  const { data, error } = await supabaseAdmin
    .from("crosswordsolves")
    .upsert(puzzles, { onConflict: "user_id,puzzle_id" });

  if (error) {
    throw error;
  }

  return data;
};

export const getStats = async () => {
  const { data, error } = await supabaseAdmin.rpc("get_stats");
  if (error) {
    throw error;
  }

  return data;
};
