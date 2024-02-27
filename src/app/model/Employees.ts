import { Day } from "./Type"

export type Employees = {
}

export type Schedule = {
  "_id": string,
  "startDate": Date,
  "endDate": Date,
  "day": Day[],
  "startHour": 3600,
  "endHour": 28800
}