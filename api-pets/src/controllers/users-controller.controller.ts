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
   * Iniciar sesión de usuario.
   *
   * @operation('post', '/login') <-- Agregar esta anotación para especificar el endpoint y el verbo HTTP
   *
   * Este endpoint se utiliza para autenticar a los usuarios mediante su correo electrónico y contraseña.
   * Al recibir las credenciales, verifica si el usuario existe y si la contraseña es correcta.
   * Si la autenticación es exitosa, devuelve un mensaje de éxito junto con el objeto completo del usuario.
   *
   * @param credentials - Un objeto que contiene el correo electrónico y la contraseña del usuario.
   * @returns Un objeto con un mensaje de éxito y el objeto completo del usuario si la autenticación es exitosa.
   * @throws HttpErrors.Unauthorized - Si las credenciales son incorrectas o el usuario no existe.
   */


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
