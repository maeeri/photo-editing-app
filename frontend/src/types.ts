export interface ImageFormValues {
  prompt: string
  number: number
  size: Size
}

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface UserCreds {
  username: string,
  password: string
}

export interface User {
  username: string,
  id: string,
  token: string
}
