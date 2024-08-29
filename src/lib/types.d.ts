import type { required_info_keys, required_entry_keys } from './read_XLSX';

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & {
	[brand]: TBrand;
};

export type Cell = string | number | boolean | typeof Date;

export type Validator_Result<T> = { ok: true; value: T } | { ok: false; message: string };

export type Cell_Validator<T> = (
	cell: Cell
) => { ok: true; value: T } | { ok: false; message: string };

export type Entry = Record<keyof required_entry_keys, string | null> & {
	Tags: string[];
};

// export type Info = Record<keyof required_info_keys, string | null>;
export type Info = {
	[key: keyof required_info_keys]: string | null;
};

export type Narrative_Section = {
	Heading: string | null;
	Content: string | null; // Markdown string
	'Related source titles': string[];
};

export type Living_Bibliography = {
	info: Info;
	narrative: Narrative_Section[];
	entries: Entry[];
};

export type Read_XLSX_Result =
	| {
			ok: false;
			errors: string[];
	  }
	| {
			ok: true;
			data: Living_Bibliography;
	  };

export type Bib_Rows_Result =
	| {
			ok: false;
			errors: string[];
	  }
	| {
			ok: true;
			entries: Entry[];
	  };
