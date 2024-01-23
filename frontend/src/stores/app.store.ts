import { action, makeAutoObservable, observable, runInAction } from "mobx";
import {
  deleteBoardById,
  getAllBoardsTitle,
  sendNewBoard,
  updateBoardById,
} from "../api/boards";
import { Board } from "../types";
import {
  COLUMN_DND_TYPE,
  TICKET_DND_TYPE,
  GET_DEFAULT_NEW_BOARD,
  GET_DEFAULT_NEW_COLUMN,
  GET_DEFAULT_NEW_TICKET,
} from "../constants";
import { DropResult } from "react-beautiful-dnd";

class AppStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable boards: Board[] = [];
  @observable selectedBoard: Board | null = null;
  @observable error = "";
  @observable loading = true;

  @action
  async init() {
    try {
      const boards = await getAllBoardsTitle();
      runInAction(() => {
        this.boards = boards;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      this.loading = false;
    }
  }

  @action
  setSelectedBoard(id: string) {
    const selectedBoard = this.boards.find((board) => board.id === id);

    runInAction(() => {
      this.selectedBoard = selectedBoard || null;
    });
  }

  @action
  addNewBoard = async () => {
    const newBoard = GET_DEFAULT_NEW_BOARD();
    this.selectedBoard = newBoard;
    this.boards = [...this.boards, newBoard];
    await sendNewBoard(newBoard);
  };

  @action
  deleteBoard = async () => {
    if (!this.selectedBoard) return;
    const boardId = this.selectedBoard.id;

    runInAction(() => {
      this.selectedBoard = null;
      this.boards = this.boards.filter((board) => board.id !== boardId);
    });

    await deleteBoardById(boardId);
  };

  @action
  changeBoardTitle = (title: string) => {
    if (!this.selectedBoard) return;
    const boardId = this.selectedBoard.id;
    const updatedBoard = { ...this.selectedBoard, title };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === boardId ? updatedBoard : board
      );
    });
  };

  @action
  deleteColumn(id: string) {
    if (!this.selectedBoard) return;

    const updatedBoard = {
      ...this.selectedBoard,
      columns: this.selectedBoard.columns.filter((column) => column.id !== id),
    };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      );
    });

    this.saveData();
  }

  @action
  changeColumnTitle(title: string, columnId: string) {
    if (!this.selectedBoard) return;

    const boardId = this.selectedBoard.id;

    const updatedBoard = {
      ...this.selectedBoard,
      columns: this.selectedBoard.columns.map((column) =>
        column.id === columnId ? { ...column, title } : column
      ),
    };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === boardId ? updatedBoard : board
      );
    });
  }

  @action
  addColumn = () => {
    if (!this.selectedBoard) return;

    const updatedBoard = {
      ...this.selectedBoard,
      columns: [...this.selectedBoard.columns, GET_DEFAULT_NEW_COLUMN()],
    };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      );
    });

    this.saveData();
  };

  @action
  deleteTicket(columnId: string, ticketId: string) {
    if (!this.selectedBoard) return;

    const updatedBoard = {
      ...this.selectedBoard,
      columns: this.selectedBoard.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tickets: column.tickets.filter(
                (ticket) => ticket.id !== ticketId
              ),
            }
          : column
      ),
    };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      );
    });

    this.saveData();
  }

  @action
  changeTicketData({
    columnId,
    ticketId,
    key,
    newText,
  }: {
    columnId: string;
    ticketId: string;
    key: "title" | "description";
    newText: string;
  }) {
    if (!this.selectedBoard) return;

    const updatedBoard = {
      ...this.selectedBoard,
      columns: this.selectedBoard.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tickets: column.tickets.map((ticket) =>
                ticket.id === ticketId ? { ...ticket, [key]: newText } : ticket
              ),
            }
          : column
      ),
    };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      );
    });
  }

  @action
  addTicket = (columnId: string) => {
    if (!this.selectedBoard) return;

    const updatedBoard = {
      ...this.selectedBoard,
      columns: this.selectedBoard.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tickets: [...column.tickets, GET_DEFAULT_NEW_TICKET()],
            }
          : column
      ),
    };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board
      );
    });

    this.saveData();
  };

  changeOrder = (result: DropResult) => {
    if (result.type === COLUMN_DND_TYPE) {
      this.setColumnOrder(result);
    }

    if (result.type === TICKET_DND_TYPE) {
      this.setTicketOrder(result);
    }
  };

  private setColumnOrder = (result: DropResult) => {
    const { destination, source } = result;
    if (!this.selectedBoard || !destination) return;

    const newColumns = Array.from(this.selectedBoard.columns);
    const [reorderedItem] = newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, reorderedItem);

    const boardId = this.selectedBoard.id;

    const updatedBoard = {
      ...this.selectedBoard,
      newColumns,
    };

    runInAction(() => {
      this.selectedBoard = updatedBoard;
      this.boards = this.boards.map((board) =>
        board.id === boardId ? updatedBoard : board
      );
    });

    this.saveData();
  };

  private setTicketOrder = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!this.selectedBoard || !destination) return;
    const sourceColumn = this.selectedBoard.columns.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = this.selectedBoard.columns.find(
      (column) => column.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) return;

    const ticketToMove = sourceColumn.tickets.find(
      (ticket) => ticket.id === draggableId
    );

    if (!ticketToMove) return;

    runInAction(() => {
      const updatedSelectedBoard = this.selectedBoard;
      if (!updatedSelectedBoard) return;

      updatedSelectedBoard.columns = updatedSelectedBoard.columns.map(
        (column) => {
          if (column.id === sourceColumn.id) {
            return {
              ...column,
              tickets: column.tickets.filter(
                (ticket) => ticket.id !== draggableId
              ),
            };
          }
          return column;
        }
      );

      updatedSelectedBoard.columns = updatedSelectedBoard.columns.map(
        (column) => {
          if (column.id === destinationColumn.id) {
            return {
              ...column,
              tickets: [
                ...column.tickets.slice(0, destination.index),
                ticketToMove,
                ...column.tickets.slice(destination.index),
              ],
            };
          }
          return column;
        }
      );

      this.selectedBoard = updatedSelectedBoard;
    });

    this.saveData();
  };

  saveData = async () => {
    if (!this.selectedBoard) return;
    await updateBoardById(this.selectedBoard.id, this.selectedBoard);
  };
}

export const appStore = new AppStore();
