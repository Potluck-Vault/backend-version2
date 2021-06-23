exports.seed = function (knex) {
        // Inserts seed entries
        return knex("users").insert([
          {
            email: "test@gpv.com",
            username: "test",
            password:
              "$2b$10$dlapt8PB9kj4oCg.e3agBu7I.n5P8RYUzXGZkULLgTrxbyJjxa2Cy",
          }, // 1
          {
            email: "test2@gmail.com",
            username: "example",
            password:
              "$2b$10$meXVxr/s7VkWjaNIs5b5DODi8b6nqjQA6PwoNZoQ3G5whFcdGagju",
          }, // 2
        ]);
    }