"use strict";

module.exports = function (sequelize, DataTypes) {
    var Drawing = sequelize.define("Drawing", {  
        userId: DataTypes.BIGINT,
        commands: DataTypes.TEXT("long"),
        drawing: DataTypes.BLOB,
    });
    
    return Drawing;
};