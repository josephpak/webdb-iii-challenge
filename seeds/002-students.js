
exports.seed = function(knex, Promise) {
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Nathan', cohort_id: 1},
        {name: 'Jess', cohort_id: 1},
        {name: 'Tom', cohort_id: 2}
      ]);
    });
};
