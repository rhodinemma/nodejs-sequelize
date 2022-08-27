const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("student_db", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

const Student = sequelize.define("students", {
  student_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Course = sequelize.define("courses", {
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const StudentCourse = sequelize.define("StudentCourse", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

const course_data = [
  { course_name: "Science" },
  { course_name: "Maths" },
  { course_name: "History" },
];

const student_data = [
  { name: "John Baker", courseId: 2 },
  { name: "Max Butler", courseId: 1 },
  { name: "Ryan Fisher", courseId: 3 },
  { name: "Robert Gray", courseId: 2 },
  { name: "Sam Lewis", courseId: 1 },
];

const student_course_data = [
  { studentId: 1, courseId: 1 },
  { studentId: 2, courseId: 1 },
  { studentId: 2, courseId: 3 },
  { studentId: 3, courseId: 2 },
  { studentId: 1, courseId: 2 },
];

// many-to-many relationship
Course.belongsToMany(Student, { through: "StudentCourse" });
Student.belongsToMany(Course, { through: "StudentCourse" });

sequelize
  .sync({ force: true })
  .then(() => {
    Course.bulkCreate(course_data, { validate: true })
      .then(() => {
        Student.bulkCreate(student_data, { validate: true })
          .then(() => {
            StudentCourse.bulkCreate(student_course_data, { validate: true })
              .then(() => {
                Course.findAll({
                  include: {
                    model: Student,
                  },
                })
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((error) => {
                    console.error("Failed to retrieve data : ", error);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
