import mongoose, { Document } from 'mongoose';
export interface Group extends Document{
    name_group: string
}
