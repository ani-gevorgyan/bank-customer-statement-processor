import { parse } from 'csv-parse/sync';
import { CsvParsedData } from '../interfaces/record';

export default function parseCsv(file: Buffer): Array<CsvParsedData> {
  return parse(file, {
    columns: true,
    skip_empty_lines: true,
  });
}
