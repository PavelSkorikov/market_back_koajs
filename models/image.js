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
  });
  Image.associate = function(models) {
    Image.belongsTo(models.Product, {
      foreignKey: 'ProductId',
      onDelete: 'CASCADE'
    });
  };

  return Image;
};