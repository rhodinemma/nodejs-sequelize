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
  .query("SELECT * FROM students WHERE student_id = :id", {
    replacements: { id: "893d81ea-4d19-49e2-9544-8b795074d3af" },
    type: sequelize.QueryTypes.SELECT,
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Failed to get data ", error);
  });
