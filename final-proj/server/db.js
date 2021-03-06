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

module.exports.getThreads = (id) => {
    const q = `select * from threads where room_id = $1 order by created_at DESC`;
    const params = [id];
    return db.query(q, params);
};
module.exports.getUserThreads = (id) => {
    const q = `select * from threads where author_id = $1 order by created_at DESC`;
    const params = [id];
    return db.query(q, params);
};
module.exports.getRecentThreads = () => {
    const q = `select * from threads  order by created_at DESC LIMIT 10`;
    return db.query(q);
};

module.exports.getUserComments = (id) => {
    const q = `select * from comments where author_id = $1 order by created_at DESC`;
    const params = [id];
    return db.query(q, params);
};

module.exports.getBoardInfo = (id) => {
    const q = `select * from board_room where room_id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.createThread = (
    threadPic,
    color,
    topic,
    fpbp,
    room_id,
    author_id
) => {
    const q = `insert into
  threads (
    thread_foto,
    color,
    topic,
    comment,
    room_id,
    author_id
  )
VALUES
  (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
    ) returning *;`;
    const params = [threadPic, color, topic, fpbp, room_id, author_id];
    return db.query(q, params);
};

module.exports.addComment = (author_id, comment, thread_id, commentColor) => {
    const q = `insert into comments (author_id, comment, thread_id, color) VALUES ($1, $2, $3, $4);`;
    const params = [author_id, comment, thread_id, commentColor];
    return db.query(q, params);
};

module.exports.colorToUser = (author_id, color) => {
    const q = `insert into colors (author_id, color) VALUES ($1, $2);`;
    const params = [author_id, color];
    return db.query(q, params);
};

module.exports.getUserColor = (author_id) => {
    const q = `select * from colors where author_id = $1`;
    const params = [author_id];
    return db.query(q, params);
};

module.exports.getComment = (id) => {
    const q = `select * from comments where thread_id = $1 order by created_at ASC;`;
    const param = [id];
    return db.query(q, param);
};

module.exports.getThreadsById = (id) => {
    const q = `select thread_id from threads where author_id = $1`;
    const params = [id];
    return db.query(q, params);
};
module.exports.getFirstpost = (id) => {
    const q = `select * from threads where thread_id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.deletePost = (id) => {
    const q = `delete from threads where thread_id = $1`;
    const params = [id];
    return db.query(q, params);
};
module.exports.deleteComment = (id) => {
    const q = `delete from comments where comment_id = $1`;
    const params = [id];
    return db.query(q, params);
};
