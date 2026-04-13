const app = require("./src/app");
require("dotenv").config();
const connectDB = require("./src/db/db.connect");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});   