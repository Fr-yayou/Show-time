import { SetMetadata } from '@nestjs/common';

export const Roles = (...isAdmin: number[]) => SetMetadata('isAdmin', isAdmin);