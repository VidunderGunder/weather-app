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
OPENWEATHER_API_KEY=...
```

In your VSCode terminal, start development (given that your dependencies are done installing):

```bash
pnpm dev
```

## 🔐 Authentication (Optional)

[Clerk](https://clerk.dev) handles authentication.

To enable, [create a Clerk account](https://dashboard.clerk.dev/sign-up), [add a Clerk application](https://dashboard.clerk.dev/apps/new) and set the Clerk API keys in the `.env` file:

```env
CLERK_BACKEND_API=...
CLERK_FRONTEND_API=...
```
