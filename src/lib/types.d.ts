import type { required_info_keys, required_entry_keys } from './XLSX';
import type { Row } from 'read-excel-file';

declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & {
	[brand]: TBrand;
};

export type Cell = string | number | boolean | typeof Date;

export type Validator_Result<T> = { ok: true; value: T } | { ok: false; message: string };

export type Cell_Validator<T> = (
	cell: Cell
) => { ok: true; value: T } | { ok: false; message: string };

// TODO: This type is very broken
export type Entry = Record<keyof required_entry_keys[0], unknown> & {
	Tags: string[];
};

export type Info = {
	[key: keyof required_info_keys]: string | null;
};

export type Narrative_Section = {
	Heading: string | null;
	'Markdown content': string | null;
	'Related source titles': string[];
};

export type Living_Bibliography = {
	info: Info;
	narrative: Narrative_Section[];
	entries: Entry[];
	author_defined_bibliography_keys: string[];
};

export type Process_XLSX_Result =
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
			author_defined_bibliography_keys: string[];
	  };

export type Workbook_Data = {
	sheet_names: string[];
	info_rows: Row[] | null;
	bib_rows: Row[] | null;
	narrative_rows: Row[] | null;
};
