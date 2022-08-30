module.exports = (sequelize, DataTypes) => {
  return sequelize.define('grafs', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    data: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};