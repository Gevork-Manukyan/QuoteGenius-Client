export interface Quote {
    author: string,
    text: string,
    datePublished: Date,
}

export interface QuoteWithAuthor {
    quoteText: string,
    datePublished: Date,
    authorName: string,
    authorBirthday: Date,
    authorRace: string,
    authorGender: string,
}