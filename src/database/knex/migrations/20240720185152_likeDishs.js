exports.up = knex=>knex.schema.createTable("like",table=>{
  table.increments("id")
  table.integer("dish_id").references("id").inTable("dish").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")

  table.timestamp("created_at").default(knex.fn.now())
}) 
  


exports.down = knex=>knex.schema.dropTable("like") 