const express = require("express");
const next = require("next");
const morgan = require("morgan");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom middleware to log only SSR pages
  server.use((req, res, next) => {
    // Check if the request is for a static file
    if (req.path.startsWith("/_next/static/")) {
      return next();
    }

    // Use morgan to log the request if it's not a static file
    return morgan("[:date[clf]] :method :url :status :response-time ms")(
      req,
      res,
      next
    );
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
