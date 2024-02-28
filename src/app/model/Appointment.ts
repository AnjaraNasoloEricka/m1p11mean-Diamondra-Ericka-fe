import { Employees } from "./Employees"
import { Services } from "./Services"

export type Appointment = {
    _id: String,
    startDateTime,
    services: Services[],
    totalPrice,
    employee: Employees       
}