'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
        len: [2,250]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [2,250]
      }
    },
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