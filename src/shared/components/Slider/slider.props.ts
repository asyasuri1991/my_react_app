export interface ISlide {
  id: number;
  text: string;
  image: string;
}

export interface SliderProps {
  slides: ISlide[];
}