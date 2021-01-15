import { Controller,Get,Put,Post,Delete,Body,Param } from '@nestjs/common';
import { GroupsService } from "./groups.service";
import {CreateGroupDto} from "./dto/create-group.dto"
import { Group } from "./interfaces/group.interface"


@Controller('groups')
export class GroupsController {

    constructor(private readonly  groupsService : GroupsService){}

    @Get()
    findAll(): Promise <Group[]>{
        return this.groupsService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id): Promise<Group>{
        return this.groupsService.findOne(id)
    }

    @Post()
    create(@Body () CreateGroupDto : CreateGroupDto): Promise <Group>{
        return this.groupsService.create(CreateGroupDto);
    }

    @Delete(':id')
    destroy(@Param('id') id) : Promise<Group> {
        return this.groupsService.delete(id);
    };

    @Put(':id')
    update(@Body() updateGroupDto: CreateGroupDto, @Param('id') id): Promise<Group> {
        return this.groupsService.update(id, updateGroupDto)
    };

}
