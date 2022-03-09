export interface Dish {
    name: string;
    cuisine: string;
    type: string;
    category: string;
    ingredients: string;
    selectedNumber: number;
    maxNumber: number;
    price: number;
    priceUSD: number;
    priceEUR: number;
    description: string;
    img: string[];
    rate: number;
    rateNumber: number,
    reviews: string[],
    emailReview: string[],
    emailRate: string[]
}