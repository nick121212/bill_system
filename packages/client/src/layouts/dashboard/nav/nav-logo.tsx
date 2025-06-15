import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import Logo from "@/components/logo";
import { useSettings } from "@/store/settingStore";
import { useUserInfo } from "@/store/userStore";
import { cn } from "@/utils";

import { HEADER_HEIGHT } from "../config";
import { ThemeLayout } from "#/enum";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};
export default function NavLogo({ collapsed, onToggle }: Props) {
  const { themeLayout } = useSettings();
  const { company } = useUserInfo();

  return (
    <div
      style={{ height: `${HEADER_HEIGHT}px` }}
      className={cn("relative flex items-center py-4", {
        "justify-center": themeLayout === ThemeLayout.Mini,
      })}
    >
      <div className={cn("flex items-center", {})}>
        {/* <Logo /> */}
        {themeLayout !== ThemeLayout.Mini && (
          <span className="ml-2 text-xl font-bold text-primary mr-1 line-clamp-1">{company?.name}</span>
        )}
      </div>
      <div
        onClick={onToggle}
        onKeyDown={onToggle}
        className={cn(
          "absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none items-center justify-center rounded-full text-center md:flex border border-dashed border-border text-sm bg-bg-paper"
        )}
      >
        {collapsed ? (
          <RightOutlined className="text-xs text-text-disabled" />
        ) : (
          <LeftOutlined className="text-xs text-text-disabled" />
        )}
      </div>
    </div>
  );
}
