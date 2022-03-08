module.exports = (sequelize,DataTypes) => {
    const password = sequelize.define("password", {
        /*id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },*/
        websiteName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        emailOrUsername: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
        
        
    })
    return password;
};