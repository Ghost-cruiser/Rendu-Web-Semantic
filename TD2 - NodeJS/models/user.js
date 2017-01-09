"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.CHAR(65),
        password: DataTypes.CHAR(65),
        email: DataTypes.CHAR(65),
        name: DataTypes.CHAR(65),
        firstname: DataTypes.CHAR(65),
        tel: DataTypes.CHAR(16),
        website: DataTypes.CHAR(65),
        sexe: DataTypes.CHAR(1),
        birthdate: DataTypes.DATE,
        city : DataTypes.STRING,
        taille : DataTypes.INTEGER,
        couleur : DataTypes.CHAR(6),
        profilepic: DataTypes.BLOB,
        role: DataTypes.INTEGER,
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Drawing, {
                    onDelete: 'cascade'
                })
            }
        }
    });
    
    return User;
};