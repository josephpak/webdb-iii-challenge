
exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Web16'},
        {name: 'Web17'},
        {name: 'Web18'},
        {name: 'Web19'}
      ]);
    });
};
