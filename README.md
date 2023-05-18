# sinakhalili.com

Hello! Welcome to my website repo. 
It's created with next.js and deployed on Vercel.
The blog posts and notes are just `.md` files in the `posts` and `notes` directories.

It uses supabase for things that need database, like the crossword stuff.
Feel free to take, modify, read, and re-use whatever you see fit.

## Getting Started

You need all the classics: [yarn](https://yarnpkg.com/), [node](https://nodejs.org/en/), [git](https://git-scm.com/), [docker](https://www.docker.com/). The friends that always come out to play.


Clone the repo and install the dependencies with `yarn`

Start the supabase server with `yarn supabase start`

Then, you can run the development server:
```bash
yarn dev
```

## Migrations

To run migrations, you need to have the supabase server running. 

Then, you can diff the db migrations with:
```bash
yarn supabase db diff --schema public
```

Which will give you some sql (along with other output :sadge: ) that you can copy into a new migration file in `supabase/migrations`

To create that filename automatically, you can create the migration with:
```bash
yarn supabase migration new [NAME]
```

And finally, you can run the migrations with:
```bash
yarn supabase db reset
```