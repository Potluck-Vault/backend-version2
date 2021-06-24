const db = require("../data/db-config");


//returns all potlucks
const getAll = async () => {
  const potlucks = await db("potlucks as p")
    .select(
      "p.id",
      "p.user_id",
      "u.username",
      "p.name",
      "p.date",
      "p.time",
      "p.location",
      "p.description",
      "p.image_url"
    )
    .join("users as u", "u.id", "p.user_id")
    .orderBy("p.id");

  return Promise.all(
    potlucks.map(async (potluck) => {
      const items = await db("items as i")
        .select("i.id", "i.item", "i.claimed", "i.claimedBy")
        .join("potluck-items as pi", "pi.item_id", "i.id")
        .where({ potluck_id: potluck.id });
    const guests = await db("guests as g")
        .select("g.id", "g.guest", "g.contact", "g.rsvp")
        .join("potluck-guests as pg", "pg.guest_id", "g.id")
        .where({ potluck_id: potluck.id });
      return {
        ...potluck,
        items:[
            ...items,
        ],
        guests: [
            ...guests
        ]
    };
    })
  );
};


//returns a potluck by id
const getById = async (potluck_id) => {
  const potluck = await db("potlucks as p")
  .select(
    "p.id",
    "p.user_id",
    "u.username",
    "p.name",
    "p.date",
    "p.time",
    "p.location",
    "p.description",
    "p.image_url"
  )
  .join("users as u", "u.id", "p.user_id")
    .where("p.id", potluck_id)
    .first();

  const items = await db("potluck-items as pi")
    .where({ potluck_id })
    .join("items as i", "i.id", "pi.item_id")
    .select("i.id", "i.item", "i.claimed", "i.claimedBy");

    const guests = await db("potluck-guests as pg")
    .where({ potluck_id })
    .join("guests as g", "g.id", "pg.guest_id")
    .select("g.id", "g.guest", "g.contact", "g.rsvp");

    return {
      ...potluck,
      items:[
          ...items,
      ],
      guests: [
          ...guests
      ]
  };
};


const getByUserId = async (user_id) => {
  const potlucks = await db("potlucks as p")
  .where("user_id", user_id)
  .select(
    "p.id",
    "u.username",
    "p.name",
    "p.date",
    "p.time",
    "p.location",
    "p.description",
    "p.image_url"
  )
  .join("users as u", "u.id", "p.user_id")
  .orderBy("p.id");

return Promise.all(
  potlucks.map(async (potluck) => {
    const items = await db("items as i")
      .select("i.item", "i.claimed", "i.claimedBy")
      .join("potluck-items as pi", "pi.item_id", "i.id")
      .where({ potluck_id: potluck.id });
  const guests = await db("guests as g")
      .select("g.guest", "g.contact", "g.rsvp")
      .join("potluck-guests as pg", "pg.guest_id", "g.id")
      .where({ potluck_id: potluck.id });
    return {
      ...potluck,
      items:[
          ...items,
      ],
      guests: [
          ...guests
      ]
  };
  })
);
    
   };
  


   //add new potluck to databases
   const insert = async (user_id, potluck) => {
    const { items, guests } = potluck;
    let potluck_id;


    await db.transaction(async (trx) => {
     
      // insert items
      const item_ids = await Promise.all(
        items.map(async (item) => {
          console.log(item.item, item.claimed, item.claimedBy)


          //Pulls the item info from the request
          const itemToSend = {
            item: item.item,
            claimed: item.claimed,
            claimedBy: item.claimedBy,
          }

          //send the items info to the item database, and returns item_id
          let item_id;
          let [{ id }] = await trx("items").insert(itemToSend, ["id"]);
          item_id = id;

          return item_id;
        })
      );


      // insert potluck
      const { description, name, date, time, location, image_url } = potluck;
      console.log(potluck)
      const [{ id }] = await trx("potlucks").insert(
        { description, name, date, time, location, image_url, user_id },
        ["id"]
      );
  
      potluck_id = id;
  
      // insert potluck_items
      await Promise.all(
        item_ids.map((item_id) => {
          return trx("potluck-items").insert({ item_id, potluck_id });
        })
      );
  
      // insert guests
      const guest_ids = await Promise.all(
        guests.map(async (guest) => {
          console.log(guest.guest, guest.contact, guest.rsvp)

          const guestToSend = {
            guest: guest.guest, 
            contact: guest.contact, 
            rsvp: guest.rsvp
          }

          let guest_id;
            let [{ id }] = await trx("guests").insert( guestToSend, ["id"]);
            guest_id = id;

          return guest_id;
        })
      );
  
      // insert potluck_guests
      await Promise.all(
        guest_ids.map((guest_id) => {
          return trx("potluck-guests").insert({ guest_id, potluck_id });
        })
      );
    })
      

  
    }

    // const remove = (id) => {
    //   return db("potlucks").where("id", id).first()
    //   };

module.exports = {
  getAll,
//   getAllBy,
  getById,
  getByUserId,
  insert,
//   remove,
//   update,
};