const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("student_db", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

sequelize
  .query("SELECT * FROM students WHERE student_id = ?", {
    replacements: ["03ae614f-3699-48e3-87e0-89e1f7dbfebd"],
    type: sequelize.QueryTypes.SELECT,
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Failed to get data ", error);
  });
