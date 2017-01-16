"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        password: {
            type: DataTypes.CHAR(65),
            allowNull: false,
        },
        email: {
            type: DataTypes.CHAR(65),
            allowNull: false,
        },
        name: DataTypes.CHAR(65),
        firstname: {
            type: DataTypes.CHAR(65),
            allowNull: false,
        },
        tel: DataTypes.CHAR(16),
        website: DataTypes.CHAR(65),
        sexe: {
            type: DataTypes.CHAR(1),
            defaultValue: 'O',
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        city : DataTypes.STRING,
        taille: {
            type: DataTypes.INTEGER(3),
            get: function () {
                return this.getDataValue('taille') / 100;
            },
            set: function (val) {
                this.setDataValue('taille', val * 100);
            },
        },
        couleur: {
            type: DataTypes.CHAR(6),
            set: function (val) {
                this.setDataValue('couleur', val.replace('#', ''));
            },
            get: function () {
                var couleur = this.getDataValue('couleur');
                return '#' + couleur;
            }
        },
        profilepic: DataTypes.BLOB,

        role: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

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