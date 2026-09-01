require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "8mb" }));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "uploads")),
);

app.use("/api", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`ACU CMS API listening on ${port}`));
