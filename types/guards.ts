import { Budget } from './budget'

export const isBudget = (b:any) : b is Budget => {
    const entries = Object.entries(b);
    const lowercasedEntries = entries.map(([k,v]) => [k.toLocaleLowerCase(),v])
    const obj = Object.fromEntries(lowercasedEntries);
    return (typeof obj === 'object' && obj !== null && typeof obj.title === 'string')
}