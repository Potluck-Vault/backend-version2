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

// const getAllBy = async (query) => {
//   const recipes = await db("potlucks as p")
//     .select(
//         "p.id",
//         "u.username",
//         "p.name",
//         "p.date",
//         "p.time",
//         "p.location",
//         "p.description",
//         "p.image_url"
//     )
//     .join("sources as s", "s.id", "r.source_id")
//     .join("users as u", "u.id", "r.user_id")
//     .where(query);

//   return Promise.all(
//     recipes.map(async (recipe) => {
//       const categories = await db("categories as c")
//         .select("c.category")
//         .join("recipe_categories as rc", "rc.category_id", "c.id")
//         .where({ recipe_id: recipe.id });

//       return {
//         ...recipe,
//         categories: categories.map((category) => category.category),
//       };
//     })
//   );
// };

const getById = (id) => {
    return db("potlucks").where("id", id)
    };
  
const insert = async (potluck) => {
  const { items, guests } = potluck;
  let potluck_id;
  await db.transaction(async (trx) => {

    // insert items
    const item_ids = await Promise.all(
      items.map(async (item) => {
        let item_id;
          let [{ id }] = await trx("items").insert({ item }, ["id"]);
          item_id = id;
        return item_id;
      })
    );

    // insert potluck
    const { name, time, data, location, description, image_url } = potluck;
    const [{ id }] = await trx("potlucks").insert(
        { name, time, data, location, description, image_url, },
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
          let guest_id;
            let [{ id }] = await trx("guests").insert({ guest }, ["id"]);
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
  });

  return getById(potluck_id);
};

// const remove = async (id) => {
//   return db("recipes").where({ id }).del();
// };

// const update = async (id, recipe) => {
//   const { source, categories, steps, ingredients } = recipe;

//   await db.transaction(async (trx) => {
//     // insert source
//     let source_id;
//     if (source) {
//       const [existing_source] = await trx("sources").where({ source });
//       if (existing_source) {
//         source_id = existing_source.id;
//       } else {
//         let [{ id }] = await trx("sources").insert({ source }, ["id"]);
//         source_id = id;
//       }
//     }

//     if (categories && categories.length > 0) {
//       // insert categories track ids
//       const category_ids = await Promise.all(
//         categories.map(async (category) => {
//           let category_id;
//           const [existing_category] = await trx("categories").where({
//             category,
//           });
//           if (existing_category) {
//             category_id = existing_category.id;
//           } else {
//             let [{ id }] = await trx("categories").insert({ category }, ["id"]);
//             category_id = id;
//           }
//           return category_id;
//         })
//       );

//       // recipe_categories
//       await trx("recipe_categories").where({ recipe_id: id }).del();

//       await trx("recipe_categories").insert(
//         category_ids.map((category_id) => {
//           return { category_id, recipe_id: id };
//         })
//       );
//     }

//     // update recipe
//     const { description, title, image_url } = recipe;
//     await trx("recipes")
//       .where({ id })
//       .update({ description, title, image_url, source_id });

//     // steps
//     if (steps && steps.length > 0) {
//       // update steps with instructions
//       steps.map(async ({ step_number, instructions }) => {
//         const [step] = await trx("steps")
//           .where({ recipe_id: id, step_number })
//         if (step){
//           return trx("steps")
//             .where({ recipe_id: id, step_number })
//             .update({ instructions });
//         } else {
//           return trx("steps")
//             .insert({ step_number, instructions, recipe_id: id })
//         }
//       });

//       // delete extra steps
//       await trx("steps")
//         .where({ recipe_id: id, })
//         .andWhere("step_number", ">", steps.length)
//         .del();
//     }

//     //recipe_ingredients
//     if (ingredients && ingredients.length > 0) {
//       const ingredient_ids = await Promise.all(
//         ingredients.map(async (ingredient) => {
//           const { name, quantity, unit } = ingredient;
//           let ingredient_id;
//           const [existing_ingredient] = await trx("ingredients").where({
//             name,
//           });

//           let updated;
//           if (existing_ingredient) {
//             ingredient_id = existing_ingredient.id;
//             updated = await trx("recipe_ingredients")
//               .where({ recipe_id: id, ingredient_id })
//               .update({ quantity, unit });
//           } else {
//             const [{ id }] = await trx("ingredients").insert({ name }, ["id"]);
//             ingredient_id = id;
//           }

//           if (!updated) {
//             await trx("recipe_ingredients").insert({
//               recipe_id: id,
//               ingredient_id,
//               quantity,
//               unit,
//             });
//           }
//           return ingredient_id;
//         })
//       );
//       await trx("recipe_ingredients")
//         .where({ recipe_id: id })
//         .whereNotIn("ingredient_id", ingredient_ids)
//         .del();
//     }
//   });

//   return getById(id);
// };

module.exports = {
  getAll,
//   getAllBy,
  getById,
  insert,
//   remove,
//   update,
};