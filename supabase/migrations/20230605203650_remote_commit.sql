create table "public"."extensions" (
    "id" uuid not null,
    "type" character varying(255),
    "settings" jsonb,
    "tenant_external_id" character varying(255),
    "inserted_at" timestamp(0) without time zone not null,
    "updated_at" timestamp(0) without time zone not null
);


create table "public"."schema_migrations" (
    "version" bigint not null,
    "inserted_at" timestamp(0) without time zone
);


create table "public"."tenants" (
    "id" uuid not null,
    "name" character varying(255),
    "external_id" character varying(255),
    "jwt_secret" character varying(500),
    "max_concurrent_users" integer not null default 200,
    "inserted_at" timestamp(0) without time zone not null,
    "updated_at" timestamp(0) without time zone not null,
    "max_events_per_second" integer not null default 100,
    "postgres_cdc_default" character varying(255) default 'postgres_cdc_rls'::character varying,
    "max_bytes_per_second" integer not null default 100000,
    "max_channels_per_client" integer not null default 100,
    "max_joins_per_second" integer not null default 500
);


create table "public"."wikistars" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "link" text not null default ''::text,
    "user_id" uuid not null,
    "title" text,
    "thumbnail_url" text
);


alter table "public"."wikistars" enable row level security;

CREATE UNIQUE INDEX extensions_pkey ON public.extensions USING btree (id);

CREATE UNIQUE INDEX extensions_tenant_external_id_type_index ON public.extensions USING btree (tenant_external_id, type);

CREATE UNIQUE INDEX schema_migrations_pkey ON public.schema_migrations USING btree (version);

CREATE UNIQUE INDEX tenants_external_id_index ON public.tenants USING btree (external_id);

CREATE UNIQUE INDEX tenants_pkey ON public.tenants USING btree (id);

CREATE UNIQUE INDEX wikilinks_pkey ON public.wikistars USING btree (id);

alter table "public"."extensions" add constraint "extensions_pkey" PRIMARY KEY using index "extensions_pkey";

alter table "public"."schema_migrations" add constraint "schema_migrations_pkey" PRIMARY KEY using index "schema_migrations_pkey";

alter table "public"."tenants" add constraint "tenants_pkey" PRIMARY KEY using index "tenants_pkey";

alter table "public"."wikistars" add constraint "wikilinks_pkey" PRIMARY KEY using index "wikilinks_pkey";

alter table "public"."extensions" add constraint "extensions_tenant_external_id_fkey" FOREIGN KEY (tenant_external_id) REFERENCES tenants(external_id) ON DELETE CASCADE not valid;

alter table "public"."extensions" validate constraint "extensions_tenant_external_id_fkey";

alter table "public"."wikistars" add constraint "wikistars_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."wikistars" validate constraint "wikistars_user_id_fkey";

create policy "Enable delete for users based on user_id"
on "public"."wikistars"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."wikistars"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."wikistars"
as permissive
for select
to public
using (true);



