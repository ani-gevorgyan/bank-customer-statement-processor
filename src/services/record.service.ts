import fs from 'fs';
import readFile from '../utils/readFile';
import parseXML from '../utils/parseXml';
import { RecordCheckResult, Record } from '../interfaces/record';
import { FILE_TYPE } from '../constants';
import parseCsv from '../utils/parseCsv';
import { generateCommonJsonObjFromParsedCsv, generateCommonJsonObjFromParsedXml } from '../utils/generateCommonJson';

class RecordService {

    processFile(fileData: Express.Multer.File): RecordCheckResult {
        console.log('fileData---->', fileData);
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
        console.log('records---->', records[0]);
        const duplicates = this.checkForDuplicates(records);
        const endBalanceCheckResult = this.checkEndBalance(records);
        // console.log('duplicates---->', duplicates);
        // console.log('endBalanceCheck---->', endBalanceCheckResult);
        return { duplicates, endBalanceCheckResult };
    }

    checkForDuplicates(records: Record[]): Record[] {
        let duplicates: Record[] = [];
        const refs = records.map((item) => item.reference);
        console.log('refs---->', refs);
        const duplicateRefs = refs.filter((item, index) => refs.indexOf(item) !== index);
        console.log('duplicate refs---->', duplicateRefs);
        if(duplicateRefs.length) {
            duplicates = records.filter((item) => duplicateRefs.some((ref) => item.reference === ref));
        }
        return duplicates;
    }

    checkEndBalance(records: Record[]): Record[] {
        const result = records.filter((item) => {
            // console.log('item---->', item);
            // console.log('item.mutation---->', item.mutation);
            // console.log("item.startBalance + item.mutation---->", Number((item.startBalance + item.mutation).toFixed(2)))
            return Number((item.startBalance + item.mutation).toFixed(2)) !== item.endBalance;
        });
        return result;
    }
}

const recordService = new RecordService();
export default recordService;