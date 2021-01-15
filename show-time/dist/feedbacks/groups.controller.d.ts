import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./interfaces/group.interface";
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    findAll(): Promise<Group[]>;
    findOne(id: any): Promise<Group>;
    create(CreateGroupDto: CreateGroupDto): Promise<Group>;
    destroy(id: any): Promise<Group>;
    update(updateGroupDto: CreateGroupDto, id: any): Promise<Group>;
}
