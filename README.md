# What this repo is about
This repo is a Fullstack website made for connecting skillful individuals for hire, and matching them with customers that need those skills.

The goal of this project is to create an awesome user experience for both the clients and helpful individuals and make connecting them easily at a fair price. Some of our known competitors each have their flaws in terms of design decisions for the Frontend creating, and expensive pricing models. We are not making claims to fix those issues, but it is in our interest to do our best and see whether that can be achieved.

## Frontend
Vue.js + Vite | Shadcn-vue w/ VeeValidate | Javascript/Typescript

## Backend
Express.js | Bcrypt | SQLite (not yet implemented)

## Setup
1. Install `pnpm`
2. goto directory of `Frontend`, run command `pnpm install` to install package
3. Install express using `pnpm install express`
4. Install Bcrypt using `pnpm install bcrypt`
5. (Optional) Install Nodemon `pnpm install nodemon` for auto server restart upon detecting server file changes.

## Usage
1. Goto `Frontend` directory, run command `pnpm dev`. You should be able to go on the Localhost with any web browser. URL is `http://localhost:5173`
2. Goto `Backend` directory, run command `nodemon app.js` or if you didn't install NodeMon use `node app.js` to start the server. The NodeMon auto restarts the server whenever it detects changes from server files
