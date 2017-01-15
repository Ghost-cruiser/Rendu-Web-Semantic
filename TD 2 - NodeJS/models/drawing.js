"use strict";

module.exports = function (sequelize, DataTypes) {
    var Drawing = sequelize.define("Drawing", {  
        commands: DataTypes.TEXT("long"),
        drawing: DataTypes.BLOB,
    });
    
    return Drawing;
};