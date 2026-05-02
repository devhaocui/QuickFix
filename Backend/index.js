// NOTE: backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import noteRoute from "./routes/note.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoute);
app.use("/api/users", userRoute);

// NOTE: Connect mongoDB with mongoose with private url in a .env file.
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(3000, () => console.log("Running on http://localhost:3000"));
  })
  .catch((error) => {
    console.log("failed to connect mongooseDB", error.message);
  });

// HACK: At a high level, the backend operates as
// 1. (index.js) are all calls gets passed through this file.
// 2. (/models) are schemas for each type of data. Ensures correct data for each collection in DB.
// 3. (/routes) are files that handles specific api requests. talks to the DB (mongodb)

// NOTE: What data do we need for providers
// 1. user id
// 2. name
// 3. list of ratings
// 4. availability dates (only work fridays, or tuesdays, etc)
// 5. current schedule of appointments (ex. on May 17th there's 2 morning appointments)
// 6. Location of the provider
// 7. hourly rate for a specific job
// 8. profile picture (avatar)
// 9. profile description
// 10. work photos
