const express = require("express");
const app = express();
const morgan = require("morgan");
const DB_Connected = require("./config/database");
app.use(express.json());

// connection to database
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
DB_Connected();

// Routes
const registerRoutes = require("./routes/auth/register.route");
const loginRoutes = require("./routes/auth/login.route");
const usersRoutes = require("./routes/users/user.route");
const productRoutes = require("./routes/products/products.route");


require("dotenv").config();
app.use(express.json());
// app.set("view engine", "ejs");

// ============= Auth =================
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
// ============ Product ===============
app.use("/product", productRoutes);
// ====================================
app.use("/user", usersRoutes);

if (process.env.ENV !== "production") {
  app.use(morgan("dev"));
}

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listen no port : ${PORT}`);
});
