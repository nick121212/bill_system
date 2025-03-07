export enum BasicStatus {
	DISABLE = 0,
	ENABLE = 1,
}

export enum ResultEnum {
	SUCCESS = "RET0000",

  KEY_NOT_EXIST = "RET0001",

  DUPLICATE_KEY = "RET0002",

  PARAMETER_VALIDATE_ERROR = "RET1111",

  UNKOWN_ERROR = "RET9999",

  SQL_ERROR = "RET8888"
}

export enum StorageEnum {
	UserInfo = "userInfo",
	UserToken = "userToken",
	Settings = "settings",
	I18N = "i18nextLng",
}

export enum ThemeMode {
	Light = "light",
	Dark = "dark",
}

export enum ThemeLayout {
	Vertical = "vertical",
	Horizontal = "horizontal",
	Mini = "mini",
}

export enum ThemeColorPresets {
	Default = "default",
	Cyan = "cyan",
	Purple = "purple",
	Blue = "blue",
	Orange = "orange",
	Red = "red",
}

export enum LocalEnum {
	en_US = "en_US",
	zh_CN = "zh_CN",
}

export enum MultiTabOperation {
	FULLSCREEN = "fullscreen",
	REFRESH = "refresh",
	CLOSE = "close",
	CLOSEOTHERS = "closeOthers",
	CLOSEALL = "closeAll",
	CLOSELEFT = "closeLeft",
	CLOSERIGHT = "closeRight",
}

export enum PermissionType {
	CATALOGUE = 0,
	MENU = 1,
	BUTTON = 2,
}
