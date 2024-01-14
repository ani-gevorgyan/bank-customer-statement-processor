export const BASE_URL='/api/v1';

export enum FILE_TYPE {
    XML = 'application/xml',
    CSV ='text/csv'
}

export const DUPLICATE_MESSAGE = 'Find Duplicate Transaction References below: ';
export const END_BALLANCE_MESSAGE = 'Find below Incorrect End Balance for the provided Transactions: ';
export const VALIDATIONS_PASSED_MESSAGE = 'All validations are passed!';

export const PDF_TABLE_ORIGINAL_POSITION = 270;

export const FILE_NOT_UPLOADED_ERROR_MESSAGE = 'File is not uploaded!';
export const FILE_TYPE_ERROR_MESSAGE = 'File type must be either .xml or .csv!';