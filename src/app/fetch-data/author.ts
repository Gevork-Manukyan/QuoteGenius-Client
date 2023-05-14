import { Quote } from "../quotes/quote"
export interface Author {
    name: string,
    birthday: Date,
    race: string
    gender: string
    quotes: Quote[]
}