export interface Board {
  title: string;
  id: string;
  columns: Column[];
}

export interface Ticket {
  title: string;
  description: string;
  id: string;
}

export interface Column {
  title: string;
  tickets: Ticket[];
  id: string;
}
