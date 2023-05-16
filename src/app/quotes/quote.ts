export interface Quote {
    author: string,
    text: string,
    datePublished: Date,
}

export interface QuoteWithAuthor {
    quoteText: string,
    datePublished: string,
    authorName: string,
    authorBirthday: Date,
    authorRace: string,
    authorGender: string,
}