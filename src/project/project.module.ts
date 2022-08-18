import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Project]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule { }
