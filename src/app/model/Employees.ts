import { Services } from "./Services";
import { Day, User } from "./Type"

export type Employees = {
  _id: string,
  user: User,
  serviceIds: Services[];
}

export type Schedule = {
  "_id": string,
  "startDate": Date,
  "endDate": Date,
  "day": Day[],
  "startHour": 3600,
  "endHour": 28800
}