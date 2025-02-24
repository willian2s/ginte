export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
}

export interface MobileTableRowProps {
  client: Client;
  index: number;
  isSelected: boolean;
  onToggle: (index: number) => void;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    pages: number;
    currentPage: number;
    limit: number;
    prev: number | null;
    next: number | null;
  };
}
