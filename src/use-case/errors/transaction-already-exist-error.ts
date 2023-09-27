export class TransactionAlreadyExistError extends Error {
    constructor() {
        super('Transaction already exist!')
    }
}