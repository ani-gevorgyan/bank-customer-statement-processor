import { XMLParser } from 'fast-xml-parser';
import { XmlParsedData } from '../interfaces/record';

export default function parseXML(file: Buffer): XmlParsedData {
    console.log('xmlFile---->', file);
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '_' });
    return parser.parse(file);
}