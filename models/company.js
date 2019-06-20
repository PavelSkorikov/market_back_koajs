'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    count_products: DataTypes.INTEGER
  }, {classMethods: {
      associate: function (models) {
        Company.hasMany(models.Product, {
          foreignKey: "CompanyId",
          onDelete: "CASCADE"
        });
      }
    }});

  return Company;
};