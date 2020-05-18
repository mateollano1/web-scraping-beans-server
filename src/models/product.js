module.exports = (sequelize, type) => {
    return sequelize.define('product', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        type_weight: type.STRING,
        price: type.STRING,
    })
}