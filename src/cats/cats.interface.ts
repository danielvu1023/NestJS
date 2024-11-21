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

export class OrderDto {
  constructor(props: OrderDtoProps) {
    this.id = props.id;
    this.status = props.status;
  }
  id: number;
  status: number;
}

export interface OrderDtoProps {
  readonly id: number;
  readonly status: number;
}

export class Order {
  id: number;
  status: number;
}
