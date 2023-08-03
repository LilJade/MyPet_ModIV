import {repository} from '@loopback/repository';
import {HttpErrors, get, getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
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
  @post('/api')
  @response(200, {
    description: 'Users model instance',
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

  /**
  * Endpoint para el inicio de sesión.
  *
  * @param credentials
  * @returns
  * @throws
  */
  @post('/login')
  @response(200, {description: 'Mensaje de éxito', content: {'application/json': {schema: {type: 'object', properties: {message: {type: 'string'}}}}}})
  @response(401, {description: 'No autorizado', content: {'application/json': {schema: {type: 'object', properties: {error: {type: 'string'}}}}}})
  async login(
    @requestBody() credentials: {email: string, password: string},
  ): Promise<{message: string}> {
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

    return {message: 'Inicio de sesión exitoso'};
  }

  @get('/api/all')
  @response(200, {
    description: 'Endpoint para obtener todos los usuarios',
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
    const filter = {
      include: [{relation: 'pets'}],
    };

    return this.usersRepository.find(filter);
  }
}
