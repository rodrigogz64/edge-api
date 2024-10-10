import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EdgeService } from './edge.service';
import { Edge } from './edge.entity';
import { CreateEdgeInput } from './dto/create-edge.input';

@Resolver(() => Edge)
export class EdgeResolver {
  constructor(private edgeService: EdgeService) {}

  @Query(() => [Edge])
  async getEdges(): Promise<Edge[]> {
    return this.edgeService.findAll();
  }

  @Query(() => Edge)
  async getEdge(@Args('id', { type: () => ID }) id: string): Promise<Edge> {
    return this.edgeService.findOne(id);
  }

  @Mutation(() => Edge)
  async createEdge(@Args('input') input: CreateEdgeInput): Promise<Edge> {
    return this.edgeService.create(input);
  }
}