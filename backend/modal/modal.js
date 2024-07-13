const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Student = sequelize.define('Student', {
  rollno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  sno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement:true
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'students',
  timestamps: false,
});

const Marks = sequelize.define('Mark', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rollno: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'rollno',
    },
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique:false
  },
  
  subject1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject3: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject4: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject5: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject6: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject7: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject8: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject9: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject10: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cgpa: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'marks',
  timestamps: false,
});

sequelize.sync();

module.exports = { Student, Marks };
