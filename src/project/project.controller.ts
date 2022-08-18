import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateProjectDto } from './dto/project-create.dto';
import { ProjectService } from './project.service';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {


    constructor(private readonly projectService: ProjectService) {

    }

    @Get()
    getAllProject(@Query() pageOptionsDto: { take; skip },
        @GetUser() getUser): Promise<{ data; count }> {
        return this.projectService.getAllProjects(pageOptionsDto, getUser.accountId);
    }

    @Post()
    createProject(@Body() createProject: CreateProjectDto, @GetUser() getUser) {
        console.log(createProject);
        createProject.createdBy = getUser.id;
        createProject.accountId = getUser.accountId;
        return this.projectService.createProject(createProject);
    }

}
