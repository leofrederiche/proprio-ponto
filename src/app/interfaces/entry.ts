export interface EntrieInterface {
    _id: string,
    visible: boolean,
    user: string,
    day: Date,
    description: string,
    work: string,
    balance: string,
    entries: string[]
}

export interface TotalEntrieInterface {
    entries: EntrieInterface[],
    totalBalance: string
}