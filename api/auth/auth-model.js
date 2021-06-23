const db = require('../data/db-config')

function findById(user_id) {
    return db('users')
        .select('user_id', 'username', 'password', 'user_type')
        .where('user_id', user_id)
        .first()
}

function findByUsername(username) {
    return db('users')
        .select('user_id', 'username', 'password', 'user_type')
        .where('username', username)
        .first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

module.exports = {
    findById,
    findByUsername,
    add
}    
