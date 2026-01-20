
export interface CollectionItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface AIEditResponse {
  imageUrl?: string;
  text?: string;
  error?: string;
}
