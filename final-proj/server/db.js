const spicedPg = require('spiced-pg');
const db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/finals'
);

module.exports.createNewBoard = (name, lat, lng) => {
    const q = `INSERT INTO board_room (name, lat, lng) VALUES ($1, $2, $3) RETURNING *`;
    const params = [name, lat, lng];
    return db.query(q, params);
};

module.exports.getMarkers = () => {
    const q = `select * from board_room`;
    return db.query(q);
};
