const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const productRouters = require("./routes/product.routes");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows us to accept JSON data in the req.body
app.use("/api/products", productRouters);

if (process.env.NODE_ENV === "production") {
  if (process.env.NODE_ENV === "production") {
    // Serve static files from frontend/dist
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Catch-all handler for all other routes
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
