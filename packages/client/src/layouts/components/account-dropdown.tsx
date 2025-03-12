import React from "react";
import { Avatar, Divider, type MenuProps } from "antd";
import Dropdown, { type DropdownProps } from "antd/es/dropdown/dropdown";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { UserOutlined } from "@ant-design/icons";

import { useLoginStateContext } from "@/pages/sys/login/providers/LoginStateProvider";
import { useRouter } from "@/router/hooks";
import { useLogout, useUserActions, useUserInfo } from "@/store/userStore";
import { useTheme } from "@/theme/hooks";

import SettingButton from "./setting-button";

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
  const { replace } = useRouter();
  const { fullname, email } = useUserInfo();
  const { clearUserInfoAndToken } = useUserActions();
  const { backToLogin } = useLoginStateContext();
  const logoutAction = useLogout();

  const { t } = useTranslation();
  const logout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.log(error);
    } finally {
      clearUserInfoAndToken();
      backToLogin();
      replace("/login");
    }
  };
  const {
    themeVars: { colors, borderRadius, shadows },
  } = useTheme();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colors.background.default,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.dropdown,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  const dropdownRender: DropdownProps["dropdownRender"] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{fullname}</div>
        <div className="text-gray">{email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps["items"] = [
    {
      label: (
        <NavLink to="https://docs-admin.slashspaces.com/" target="_blank">
          {t("sys.docs")}
        </NavLink>
      ),
      key: "0",
    },
    {
      label: <NavLink to={HOMEPAGE}>{t("sys.menu.dashboard")}</NavLink>,
      key: "1",
    },
    // {
    // 	label: <NavLink to="/management/user/profile">{t("sys.menu.user.profile")}</NavLink>,
    // 	key: "2",
    // },
    {
      label: (
        <NavLink to="/management/user/account">
          {t("sys.menu.user.account")}
        </NavLink>
      ),
      key: "3",
    },
    {
      label: <SettingButton />,
      key: "2",
    },
    { type: "divider" },
    {
      label: (
        <button className="font-bold text-warning" type="button">
          {t("sys.login.logout")}
        </button>
      ),
      key: "4",
      onClick: logout,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      dropdownRender={dropdownRender}
    >
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  );
}
