"use strict";

module.exports = function (sequelize, DataTypes) {
    var Drawing = sequelize.define("Drawing", {  
        drawingCommands: DataTypes.TEXT("long"),
        picture: DataTypes.BLOB,
    });
    
    return Drawing;
};