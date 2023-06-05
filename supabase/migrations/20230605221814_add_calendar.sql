
drop policy "Enable delete for users based on user_id" on "public"."wikistars";

drop policy "Enable insert for authenticated users only" on "public"."wikistars";

drop policy "Enable read access for all users" on "public"."wikistars";

alter table "public"."wikistars" drop constraint "wikistars_user_id_fkey";

alter table "public"."wikistars" drop constraint "wikilinks_pkey";

drop index if exists "public"."wikilinks_pkey";

drop table "public"."wikistars";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_leaderboard_for_month(leaderboard_id integer, day text)
 RETURNS json
 LANGUAGE plv8
AS $function$
{
  var num_affected = plv8.execute(`
    SELECT
      cu.username,
      cs.seconds_spent_solving,
      RANK() OVER (PARTITION BY cp.date ORDER BY cs.seconds_spent_solving ASC) AS rank,
      cp.date AS solve_date
    FROM
      crosswordleaderboards cl
      JOIN crosswordleaderboards_users clu ON cl.id = clu.leaderboard_id
      JOIN crosswordusers cu ON clu.user_id = cu.id
      JOIN crosswordsolves cs ON cu.id = cs.user_id
      JOIN crosswordpuzzles cp ON cs.puzzle_id = cp.id
    WHERE
      cl.id = $1
      AND cp.date BETWEEN DATE($2) - INTERVAL '30 days' AND DATE($2)
    ORDER BY
      cp.date DESC, cs.seconds_spent_solving ASC;
  `, [leaderboard_id, day]);
  
  // Serialize JSON with custom replacer function to handle BigInt values
  return JSON.stringify(num_affected, (_, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  });
}
$function$
;

