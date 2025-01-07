import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Mode: ${process.env.NODE_ENV}`);
  console.log(`Server is running at http://localhost:${PORT}`);
});
