const db = require("../data/db-config");

const getAll = async () => {
  const potlucks = await db("potlucks as p")
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

const getById = (id) => {
    return db("potlucks").where("id", id)
    };
  
const insert = async (potluckToBe) => {
  // console.log(potluckToBe.items[0])
  //     console.log(potluckToBe.items[0].item)
      const {
        user_id,
        name,
        date,
        time,
        location,
        description,
        image_url,
      } = potluckToBe

      const itemToBe = await potluckToBe.items.forEach((el, index) => {
        const {
          item,
          claimed,
          claimedBy,
        } = potluckToBe.items[index]
        const itemStructure = {
          item: item,
          claimed: claimed,
          claimedBy: claimedBy,
        }
        console.log(itemStructure)
        return itemStructure
      })

      const guestToBe = await potluckToBe.guests.forEach((el, index) => {
        const {
          guest,
          contact,
          rsvp,
        } = potluckToBe.guests[index]
        const guestStructure = {
          guest: guest,
          contact: contact,
          rsvp: rsvp,
        }
        console.log(guestStructure)
        return guestStructure
      })
      
      const potluckStructure = {
        user_id: user_id,
        name: name,
        date: date,
        time: time,
        location: location,
        description: description,
        image_url: image_url,
      }

      

        console.log(potluckStructure)
      try {
        return db('potlucks').insert(potluckStructure)
      } catch (err) {
        console.log("error code: ", err)
      }

      return potluckToBe;
    }

module.exports = {
  getAll,
//   getAllBy,
  getById,
  insert,
//   remove,
//   update,
};