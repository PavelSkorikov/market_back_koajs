'use strict';

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    count_products: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Company.associate = function(models) {
    Company.hasMany(models.Product, {
      foreignKey: "CompanyId",
      onDelete: "CASCADE"
    });
  };
  return Company;
};