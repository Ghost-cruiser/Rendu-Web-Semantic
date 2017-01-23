"use strict";

module.exports = function (sequelize, DataTypes) {
    var Parameter = sequelize.define("Parameter", {  
        facebook: DataTypes.BOOLEAN,
        google: DataTypes.BOOLEAN,
    }, {
            getterMethods: {
                getView: function () {
                    return {
                        facebook: this.getDataValue('facebook'),
                        google: this.getDataValue('google'),
                    }
                }
            }

        });
    
    return Parameter;
};