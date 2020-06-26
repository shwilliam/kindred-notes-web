# Kindred Notes

## Development

### Setup

#### 1. Clone this repo

```bash
git clone https://github.com/shwilliam/kindred-notes-web
```

#### 2. Install project dependencies

```bash
npm i
```

#### 3. Set up a database

- [Create a new database](https://www.prisma.io/docs/guides/database-workflows/setting-up-a-database)

> **Note**: Prisma supports PostgreSQL, MySQL and SQLite DBs so choose your
> favorite!

#### 3. Set up Mapbox

- [Create a new access token](https://account.mapbox.com/access-tokens/create)
  with public scopes enabled
- Whitelist any URLs you intend to use **(Optional)**

#### 4. Configure environment variables

- Copy `.env.example` to a new file named `.env.local`
- Replace the placeholder values in `.env.local` with your DB connection string
  and Mapbox key found in your [Mapbox dashboard](https://account.mapbox.com/access-tokens/)

### Testing

#### End-to-end

```bash
npm run dev

npm run test:e2e
```
