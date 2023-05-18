create extension plv8;
set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_stats()
 RETURNS json
 LANGUAGE plv8
AS $function$
  var num_affected = plv8.execute(`
WITH ranked_solves AS (
  SELECT user_id, puzzle_id, seconds_spent_solving,
    ROW_NUMBER() OVER (PARTITION BY puzzle_id ORDER BY seconds_spent_solving ASC) AS rank
  FROM crosswordsolves
  WHERE is_solved = true
)
SELECT crosswordusers.id,
  COUNT(CASE WHEN rank = 1 THEN 1 END)::INTEGER AS first_place_finishes,
  COUNT(CASE WHEN rank = 2 THEN 1 END)::INTEGER AS second_place_finishes,
  COUNT(*)::INTEGER AS total_solves_attempted
FROM ranked_solves
JOIN crosswordusers ON ranked_solves.user_id = crosswordusers.id
GROUP BY crosswordusers.id;
  `);

  // Convert BigInt values to integers
  num_affected.forEach(row => {
    row.id = parseInt(row.id);
    row.first_place_finishes = parseInt(row.first_place_finishes);
    row.second_place_finishes = parseInt(row.second_place_finishes);
  });

  return JSON.stringify(num_affected);
$function$
;
