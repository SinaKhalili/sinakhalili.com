alter table "public"."crosswordsolves" drop column "secondsSpentSolving";

alter table "public"."crosswordsolves" add column "seconds_spent_solving" integer;