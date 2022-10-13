export interface IDeliverRequestForm {
  cityFrom: string
  cityTo: string
  dateOfDispatch: string
}

export interface IUpdateFieldEmit {
  fieldName: keyof IDeliverRequestForm
  fieldValue: string
}