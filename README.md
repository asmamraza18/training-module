## Training Module App

1. Run db `turso dev --db-file training.db` -- only run once for local development
2. Run the database UI `pnpm drizzle-kit studio`

### Migration steps
1. Modify schema at `./src/lib/db.ts`
2. Run `pnpm drizzle-kit generate` to generate new migration schema
3. Run `pnpm drizzle-kit migrate` to migrate new schema to database


### Docs
1. [Turso DB Local Development](https://docs.turso.tech/local-development#turso-cli)
2. [Drizzle ORM](https://orm.drizzle.team/docs/overview)