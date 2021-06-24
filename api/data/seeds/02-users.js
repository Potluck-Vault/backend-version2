exports.seed = function (knex) {
        // Inserts seed entries
        return knex("users").insert([
          {
            email: "test@gpv.com",
            username: "EventMan",
            password:
              "$2b$10$dlapt8PB9kj4oCg.e3agBu7I.n5P8RYUzXGZkULLgTrxbyJjxa2Cy",
          }, // 1
          {
            email: "test@gpv.com",
            username: "funguyUsername",
            password:
              "$2b$10$dlapt8PB9kj4oCg.e3agBu7I.n5P8RYUzXGZkULLgTrxbyJjxa2Cy",
          }, {
            email: "test@gpv.com",
            username: "Pastor",
            password:
              "$2b$10$dlapt8PB9kj4oCg.e3agBu7I.n5P8RYUzXGZkULLgTrxbyJjxa2Cy",
          }, // 1
        ]);
    }