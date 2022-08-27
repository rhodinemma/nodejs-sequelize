const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sample_db", "root", "", {
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

const Student = sequelize.define("students", {
  student_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const student_data = [
  { name: "John Baker" },
  { name: "Max Butler" },
  { name: "Ryan Fisher" },
  { name: "Robert Gray" },
  { name: "Sam Lewis" },
];

sequelize
  .sync({ force: true })
  .then(() => {
    Student.bulkCreate(student_data, { validate: true })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
