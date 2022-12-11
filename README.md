# Weather App

A cross-platform weather app built using [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) as a starting point.

## ✅ Requirements

- Cross-platform (iOS, Android, Web)
- Uses the [OpenWeatherMap API](https://openweathermap.org/api) to get weather data
- Users must be able to provide their location, and see the current weather, temperature, sunrise and sunset times

## 🚀 Getting Started

Install [Node.js](https://nodejs.org/en/download/)  
_Check engines in root `package.json` for correct version_

Install [pnpm](https://pnpm.io/installation#using-npm) using npm (unless you prefer another method)  
_Check engines in root `package.json` for correct version_

Install [VSCode](https://code.visualstudio.com/download)  
_Latest version_

Clone this project to your computer and open it in VSCode

Accept any recommendations given to you by VSCode after opening the project

Open a terminal in VSCode where your project is open

Install dependencies:

```bash
pnpm i
```

> Keep going while the dependencies install

[Create an OpenWeatherMap account](https://home.openweathermap.org/users/sign_up) and get an API key

[Provision a PostgreSQL database with Railway](https://railway.app/new) and get the database URL

In the project root, create a `.env` file with the following, and replace all `...`'s with your corresponding API keys:

```env
DATABASE_URL=...
OPEN_WEATHER_MAP_API_KEY=...
```

In your VSCode terminal, start development (given that your dependencies are done installing):

```bash
pnpm dev
```

## Quirks

This is a monorepo using [TurboRepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/).

As such, installing packages is a little different than you might be used to. We recommend quickly looking through the documentation of both to get a feel for how they work, if the tips below are insufficient.

### Installing packages

Here are some examples of how you typically would install packages using `pnpm` from the root:

```bash
pnpm i <package> --filter=expo
```

```bash
pnpm i -D <package> --filter=expo
```

```bash
pnpm i -D <package> --filter=expo --filter=web
```

> My experience is that `pnpm i` with filtering works the same from anywhere in the project, but other commands, for example `package.json`-scripts like `pnpm dev`, may vary. This may be wrong, so feel free to correct me.

To install packages using [Expo](https://docs.expo.io/) however, you need to specify location, for example by `cd`-ing in to the relevant directory.

For example, to install `expo-location` in the `expo` package:

```bash
cd packages/expo
pnpx expo install expo-location
```

> When installing packages using Expo, the docs most often use `npx`, but as we're using `pnpm`, we recommend using `pnpx` instead for the best experience, so:
>
> ❌ ~~`npx expo install expo-location`~~  
> ✅ `pnpx expo install expo-location`

## 🔐 Authentication (Optional)

[Clerk](https://clerk.dev) handles authentication.

To enable, [create a Clerk account](https://dashboard.clerk.dev/sign-up), [add a Clerk application](https://dashboard.clerk.dev/apps/new) and set the Clerk API keys in the `.env` file:

```env
CLERK_BACKEND_API=...
CLERK_FRONTEND_API=...
```
