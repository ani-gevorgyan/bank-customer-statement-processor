import { Router, Response, Request } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import multer from 'multer';
import recordService from '../../services/record.service';
import pdfServie from '../../services/pdf.service';
import fileFormatValidate from '../../middlewares/fileFormatValidator';


const router: Router = Router();
const upload = multer({ dest: './uploads' });

router.post('/record',
    upload.single('file'),
    asyncMiddlewareWrapper(fileFormatValidate),
    asyncMiddlewareWrapper(async (req: Request, res: Response) => {
        const { file } = req;

        const data = recordService.processFile(file!);
        recordService.removeFile(file!);

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=report.pdf'
        });

        pdfServie.buildPdf(
            (chunk: Buffer) => res.write(chunk),
            () => res.end(),
            data
        );

    }));

export default router;