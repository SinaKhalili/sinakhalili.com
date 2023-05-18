CREATE UNIQUE INDEX unique_user_puzzle_id ON public.crosswordsolves USING btree (user_id, puzzle_id);

alter table "public"."crosswordsolves" add constraint "unique_user_puzzle_id" UNIQUE using index "unique_user_puzzle_id";