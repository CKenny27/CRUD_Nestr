import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import { v4 as uuid } from 'uuid';


@Injectable()
export class PublishersService {
  private publishers: Publisher[] = [
    {
      id: uuid(),
      name: 'DC Comics',
      createdAT: new Date().getTime(),
    }
  ];

  create(createPublisherDto: CreatePublisherDto) {
    const {name} = createPublisherDto;
    const publisher: Publisher ={
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAT: new Date().getTime(),
    } 
    this.publishers.push(publisher);
    return publisher;
  }

  findAll() {
    return this.publishers;
  }

  findOne(id: string) {
    const publisher = this.publishers.find(publisher=>publisher.id===id);
    if (!publisher){
      throw new NotFoundException(`Brand with id #${id} not found!`);
    }
    return publisher;
  }

  update(id: string, updatePublisherDto: UpdatePublisherDto) {
    let publisherBD = this.findOne(id);
    this.publishers.map(publisher => {
      if(publisher.id===id){
        publisherBD.updatedAT = new Date().getTime();
        publisherBD = { ...publisherBD, ...updatePublisherDto}
        return publisher;
      }
    });
    return publisherBD;
  }

  remove(id: string) {
    this.publishers = this.publishers.filter(publisher => publisher.id !== id);
  }
}
