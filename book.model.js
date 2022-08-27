const { Sequelize, DataType, DataTypes } = require("sequelize");

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

// define a model which represents a table in the database
// create a table called books and stores the book records accordingly
const Book = sequelize.define("books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
  },
  subject: {
    type: DataTypes.INTEGER,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Book table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table: ", error);
  });
