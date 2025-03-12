export interface UserToken {
	accessToken?: string;
	refreshToken?: string;
}

export interface Organization {
	id: string;
	name: string;
	status: "enable" | "disable";
	desc?: string;
	order?: number;
	children?: Organization[];
}
