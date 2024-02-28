import { Customer } from "./Customer"
import { Employees } from "./Employees"
import { Services, SpecialOffers } from "./Services"

export type Payment = {
    date: Date,
    amount: number
}

export type Appointment = {
    _id: string,
    startDateTime: Date,
    endDateTime: Date,
    services: Services[],
    specialOffers: SpecialOffers[],
    totalPrice: number,
    leftToPay: number,
    employee: Employees,
    client: Customer,
    payments: Payment[],
    status: string  
}