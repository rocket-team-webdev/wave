const app = require("./server");
const { config } = require("./config/config");

app.listen(config.app.port, () => {
  console.log(`Server running at port ${config.app.port}`);
});
