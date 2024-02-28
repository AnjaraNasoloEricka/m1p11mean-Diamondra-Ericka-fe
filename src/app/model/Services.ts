export type Services = {
  _id: string,
  name: string,
  serviceType: string,
  price : number,
  description : string,
  duration : number,
  commissionRate : number,
  status: number,
  commissionValue: number,
  imageUrl : string
}

export type SpecialOffer = {
  _id : string, 
  startDate: Date,
  endDate: Date,
  services: Services[],
  reductionType: string,
  reductionValue: number,
  commissionRate: number,
  commissionValue: number,
}
