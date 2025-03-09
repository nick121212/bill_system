import * as crypto from "crypto";
import { EntityManager } from "typeorm";
import {
  MenuEntity,
  RoleEntity,
  UserEntity,
} from "@bill/database/dist/entities";

import { ROLE_LIST, USER_LIST, PERMISSION_LIST } from "./assets";

async function addRoleData(em: EntityManager) {
  const menus = await em.find(MenuEntity, {});

  // await em.clear(UserEntity);
  // await em.clear(RoleEntity);

  return Promise.all(
    ROLE_LIST.map((r) => {
      return em.save(
        RoleEntity,
        new RoleEntity().extend({
          name: r.name,
          label: r.label,
          desc: r.desc,
          order: r.order,
          status: r.status,
          menus: menus,
        })
      );
    })
  );
}

async function addUserData(em: EntityManager) {
  const role1 = await em.findOneBy(RoleEntity, {
    name: "Admin",
  });
  const role2 = await em.findOneBy(RoleEntity, {
    name: "Test",
  });

  return Promise.all(
    USER_LIST.map((r, index) => {
      return em.save(
        UserEntity,
        new UserEntity().extend({
          avatar: r.avatar,
          email: r.email,
          address: "ceshi",
          fullname: r.username,
          password: crypto.hash("sha1", "demo1234"),
          role: index % 2 === 0 ? role1! : role2!,
        })
      );
    })
  );
}

async function addPermission(
  em: EntityManager,
  root?: MenuEntity | MenuEntity[],
  parent?: MenuEntity
) {
  if (root instanceof Array) {
    for (const element of root) {
      await addPermission(em, element, parent);
    }

    return;
  }

  const menu = new MenuEntity().extend({
    label: root?.label,
    name: root?.name,
    icon: root?.icon || "",
    type: root?.type,
    route: root?.route || "",
    order: root?.order || 1,
    component: root?.component || "",
    parent: parent,
  });

  await em.save(MenuEntity, menu);

  if (root?.children) {
    await addPermission(em, root.children as any, menu);
  }
}

export default async function migrationExecutor(em: EntityManager) {
  // await addPermission(em, PERMISSION_LIST as any);
  // await addRoleData(em);
  // await addUserData(em);
}
