import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge } from '../edges/edge.entity';
import { EDGE_QUEUE } from './rabbitmq.constants';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: Connection;
  private channel: Channel;

  constructor(
    @InjectRepository(Edge)
    private edgeRepository: Repository<Edge>,
  ) {}

  async onModuleInit() {
    await this.connect();
    await this.setupConsumer();
  }

  private async connect() {
    this.connection = await connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(EDGE_QUEUE);
  }

  async sendEdgeCreated(edge: Edge) {
    this.channel.sendToQueue(EDGE_QUEUE, Buffer.from(JSON.stringify(edge)));
  }

  private async setupConsumer() {
    this.channel.consume(EDGE_QUEUE, async (msg) => {
      if (msg) {
        const edge: Edge = JSON.parse(msg.content.toString());
        console.log(`New channel between ${edge.node1_alias} and ${edge.node2_alias} with a capacity of ${edge.capacity} has been created.`);

        const updatedEdge = await this.edgeRepository.findOne({ where: { id: edge.id } });
        if (updatedEdge) {
          updatedEdge.node1_alias = `${edge.node1_alias}-updated`;
          updatedEdge.node2_alias = `${edge.node2_alias}-updated`;
          await this.edgeRepository.save(updatedEdge);
        }

        this.channel.ack(msg);
      }
    });
  }
}