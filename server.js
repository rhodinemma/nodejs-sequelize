const Sequelize = require("sequelize");
const sequelize = new Sequelize("learning_sequelize", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

// attempt to connect to database and test credentials
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to database: ", error);
  });
