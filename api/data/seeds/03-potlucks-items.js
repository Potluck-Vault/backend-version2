exports.seed = async function (knex) {
    await knex("potluck-guests").del();
    await knex("guests").del();
    await knex("potluck-items").del();
    await knex("items").del();
    await knex("potlucks").del();
  
    await knex("potlucks").insert([
      {  //1
        name: "Grandmas Potluck",
        date: "1/1/1",
        time: "1:00 AM",
        location: "100 Main St.",
        description: "Small get together for all family memebers",
        image_url: "",
        user_id: 1,
      },
      {  //1
        name: "The Best Potluck. Ever.",
        date: "2/2/2",
        time: "2:00 AM",
        location: "Downtown Portland",
        description: "City wide downtown portland potluck",
        image_url: "",
        user_id: 2,
      },
      {  //1
        name: "Sunday Church Potluck",
        date: "3/3/3",
        time: "3:00 AM",
        location: "546 Popular St.",
        description: "Regualr weekend church potluck",
        image_url: "",
        user_id: 3,
      },
      {  //1
        name: "Massive Sunday Church Potluck",
        date: "4/4/4",
        time: "4:00 AM",
        location: "546 Popular St.",
        description: "Church potluck for members and extended family",
        image_url: "",
        user_id: 3,
      },
    ]);
    
    await knex("guests").insert([
        { guest: "bill",
        contact: "example@sample.com",
        rsvp: true,
        }, //1
        { guest: "tom",
        contact: "test@gmail.com",
        rsvp: true,
        }, //2
        { guest: "booby",
        contact: "example@sample.com",
        rsvp: true,
        }, //1
        { guest: "sue",
        contact: "test@gmail.com",
        rsvp: true,
        }, //2
        { guest: "karen",
        contact: "example@sample.com",
        rsvp: true,
        }, //1
        { guest: "harry",
        contact: "test@gmail.com",
        rsvp: true,
        }, //2
        { guest: "ron",
        contact: "example@sample.com",
        rsvp: true,
        }, //1
        { guest: "secoya",
        contact: "test@gmail.com",
        rsvp: true,
        }, //2
    ]);

    await knex("potluck-guests").insert([
        { potluck_id: 1, guest_id: 1 },
        { potluck_id: 1, guest_id: 2 },
        { potluck_id: 2, guest_id: 3 },
        { potluck_id: 2, guest_id: 4 },
        { potluck_id: 3, guest_id: 5 },
        { potluck_id: 3, guest_id: 6 },
        { potluck_id: 4, guest_id: 7 },
        { potluck_id: 4, guest_id: 8 },
      ]);


      await knex("items").insert([
        { item: "cake",
          claimed: false,
          claimedBy: 1}, 
  
          { item: "drinks",
          claimed: false,
          claimedBy: 2},
  
          { item: "turkey",
          claimed: false,
          claimedBy: 3}, 
  
          { item: "tacos",
          claimed: false,
          claimedBy: 4},
  
          { item: "apples",
          claimed: false,
          claimedBy: 5}, 
  
          { item: "ice cream",
          claimed: false,
          claimedBy: 6},
  
          { item: "pie",
          claimed: false,
          claimedBy: 7}, 
  
          { item: "salad",
          claimed: false,
          claimedBy: null}, //3 
      ]);
      await knex("potluck-items").insert([
        { potluck_id: 1, item_id: 1 },
        { potluck_id: 1, item_id: 2 },
        { potluck_id: 2, item_id: 3 },
        { potluck_id: 2, item_id: 4 },
        { potluck_id: 3, item_id: 5 },
        { potluck_id: 3, item_id: 6 },
        { potluck_id: 4, item_id: 7 },
        { potluck_id: 4, item_id: 8 },
      ]);
  
  };
