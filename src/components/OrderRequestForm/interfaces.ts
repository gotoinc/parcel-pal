export interface IOrderRequestForm {
  cityFrom: string
  cityTo: string
  parcelType: string
  dateOfDispatch: string
  parcelDescription: string
}

export interface IUpdateFieldEmit {
  fieldName: keyof IOrderRequestForm
  fieldValue: string
}
