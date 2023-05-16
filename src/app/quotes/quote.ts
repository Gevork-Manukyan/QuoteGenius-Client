export interface Quote {
    authorName: string,
    quoteText: string,
    datePublished: Date,
}

export interface QuoteWithAuthor {
    quoteId: number,
    quoteText: string,
    datePublished: Date,
    datePublishedString: string,
    authorName: string,
    authorBirthday: Date,
    authorRace: string,
    authorGender: string,
}