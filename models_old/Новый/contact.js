'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    iso: DataTypes.STRING,
    phone: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    patronymic: DataTypes.STRING
  }, {});
  Contact.associate = function(models) {
    Contact.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };

  return Contact;
};