'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    location: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    associate: function(models) {
      Image.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        onDelete: 'CASCADE'
      });
  }
    // associations can be defined here
  });
  return Image;
};