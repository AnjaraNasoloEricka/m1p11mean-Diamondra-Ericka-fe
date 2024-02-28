export type ServiceType = {
  _id : string,
  label : string
}

export type User = {
  email : string,
  name : string,
  phoneNumber : string
}

export type Notification = {
  title : string, 
  body : string,
}

export enum Day { 
  Monday = "Monday", 
  Tuesday = "Tuesday", 
  Wednesday = "Wednesday", 
  Thursday = "Thursday", 
  Friday = "Friday", 
  Saturday = "Saturday", 
  Sunday = "Sunday" 
}

export enum ReductionType {
  "Percentage" = "Percentage",
  "Amount" = "Amount"
}