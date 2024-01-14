import { XmlParsedData, XmlParsedRecord, Record, CsvParsedData } from '../interfaces/record';

export function generateCommonJsonObjFromParsedXml(xmlData: XmlParsedData): Array<Record> {
    const { record } = xmlData.records;
    return record.map((item: XmlParsedRecord) => {
        return {
            accountNumber: item.accountNumber,
            description: item.description,
            startBalance: item.startBalance,
            mutation: item.mutation,
            endBalance: item.endBalance,
            reference: item._reference
        };
    });
}


export function generateCommonJsonObjFromParsedCsv(csvData: CsvParsedData[]): Array<Record> {
    return csvData.map((item: CsvParsedData) => {
        return {
            accountNumber: item['Account Number'],
            description: item['Description'],
            startBalance: Number(item['Start Balance']),
            mutation: Number(item['Mutation']),
            endBalance: Number(item['End Balance']),
            reference: item['Reference']
        };
    });
}



