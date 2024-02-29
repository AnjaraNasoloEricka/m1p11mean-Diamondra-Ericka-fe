import { Customer } from "./Customer"
import { Employees } from "./Employees"
import { Services, SpecialOffer } from "./Services"

export type Payment = {
    date: Date,
    amount: number
}

export type Appointment = {
    _id: string,
    startDateTime: Date,
    endDateTime: Date,
    services: Services[],
    specialOffers: SpecialOffer[],
    totalPrice: number,
    leftToPay: number,
    employee: Employees,
    client: Customer,
    payments: Payment[],
    status: string  
}