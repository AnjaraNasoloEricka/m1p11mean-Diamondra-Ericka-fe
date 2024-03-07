import { Appointment } from "./Appointment"

export type Task = {
    commission : number,
    toCome : Appointment[],
    inProgress : Appointment[],
    done : Appointment[],
}