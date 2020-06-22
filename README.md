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

#### 3. Set up a Firebase

- [Create a Firebase project](https://console.firebase.google.com/)
- Enable [Firestore](https://firebase.google.com/docs/firestore/)
- Register a web new app
- Install the [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)

- Authenticate the CLI tool by running `firebase login`
- Deploy Firebase cloud functions (`firebase deploy --only functions`)

> **Note**: If you are unsure about how to set up permissions for your development
> environment you can start your app in "test mode".

#### 3. Set up Mapbox

- [Create a new access token](https://account.mapbox.com/access-tokens/create)
  with public scopes enabled
- Whitelist any URLs you intend to use **(Optional)**

#### 4. Configure environment variables

- Copy `.env.example` to a new file, `.env.local`, and `.firebaserc.example` to
  `.firebaserc`
- Replace the placeholder values in these new files with those listed in your
  [Firebase console](https://console.firebase.google.com/) and
  [Mapbox dashboard](https://account.mapbox.com/access-tokens/)

### Testing

#### End-to-end

```bash
npm run test:e2e
```
