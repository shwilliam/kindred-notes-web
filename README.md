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

#### 3. Set up Firebase

- [Create a Firebase project](https://console.firebase.google.com/)
- Enable [Firestore](https://firebase.google.com/docs/firestore/)
  If you are unsure about how to set up permissions for your development environment
  you can start in "test mode".
- Register a web new app

#### 4. Copy `.env.example` to a new file, `.env.local`, and replace the placeholder

values with those listed in your [Firebase console](https://console.firebase.google.com/)

### Testing

#### End-to-end

```bash
npm run test:e2e
```
