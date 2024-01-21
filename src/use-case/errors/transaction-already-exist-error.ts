import { UseCaseError } from "../../core/errors/use-case-error";

export class TransactionAlreadyExistError extends Error implements UseCaseError {
    constructor() {
        super('Transaction already exist!')
    }
}