![CI/CD](https://github.com/TDT4290-Gruppe-10/kegeland-api/actions/workflows/on-pull-request.yml/badge.svg)
[![codecov](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-api/branch/main/graph/badge.svg?token=WNR65GN461)](https://codecov.io/gh/TDT4290-Gruppe-10/kegeland-api)


## Getting started
Rename `.env.example` to `.env`. Thereby, you will need credentials for a google service account and a firebase web app.

### Configure service acccount
1. Go the dashboard for your firebase-project, and navigate to Project settings
2. Select the tab named **Service accounts**.
3. Make sure **Firebase Admin SDK** is selected, and press **Generate new private key**. This will download new credentials for a google service account.
4. Move the downloaded file to the root-directory of this project, and rename it to `firebase.config.json`.

### Configure Firebase SDK
1. Go the dashboard for your firebase-project, and navigate to Project settings
2. In the tab **General**, scroll to the section called **Your apps**.
3. Select a *Web App* and locate the code ```const firebaseConfig = {...}```
4. Copy these values to their respective fields in the `.env`-file you created. 
> **_NOTE_**: Make sure you don't have quotation-marks around the values.

Follow the steps under [Installation](#installation) and [Running the app](#running-the-app).

Once the app is running you can navigate to ```http://localhost:<SERVER_PORT>/api/docs``` for OpenApi-documentation of the endpoints.
> **_NOTE_**: `SERVER_PORT` is the value specified in your `.env`-file.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
