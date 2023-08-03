import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Pet} from '../models';
import {PetRepository, UsersRepository} from '../repositories';

export class PetEndpointsController {
  constructor(
    @repository(PetRepository)
    public petRepository: PetRepository,
    @repository(UsersRepository)
    public userRepository: UsersRepository,
  ) { }

  @post('/pets')
  @response(200, {
    description: 'Pet model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pet)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {
            title: 'NewPet',
            exclude: ['id'],
          }),
        },
      },
    })
    pet: Omit<Pet, 'id'>,
  ): Promise<Pet> {
    return this.petRepository.create(pet);
  }

  @get('/pets/count')
  @response(200, {
    description: 'Pet model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Pet) where?: Where<Pet>): Promise<Count> {
    return this.petRepository.count(where);
  }

  @get('/pets')
  @response(200, {
    description: 'Array of Pet model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pet, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Pet) filter?: Filter<Pet>): Promise<Pet[]> {
    return this.petRepository.find(filter);
  }

  @patch('/pets')
  @response(200, {
    description: 'Pet PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {partial: true}),
        },
      },
    })
    pet: Pet,
    @param.where(Pet) where?: Where<Pet>,
  ): Promise<Count> {
    return this.petRepository.updateAll(pet, where);
  }
  @get('/users/{id}/pets')
  @response(200, {
    description: 'Array of Pet model instances for the given user',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pet, {includeRelations: true}),
        },
      },
    },
  })
  async findPetsByUserId(@param.path.string('id') id: string): Promise<Pet[]> {
    // Buscar el usuario por ID
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Filtrar las mascotas del usuario por su ID
    const userPets = await this.petRepository.find({where: {userId: id}});

    return userPets;
  }

}
