import { Request, Response, NextFunction } from 'express';
import { FILE_NOT_UPLOADED_ERROR_MESSAGE, FILE_TYPE, FILE_TYPE_ERROR_MESSAGE } from '../constants';
import BadRequestError from '../errors/BadRequestError';
import recordService from '../services/record.service';

const fileFormatValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { file } = req;
    console.log('file in middleware---->', file);

    if(!file) {
        throw new BadRequestError(FILE_NOT_UPLOADED_ERROR_MESSAGE);
    }

    console.log('file.mimetype in FILE_TYPE------->', file.mimetype in FILE_TYPE);

    if (!Object.values(FILE_TYPE).includes(file.mimetype as FILE_TYPE)) {
        recordService.removeFile(file);
        throw new BadRequestError(FILE_TYPE_ERROR_MESSAGE);
    }

    next();

};

export default fileFormatValidate;