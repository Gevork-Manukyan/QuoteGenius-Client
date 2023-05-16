export interface Quote {
    authorName: string,
    quoteText: string,
    datePublished: Date,
}

export interface QuoteWithAuthor {
    quoteId: number,
    quoteText: string,
    datePublished: string,
    authorName: string,
    authorBirthday: Date,
    authorRace: string,
    authorGender: string,
}