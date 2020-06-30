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

#### 4. Create copy source file on Google Docs

- Create a new document on Google Docs
- Enable permissions for anyone with a link to view the document
- Copy the content from `copy.example.txt` into the document and modify the
  dummy text but do **not** modify any [[headers]].

#### 5. Configure environment variables

- Copy `.env.example` to a new file named `.env.local`
- Replace the placeholder values in `.env.local` with your DB connection string,
  Google Docs document ID and Mapbox key found in your [Mapbox dashboard](https://account.mapbox.com/access-tokens/)

### Testing

#### End-to-end

```bash
npm run dev

npm run test:e2e
```

### Deployment

#### Vercel

With its GitHub integration, [Vercel](https://vercel.com) makes deploying your
app including previews as easy as pushing your changes to GitHub. However, the
free (hobby) plan allows you to deploy a Next.js application with a maximum of
12 serverless functions. This means that to deploy this app on Vercel you would
need to upgrade to a paid account. Alternatively, you can deploy your app using
an alternate service such as Heroku.

#### Heroku

- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Create Heroku app by running `heroku create <APP_NAME>`
- Deploy to Heroku from the command-line

```bash
git add .
git commit -m 'deploy to heroku'
git push heroku master
```
