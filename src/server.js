const app = require("./app");
const config = require("./config/config");

app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
