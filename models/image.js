'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    location: {
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