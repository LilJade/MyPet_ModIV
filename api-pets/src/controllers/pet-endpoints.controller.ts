import {
  repository
} from '@loopback/repository';

import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
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



  @get('/users/{id}/pets')
  @response(200, {
    description: 'obtener mascotas por usuario',
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


  @patch('/api/pets/{id}')
  async updatePetById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pet, {partial: true}),
        },
      },
    }) pet: Partial<Pet>,
  ): Promise<Pet | null> {
    const existingPet = await this.petRepository.findById(id);

    if (!existingPet) {
      throw new HttpErrors.NotFound('Usuario no encontrado');
    }


    await this.petRepository.updateById(id, pet);


    const updatedPet = await this.petRepository.findById(id);

    return updatedPet || null;
  }

  @del('/api/pets/{id}')
  @response(204, {
    description: 'Eliminar mascota',
  })
  async deletePetById(@param.path.string('id') id: string): Promise<boolean> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new HttpErrors.NotFound('Mascota no encontrada');
    }


    await this.petRepository.deleteById(id);


    return true;
  }


  @get('/api/pets')
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
  async getAllPets(): Promise<Pet[]> {
    // Obtener todas las mascotas
    return this.petRepository.find();
  }

}
