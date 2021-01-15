import { Group } from "./interfaces/group.interface";
import { Model } from "mongoose";
export declare class GroupsService {
    private readonly groupModel;
    constructor(groupModel: Model<Group>);
    findAll(): Promise<Group[]>;
    findOne(id: string): Promise<Group>;
    create(group: Group): Promise<Group>;
    delete(id: string): Promise<Group>;
    update(id: string, group: Group): Promise<Group>;
}
