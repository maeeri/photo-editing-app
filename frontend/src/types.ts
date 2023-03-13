export interface ImageFormValues {
  prompt: string
  number: number
  size: Size
}

export interface ImageEditValues extends ImageFormValues {
  image: string
  mask: string
}

export enum Size {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum EditMode {
  Draw = 'draw',
  Erase = 'erase',
  Select = 'select',
}

export interface UserCreds {
  username: string
  password: string
}

export interface User {
  username: string
  id: string
  name: string
  role: string
}

export interface UploadImage {
  image: Blob
}

export interface Point {
  x: number
  y: number
}

export interface ModalProps {
  show: boolean
  setShow: (value: boolean) => void
}

export interface StrokeStyle {
  draw: Style,
  erase: Style,
  mode: EditMode
}

export interface Style {
  strokeWidth: number
  colour?: string
}
