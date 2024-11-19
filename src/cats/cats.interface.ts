export class CatDto {
  constructor(props: CatDtoProps) {
    this.name = props.name;
    this.id = props.id;
  }
  name: string;
  id: number;
}
export interface CatDtoProps {
  readonly name: string;
  readonly id: number;
}
