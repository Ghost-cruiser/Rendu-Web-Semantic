"use strict";

module.exports = function (sequelize, DataTypes) {
    var Drawing = sequelize.define("Drawing", {  
        drawingCommands: DataTypes.TEXT("long"),
        image: DataTypes.BLOB,
    });
    
    return Drawing;
};