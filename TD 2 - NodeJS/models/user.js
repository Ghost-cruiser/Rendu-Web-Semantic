"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        password: {
            type: DataTypes.CHAR(65),
            get: function () {
                return undefined;
            }
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
            type: DataTypes.DATE
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
                return '#' + this.getDataValue('couleur') || '000000';
            }
        },
        profilepic: {
            type: DataTypes.BLOB,

            get: function () {
                return "user" + '/' + this.getDataValue('id') + '/profilepic';
            }
        },

        role: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,

            get: function () {
                return this.getDataValue('role') ?
                    "admin" :
                    "user";
            }
        },

        facebookId: {
            type: DataTypes.STRING,
        }

    }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Drawing, {
                        onDelete: 'cascade'
                    })
                }
            },
            getterMethods: {
                session: function () {
                    return {
                        id: this.id,
                        role: this.role,
                        displayName: this.firstname,
                        couleur: this.couleur,
                        email: this.email
                    }
                }
            }

    });
    
    return User;
};