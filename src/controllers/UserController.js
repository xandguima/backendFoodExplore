const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../service/UserCreateservice");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Preencher nome, email e senha");
    }


    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async updateRule(request, response) {
    const { name, email, rule } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first()

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.rule = rule ?? user.rule


    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      rule: user.rule,
      password: user.password,
      updated_at: knex.fn.now()
    })


    return response.status(200).json();
  }
}
module.exports = UsersController