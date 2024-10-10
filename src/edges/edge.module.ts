import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgeResolver } from './edge.resolver';
import { EdgeService } from './edge.service';
import { Edge } from './edge.entity';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [TypeOrmModule.forFeature([Edge]), RabbitMQModule],
  providers: [EdgeResolver, EdgeService],
})
export class EdgeModule {}