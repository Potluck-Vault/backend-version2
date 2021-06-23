exports.up = function (knex) {
    return knex.schema
      .createTable("potlucks", (tbl) => {
        tbl.increments();
        tbl.string("name", 128).notNullable();
        tbl.string("date", 512);
        tbl.string("time", 512);
        tbl.string("location", 512);
        tbl.string("description", 512);
        tbl.string("image_url");
        tbl
          .integer("user_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("items", (tbl) => {
        tbl.increments();
        tbl.string("item", 100).notNullable();
        tbl.boolean("claimed")
        tbl.string("claimedBy", 100)
      })
      .createTable("potluck-items", (tbl) => {
        tbl.increments();
        tbl
          .integer("item_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("items")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("potluck_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("potlucks")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("guests", (tbl) => {
        tbl.increments();
        tbl.string("guest").notNullable().unique();
        tbl.string("contact")
        tbl.boolean("rsvp")
      })
      .createTable("potluck-guests", (tbl) => {
        tbl.increments();
        tbl
          .integer("potluck_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("items")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        tbl
          .integer("guest_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("guests")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      });
      
  };
  
  exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists("potluck-guests")
    .dropTableIfExists("guests")
      .dropTableIfExists("potluck-items")
      .dropTableIfExists("items")
      .dropTableIfExists("potlucks")
  };