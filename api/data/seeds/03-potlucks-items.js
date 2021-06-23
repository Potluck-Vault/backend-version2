exports.seed = async function (knex) {
    await knex("potluck-guests").del();
    await knex("guests").del();
    await knex("potluck-items").del();
    await knex("items").del();
    await knex("potlucks").del();
  
    await knex("potlucks").insert([
      {  //1
        name: "seed potluck",
        date: "1/1/1",
        time: "1:00 AM",
        location: "123 potluck st",
        description: "seed data potluck for testing",
        image_url: "",
        user_id: 1,
      },
      {  //2
        name: "seed potluck 1",
        date: "2/2/2",
        time: "2:00 AM",
        location: "321 potluck st",
        description: "seed data potluck for testing part 2",
        image_url: "",
        user_id: 1,
      },
    ]);
    await knex("items").insert([
      { item: "sample",
        claimed: "true",
        claimedBy: "Soemone" }, //1

        { item: "example",
        claimed: "true",
        claimedBy: "Soemone Else" }, //2

      { item: "test" }, //3 
    ]);
    await knex("potluck-items").insert([
      { potluck_id: 1, item_id: 1 },
      { potluck_id: 1, item_id: 2 },
      { potluck_id: 2, item_id: 3 },
    ]);

    await knex("guests").insert([
        { guest: "bill",
        contact: "example@sample.com",
        rsvp: true,
        }, //1
        { guest: "sally",
        contact: "test@gmail.com",
        rsvp: false
        }, //2
    ]);

    await knex("potluck-guests").insert([
        { potluck_id: 1, guest_id: 1 },
        { potluck_id: 2, guest_id: 2 },
      ]);
  };
