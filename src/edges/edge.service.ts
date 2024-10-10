import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge } from './edge.entity';
import { CreateEdgeInput } from './dto/create-edge.input';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(Edge)
    private edgeRepository: Repository<Edge>,
    private rabbitMQService: RabbitMQService,
  ) {}

  async findAll(): Promise<Edge[]> {
    return this.edgeRepository.find();
  }

  async findOne(id: string): Promise<Edge> {
    return this.edgeRepository.findOneOrFail({ where: { id } });
  }

  async create(input: CreateEdgeInput): Promise<Edge> {
    const edge = this.edgeRepository.create({
      ...input,
      capacity: Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000,
    });

    const savedEdge = await this.edgeRepository.save(edge);
    await this.rabbitMQService.sendEdgeCreated(savedEdge);

    return savedEdge;
  }
}