import {patch} from '@loopback/openapi-v3';
import {repository} from '@loopback/repository';
import {HttpErrors, del, get, getModelSchemaRef, param, post, requestBody, response} from '@loopback/rest';
import * as bcrypt from 'bcryptjs';
import {Users} from '../models';
import {UsersRepository} from '../repositories';

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  /**
   * Este endpoint es para crear usuarios.
   *
   * @param user Datos del usuario a crear.
   * @returns El usuario creado.
   */

  @post('createuser/api')
  @response(200, {
    description: 'crear un usuario',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(users.password, 10);
    const user = await this.usersRepository.create({...users, password: hashedPassword});
    return user;
  }


  @patch('/api/users/{id}')
  async updatePartialUserById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    }) user: Partial<Users>,
  ): Promise<Users | null> {
    const existingUser = await this.usersRepository.findById(id);

    if (!existingUser) {
      throw new HttpErrors.NotFound('Usuario no encontrado');
    }


    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }


    await this.usersRepository.updateById(id, user);


    const updatedUser = await this.usersRepository.findById(id);

    return updatedUser || null;
  }


  @del('/api/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteUserById(@param.path.string('id') id: string): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpErrors.NotFound('Usuario no encontrado');
    }

    await this.usersRepository.deleteById(id);

    // Devolver true para indicar que el usuario fue eliminado exitosamente
    return true;
  }

  @post('/login')

  @response(200, {description: 'Mensaje de éxito', content: {'application/json': {schema: {type: 'object', properties: {message: {type: 'string'}, user: {type: 'object'}}}}}})
  @response(401, {description: 'No autorizado', content: {'application/json': {schema: {type: 'object', properties: {error: {type: 'string'}}}}}})
  async login(
    @requestBody() credentials: {email: string, password: string},
  ): Promise<{message: string, user: Users}> {
    const {email, password} = credentials;

    const user = await this.usersRepository.findOne({where: {email}});

    if (!user) {
      throw new HttpErrors.Unauthorized('Correo electrónico o contraseña incorrecta');
    }

    // Comparar la contraseña encriptada almacenada con la contraseña proporcionada
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpErrors.Unauthorized('Correo electrónico o contraseña incorrecta');
    }


    return {message: 'Inicio de sesión exitoso', user: user};
  }

  @get('/api/all')
  @response(200, {
    description: 'Endpoint to get all users',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {'x-ts-type': Users},
        },
      },
    },
  })
  async find(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  @get('/api/users/{id}')
  async findUserById(@param.path.string('id') id: string): Promise<Users> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new HttpErrors.NotFound('Usuario no encontrado');
    }

    return user;
  }


}
