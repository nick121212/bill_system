import { UserEntity } from "@bill/database";

export default function dataFilter(userEntity: UserEntity) {
  if (userEntity.role?.label === "admin") {
    return {};
  }

  return {
    companyId: userEntity.company?.id,
    userId: userEntity.id,
  };
}
