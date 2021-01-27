'use strict';
const bcrypt = require("bcryptjs");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Users.hasMany(models.Posts, {
          onDelete: "cascade"
        });
        Users.hasMany(models.Friends)  
    }
  };
  Users.init({
    first_name: {type: DataTypes.STRING,
      allowNull: false},
    last_name: {type: DataTypes.STRING,
        allowNull: false},
    email:  {type: DataTypes.STRING,
      allowNull: false},
    phonenumber:  {type: DataTypes.STRING,
      allowNull: false},
    imageurl:  {type: DataTypes.STRING,
      allowNull: false},
    password:  {type: DataTypes.STRING,
      allowNull: false},
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.addHook("beforeCreate", user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Users;
};