export interface Result<T = unknown> {
	code: string;
	message: string;
	data?: T;
}
