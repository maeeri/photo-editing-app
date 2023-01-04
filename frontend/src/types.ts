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
