# Weather App

A cross-platform weather app based on [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) and [all things Fernando Rojo](https://github.com/nandorojo) ([Solito](https://solito.dev/), [Dripsy](https://www.dripsy.xyz/), [Moti](https://moti.fyi/), etc.).

## ✅ Roadmap

- [x] Cross-platform (iOS, Android, Web)
- [x] Uses the [OpenWeatherMap API](https://openweathermap.org/api) to get weather data
- [x] Users must be able to provide their location, and see the current weather, temperature, sunrise and sunset times
- [x] Homepage
- [x] Location page
- [ ] Users can search for locations
- [ ] Users can add locations
- [ ] Persist locations with local storage
- [ ] Persist locations with a database
  - [x] Prisma
  - [x] tRPC
  - [ ] Authentication  
         _Looking at Clerk atm. Good peepz are working on getting NextAuth to work with Expo, which would be ideal_
  - [ ] Hooking it all up with the App
- [ ] User settings, like preferred units (metric, imperial, etc.)
  - [ ] Global state
    - [ ] Decide on and implement [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/), [Jotai](https://jotai.org/), [Zustand](https://zustand-demo.pmnd.rs/) or [Pullstate](https://lostpebble.github.io/pullstate/docs/quick-example)
    - If the settings are persisted in a database, React Query is probably the best option, as we don't have to worry about syncing the local state with the database state.
- [ ] Ensure good accessibility
- [ ] Proper error handling
  - [x] Homepage: Error message on fetch failure
  - [ ] Location: Error message on fetch failure
  - [ ] A sad screen for no internet connection 😭
- [ ] Testing
  - [x] Unit tests for cross library shared functions
  - [ ] End-to-end
    - [ ] Web
    - [ ] iOS
    - [ ] Android
- [ ] Proper CI/CD
  - [ ] Web
  - [ ] iOS
  - [ ] Android
- [ ] Fork and strip down to an opinionated template for the people

Will most likely never finish this, as it's mostly explorative play to figure out some cross-platfrom stuff I've been itching to experiment with.

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

In the project root, create a `.env.local` file with the following, and replace all `...`'s with your corresponding API keys:

```env
DATABASE_URL=...
NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY=...
```

Ensure you setup Expo to play nicely for your setup, by following [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)'s [Expo setup guide](https://github.com/t3-oss/create-t3-turbo#configure-expo-dev-script).

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

> When installing packages using Expo, the docs most often use `npx`, but as we're using `pnpm`, I recommend using `pnpx` instead for the best experience, so:
>
> ❌ ~~`npx expo install expo-location`~~  
> ✅ `pnpx expo install expo-location`

## 🔐 Authentication (☢️ WIP)

[Clerk](https://clerk.dev) handles authentication.

To enable, [create a Clerk account](https://dashboard.clerk.dev/sign-up), [add a Clerk application](https://dashboard.clerk.dev/apps/new) and set the Clerk API keys in the `.env` file:

```env
CLERK_BACKEND_API=...
NEXT_PUBLIC_CLERK_FRONTEND_API=...
```

## 🤯 Facing problems?

Below are ways to solve them.

### Generally

Restart your computer.

### Pulling changes from the repository

Always check for and install new dependecies when you pull changes from the repository:

```bash
pnpm i
```

### Wrong version of Node

- Check your version with
  ```bash
  node -v
  ```
- Install the correct version according to `engines` in `package.json`

### Wrong version of pnpm

Check your version with

```bash
pnpm -v
```

Install the correct version according to `engines` in `package.json`

### Using 32-bit version of Node

Getting `error Command failed with exit code 3221225477`?

Check if you're using 32-bit Node.js:

```bash
node -p "process.arch"
```

If so, install the 64-bit version instead.

Or buy a Mac.

### Divergent git branches

```bash
git config pull.rebase false
```
