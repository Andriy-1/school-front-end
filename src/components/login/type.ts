import { FormEvent } from "react";

export type FormLoginProps = {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
