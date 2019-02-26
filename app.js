var express = require("express"),
app = express(),
PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

/* routes:
/ -> homepage
*/

app.get("/", function(req, res) {
  res.render("home");
});

app.get("*", function(req, res) {
  res.send("Page not found");
});

app.listen(PORT, function() {
  console.log("Listening to learn-math website on port " + PORT);
});

