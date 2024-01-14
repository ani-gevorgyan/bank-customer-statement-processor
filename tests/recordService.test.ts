import { faker } from '@faker-js/faker';
import recordService from '../src/services/record.service';
import { Record } from '../src/interfaces/record';

describe('Test recordService', () => {

    const reference = faker.finance.routingNumber();
    const startBalance = Number(faker.finance.amount());
    const mutation = Number(faker.finance.amount());


    const recordWithIncorrectEndBalance: Record = {
        reference: faker.finance.routingNumber(),
        accountNumber: faker.finance.accountNumber(),
        description: faker.finance.transactionDescription(),
        startBalance: Number(faker.finance.amount()),
        mutation: Number(faker.finance.amount()),
        endBalance: Number(faker.finance.amount())
    };

    const recordWithRepeatingReference_1: Record = {
        reference: reference,
        accountNumber: faker.finance.accountNumber(),
        description: faker.finance.transactionDescription(),
        startBalance: startBalance,
        mutation: mutation,
        endBalance: startBalance + mutation
    };

    const recordWithRepeatingReference_2: Record = {
        reference: reference,
        accountNumber: faker.finance.accountNumber(),
        description: faker.finance.transactionDescription(),
        startBalance: startBalance,
        mutation: mutation,
        endBalance: startBalance + mutation
    };

    const recordWithCorrectEndBalance: Record = {
        reference: faker.finance.routingNumber(),
        accountNumber: faker.finance.accountNumber(),
        description: faker.finance.transactionDescription(),
        startBalance: startBalance,
        mutation: mutation,
        endBalance: startBalance + mutation
    };

    const records: Record[]  = [
        recordWithIncorrectEndBalance,
        recordWithRepeatingReference_1,
        recordWithRepeatingReference_2,
        recordWithCorrectEndBalance
    ];



    it('Should return the records with duplicate reference number!', () => {
        const result = recordService.checkForDuplicates(records);
        expect(result).toHaveLength(2);
        expect(result.length).toEqual(2);
        expect(result[0].reference).toEqual(result[1].reference);
        expect(result[0].reference).toEqual(reference);
        expect(result[1].reference).toEqual(reference);
        expect(result[0].accountNumber).toEqual(recordWithRepeatingReference_1.accountNumber);
        expect(result[1].accountNumber).toEqual(recordWithRepeatingReference_2.accountNumber);
    });

    it('Should return the records with incorrect End Balance!', () => {
        const result = recordService.checkEndBalance(records);
        expect(result).toHaveLength(1);
        expect(result[0].reference).toEqual(recordWithIncorrectEndBalance.reference);
    });
});