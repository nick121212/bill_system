import { Modal } from "antd";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { UserEntity } from "@bill/database/esm";
import { useMutation } from "@tanstack/react-query";

import userService, { type SignInReq } from "@/api/services/userService";

import type { UserToken } from "#/entity";
import { StorageEnum } from "#/enum";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserEntity>;
  userToken: UserToken;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setUserInfo: (userInfo: UserEntity) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: {},
      userToken: {},
      actions: {
        setUserInfo: (userInfo) => {
          set({ userInfo });
        },
        setUserToken: (userToken) => {
          set({ userToken });
        },
        clearUserInfoAndToken() {
          set({ userInfo: {}, userToken: {} });
        },
      },
    }),
    {
      name: "userStore", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        [StorageEnum.UserInfo]: state.userInfo,
        [StorageEnum.UserToken]: state.userToken,
      }),
    }
  )
);

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () =>
  useUserStore((state) => state.userInfo?.permissions || []);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const navigatge = useNavigate();
  const { setUserToken, setUserInfo } = useUserActions();

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  });

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { user, accessToken, refreshToken } = res.data;
      setUserToken({ accessToken, refreshToken });
      setUserInfo(user);
      navigatge(HOMEPAGE, { replace: true });
      toast.success("Sign in success!");
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };

  return signIn;
};

export const useLogout = () => {
  const logoutMutation = useMutation({
    mutationFn: userService.logout,
  });

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };

  return logout;
};

export const useProfile = () => {
  const { setUserInfo } = useUserActions();

  const profileMutation = useMutation({
    mutationFn: userService.findById,
  });

  const profile = async () => {
    try {
      const res = await profileMutation.mutateAsync();
      res?.data && setUserInfo(res.data);

      if ((res.data.expireDay ?? 0) < 30) {
        Modal.warning({
          content: "账号有效期已不足30天, 请联系管理员续费。",
          title:"通知"
        });
      }

      if ((res.data.expireDay ?? 0) < 14) {
        Modal.warning({
          content: "账号有效期还剩半个月, 请联系管理员续费。",
          title:"通知"
        });
      }

      if ((res.data.expireDay ?? 0) < 7) {
        Modal.warning({
          content:"账号有效期还剩一周, 请联系管理员续费。",
          title:"通知"
        });
      }

      if ((res.data.expireDay ?? 0) < 0) {
        Modal.error({
          content:"账号已过期, 请联系管理员续费。",
          title:"通知"
        });
      }

      return res.data;
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };

  return profile;
}


export default useUserStore;
