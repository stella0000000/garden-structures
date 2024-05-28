import express from "express";
import cors from "cors";
// import records from "./routes/record.js";
import plants from "./routes/plant.js";

const PORT = process.env.PORT || 5050;

// app.get("/api", (req, res) => {
//   console.log("server.js");
//   res.json({ message: "Hello from server!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

// const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/plants", plants);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
