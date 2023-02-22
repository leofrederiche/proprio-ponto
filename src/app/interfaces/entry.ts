export interface EntrieInterface {
    visible: boolean,
    user: string,
    day: Date,
    description: string,
    work: string,
    balance: string,
    entries: string[]
}

export interface EntryInterface {
    entries: EntrieInterface[],
    totalBalance: string
}