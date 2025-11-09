
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  design: string;
  color: string;
  type: string;
  category: string;
  texture: string;
}

export interface FilterValues {
  design: string;
  color: string;
  type: string;
  category: string;
  texture: string;
}
