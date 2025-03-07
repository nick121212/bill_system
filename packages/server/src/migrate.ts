import * as crypto from "crypto";
import { EntityManager } from "typeorm";
import { RoleEntity, UserEntity } from "@bill/database/dist/entities";

import { ROLE_LIST, USER_LIST } from "./assets";

export default function migrationExecutor(em: EntityManager) {
  //   Promise.all(
  //     ROLE_LIST.map((r) => {
  //       return em.save(
  //         RoleEntity,
  //         new RoleEntity().extend({
  //           name: r.name,
  //           label: r.label,
  //           desc: r.desc,
  //           order: r.order,
  //           status: r.status,
  //         })
  //       );
  //     })
  //   );

  // Promise.all(
  //   USER_LIST.map((r) => {
  //     return em.save(
  //       UserEntity,
  //       new UserEntity().extend({
  //         avatar: r.avatar,
  //         email: r.email,
  //         address: "ceshi",
  //         fullname: r.username,
  //         password: crypto.hash("sha1", "demo1234"),
  //       })
  //     );
  //   })
  // );
}
