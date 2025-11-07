// src/server.ts
import app from "./app";
import { PORT } from "./config/env";

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} (NODE_ENV=${process.env.NODE_ENV})`);
});
