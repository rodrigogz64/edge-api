import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQService } from './rabbitmq.service';
import { Edge } from '../edges/edge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Edge])],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}