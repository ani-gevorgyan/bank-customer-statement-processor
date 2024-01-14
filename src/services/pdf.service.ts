import PDFDocument from 'pdfkit';
import { 
    DUPLICATE_MESSAGE,
    END_BALLANCE_MESSAGE,
    PDF_TABLE_ORIGINAL_POSITION,
    VALIDATIONS_PASSED_MESSAGE
} from '../constants';
import { Record, RecordCheckResult } from '../interfaces/record';

class PDFServie {
    private tableTopPosition = PDF_TABLE_ORIGINAL_POSITION;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildPdf(dataCallback: any, endCallback: any, data: RecordCheckResult): void {
        const { duplicates, endBalanceCheckResult } = data;
        const doc = new PDFDocument({ margin: 50, font: 'Times-Roman' });
        doc.on('data', dataCallback);
        doc.on('end', endCallback);

        this.generateHeader(doc);
        if(duplicates.length) {
            this.genereateCustomInformation(doc, DUPLICATE_MESSAGE);
            this.generateReportTable(doc, duplicates);
        }
        if(endBalanceCheckResult.length) {
            this.genereateCustomInformation(doc, END_BALLANCE_MESSAGE);
            this.generateReportTable(doc, endBalanceCheckResult);
        }
        
        if(!duplicates.length && !endBalanceCheckResult.length) {
            this.genereateCustomInformation(doc, VALIDATIONS_PASSED_MESSAGE);
        }
        this.tableTopPosition = PDF_TABLE_ORIGINAL_POSITION;

        doc.end();
    }

    generateHeader(doc: PDFKit.PDFDocument): void {
        doc
        .fontSize(25)
		.text('The Bank', 110, 57)
		.fontSize(10)
		.text('123 Main Street', 200, 65, { align: 'right' })
		.text('New York, NY, 10025', 200, 80, { align: 'right' })
		.moveDown(10)
        .fontSize(20)
		.text('Report', 275)
        .moveDown();
    }

    genereateCustomInformation(doc: PDFKit.PDFDocument, info: string): void {
        doc
        .fontSize(10)
        .text(info, 50)
        .moveDown();
    }

    generateTableRow(doc: PDFKit.PDFDocument, y: number, reference: string, description: string): void {
        doc.fontSize(10)            
            .text(reference, 50, y)
            .text(description, 150, y);
    }

    generateReportTable(doc: PDFKit.PDFDocument, data: Record[]): void {
        const reportTableTop = this.tableTopPosition;
        let i,
            finalPos = 0;
            doc.font('Times-Bold');
            this.generateTableRow(
                doc,
                reportTableTop,
                'Reference',
                'Description',

            );
            doc.font('Times-Roman');
            this.generateHr(doc, reportTableTop + 20);
    
        for (i = 0; i < data.length; i++) {
            const item = data[i];
            const position = reportTableTop + (i + 1) * 30;
            finalPos = position;
            this.generateTableRow(
                doc,
                position,
                item.reference,
                item.description,
            );
        }
        this.generateHr(doc, finalPos + 20);
        this.tableTopPosition = finalPos + 80;
        doc.moveDown(4);
    }

    generateHr(doc: PDFKit.PDFDocument, y: number): void {
        doc
          .strokeColor('#aaaaaa')
          .lineWidth(1)
          .moveTo(50, y)
          .lineTo(550, y)
          .stroke();
    }
}

const pdfServie = new PDFServie();
export default pdfServie;