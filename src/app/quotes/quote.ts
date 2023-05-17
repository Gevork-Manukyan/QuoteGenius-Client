export interface Quote {
    authorName: string,
    quoteText: string,
    datePublished: Date,
}

export interface QuoteWithAuthor {
    quoteId: number,
    quoteText: string,
    datePublished: Date,
    authorId: number,
    authorName: string,
    authorBirthday: Date,
    authorRace: string,
    authorGender: string,
}


export interface QuoteWithAuthorDisplay extends QuoteWithAuthor {
    datePublishedString: string
}