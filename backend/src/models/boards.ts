import mongoose, { Schema } from 'mongoose';

interface Ticket {
  id?: string;
  title?: string;
  description?: string;
}

interface Column {
  id?: string;
  title?: string;
  description?: string;
  tickets?: Ticket[];
}

interface Board {
  id?: string;
  title?: string;
  columns?: Column[];
}

const ticketSchema = new Schema<Ticket>({
  id: String,
  title: String,
  description: String,
});

const columnSchema = new Schema<Column>({
  id: String,
  title: String,
  description: String,
  tickets: [ticketSchema],
});

const boardSchema = new Schema<Board>({
  id: String,
  title: String,
  columns: [columnSchema],
});

export default mongoose.model('Boards', boardSchema);
