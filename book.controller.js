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

// sequelize
//   .sync()
//   .then(() => {
//     Book.create({
//       title: "Clean Code",
//       author: "Rhodin Emmanuel Nagwere",
//       release_date: "2022-09-02",
//       subject: 3,
//     })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => {
//         console.error("Failed to create new record ", error);
//       });
//     console.log("New book record inserted successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create table: ", error);
//   });

// sequelize.sync().then(() => {
//   Book.findAll()
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error("Failed to retrieve data ", error);
//     });
// });

sequelize.sync().then(() => {
  Book.findOne({
    where: {
      id: "2",
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error("Failed to retrieve data ", error);
    });
});
