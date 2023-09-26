export class Transaction {
    public readonly id?: string

    public description: string
    public type: string
    public price: number
    public category: string
    public startDate?: Date

    constructor(props: Transaction) {
        if (props.id) {
            this.id = props.id
        }

        if (props.startDate) {
            this.startDate = props.startDate
        }

        this.description = props.description
        this.type = props.type
        this.price = props.price
        this.category = props.category
    }
}