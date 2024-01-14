import { parse } from 'csv-parse/sync';
import { CsvParsedData } from '../interfaces/record';

export default function parseCsv(file: Buffer): Array<CsvParsedData> {
  console.log('csvFile---->', file);
  const parsed = parse(file, {
    columns: true,
    skip_empty_lines: true,
  });
  console.log('parsed----->', parsed);
  return parsed;
}
