export interface Record {
    accountNumber: string,
    description: string,
    startBalance: number,
    mutation: number,
    endBalance: number,
    reference: string
}

export interface RecordCheckResult {
    duplicates: Record[],
    endBalanceCheckResult: Record[]
}

export interface XmlParsedRecord {
    accountNumber: string,
    description: string,
    startBalance: number,
    mutation: number,
    endBalance: number,
    _reference: string
}

export interface XmlParsedData {
    records: {
        record: Array<XmlParsedRecord>
    }
}


export interface CsvParsedData {
    Reference: string,
    'Account Number': string,
    Description: string,
    'Start Balance': string,
    Mutation: string,
    'End Balance': string
}