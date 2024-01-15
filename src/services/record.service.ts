import fs from 'fs';
import readFile from '../utils/readFile';
import parseXML from '../utils/parseXml';
import { RecordCheckResult, Record } from '../interfaces/record';
import { FILE_TYPE } from '../constants';
import parseCsv from '../utils/parseCsv';
import { generateCommonJsonObjFromParsedCsv, generateCommonJsonObjFromParsedXml } from '../utils/generateCommonJson';

class RecordService {

    processFile(fileData: Express.Multer.File): RecordCheckResult {
        const json = this.parseFileDataToCommonJson(fileData);
        return this.validateRecord(json);
    }

    removeFile(fileData: Express.Multer.File):  void {
        fs.unlinkSync(fileData.path);
    }

    parseFileDataToCommonJson(fileData: Express.Multer.File): Record[] {
        const file = readFile(fileData.path);
        let result: Record[] = [];
        if(fileData.mimetype === FILE_TYPE.XML) {
            const json = parseXML(file);
            result = generateCommonJsonObjFromParsedXml(json);
        }

        if(fileData.mimetype === FILE_TYPE.CSV) {
            const json = parseCsv(file);
            result = generateCommonJsonObjFromParsedCsv(json);
        }

        return result;
    }

    validateRecord(records: Record[]): RecordCheckResult {
        const duplicates = this.checkForDuplicates(records);
        const endBalanceCheckResult = this.checkEndBalance(records);
        return { duplicates, endBalanceCheckResult };
    }

    checkForDuplicates(records: Record[]): Record[] {
        let duplicates: Record[] = [];
        const refs = records.map((item) => item.reference);
        const duplicateRefs = refs.filter((item, index) => refs.indexOf(item) !== index);
        if(duplicateRefs.length) {
            duplicates = records.filter((item) => duplicateRefs.some((ref) => item.reference === ref));
        }
        return duplicates;
    }

    checkEndBalance(records: Record[]): Record[] {
        const result = records.filter((item) => {
            return Number((item.startBalance + item.mutation).toFixed(2)) !== item.endBalance;
        });
        return result;
    }
}

const recordService = new RecordService();
export default recordService;