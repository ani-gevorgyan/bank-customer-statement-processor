import { readFileSync } from 'fs';

export default function readFile (path: string) {
    return readFileSync(`${process.cwd()}/${path}`);
}