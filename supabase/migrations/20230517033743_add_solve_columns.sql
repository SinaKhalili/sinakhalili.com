alter table "public"."crosswordsolves" add column "board" jsonb;

alter table "public"."crosswordsolves" add column "opened_at" bigint;

alter table "public"."crosswordsolves" add column "secondsSpentSolving" integer;

