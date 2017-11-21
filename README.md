# README.md

A self playing tic tac toe game

Find best move according to win-loss rate calculatin of next possible move

```
// db.getCollection('rounds').drop();
db.getCollection('rounds').count();

db.getCollection('rounds').find({winner: 'X'});

// db.getCollection('rounds').aggregate([
//     { $project: {
//         'state': true,
//         'move.i': true,
//         'move.j': true,
//         'next.state': true
//     } }
// ]);


db.getCollection('rounds').aggregate([
    { $match: { 'initiatedBy.state': "-OO-XX---" } },
    { $group: {
        _id: '$state',
        move: { $first: '$move' },
        'wins': { $sum: { $cond: [ { $eq: ["$winner", 'X'] },1,0 ] } },
        'losses': { $sum: { $cond: [ { $eq: ["$winner", 'O'] },1,0 ] } },
        'total': { $sum: 1 }
    } },
    { $sort: { total: -1 } }
// ], { explain: true })
])```
