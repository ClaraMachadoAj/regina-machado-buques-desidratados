import { createServer } from "./app";

const port = Number(process.env.PORT ?? 4174);
const app = createServer();

app.listen(port, () => {
  console.log(`Regina Machado API running at http://127.0.0.1:${port}`);
});
