import { PermissionType } from "../enums/PermissionType";
export declare class MenuEntity {
    id: number;
    parentId: number;
    label: string;
    name: string;
    icon: string;
    type: PermissionType;
    route: string;
    order: number;
}
