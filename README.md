# API-KIOSK

![GitHub package.json version](https://img.shields.io/github/package-json/v/UniversityOfGdanskProjects/API-KIOSK?style=for-the-badge&color=white)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/UniversityOfGdanskProjects/API-KIOSK/dev/typescript?logo=typescript&style=for-the-badge)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/UniversityOfGdanskProjects/API-KIOSK/express?color=green&logo=express&style=for-the-badge)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/UniversityOfGdanskProjects/API-KIOSK/mongoose?color=lightgreen&logo=mongodb&style=for-the-badge)

## Description

API-KIOSK is a back-end project made for the University of Gdańsk. It will be used in the information kiosk located outside of the MFI building.

### Technologies

API-KIOSK uses:

-   [TypeScript](https://www.typescriptlang.org/)
-   [Express](https://expressjs.com/)
-   [MongoDB Atlas](https://www.mongodb.com/atlas/database) database

### Tests

This app uses [Jest](https://jestjs.io/) for both unit and coverage testing.

### CI & CD

CI pipeline runs on every pull request to any branch, while CD runs on every merge to `main` branch.

### Production site

You can check the deployment for [development](https://api-kiosk-dev.onrender.com) and for [production](https://api-kiosk-prod.onrender.com).

---

## Setup

In order to run this app, you need to have [Docker](https://www.docker.com/) (and [Docker Compose](https://docs.docker.com/compose/)) installed and running on your environment. You can check versions of both by running following commands:

```console
$ docker --version
Docker version 20.10.23, build 7155243
$ docker compose version
Docker Compose version v2.15.1
```

You also need [Yarn](https://yarnpkg.com/) to run scripts, add dependencies and install packages:

```console
$ yarn --version
1.22.19
```

---

## How to work with this repository

### Install

Clone repo:

```console
$ git clone https://github.com/UniversityOfGdanskProjects/API-KIOSK.git
```

or

```console
$ git clone git@github.com:UniversityOfGdanskProjects/API-KIOSK.git
```

After cloning:

```console
$ cd API-KIOSK
```

### Start development server

```console
$ yarn up
```

By default, the server starts on port 3001.

### Build production image

```console
$ docker build .
```

### Run unit tests inside container

```console
$ yarn test:unit
```

### Run coverage tests inside container

```console
$ yarn test:coverage
```

---

## Contribution

In order to contribute to the repository, check out the [contribution guide](docs/CONTRIBUTING.md).
