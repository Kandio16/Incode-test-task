import axios from "axios";
import { Board } from "../types";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export async function getAllBoardsTitle() {
  try {
    const response = await apiClient.get("/boards");
    const boards = response.data;

    return boards;
  } catch (error: any) {
    const errorMessage = "Failed to get boards data";
    console.error(errorMessage, { error });

    error.message = errorMessage;
    throw error;
  }
}

export async function sendNewBoard(newBoard: Board) {
  try {
    const createResponse = await apiClient.post("/boards", newBoard);

    return createResponse;
  } catch (error: any) {
    const errorMessage = "Failed to send data";
    console.error(errorMessage, { error });

    error.message = errorMessage;
    throw error;
  }
}

export async function deleteBoardById(boardId: string) {
  try {
    const deleteResponse = await apiClient.delete(`/boards/${boardId}`);
    return deleteResponse;
  } catch (error: any) {
    const errorMessage = "Failed to delete board";
    console.error(errorMessage, { error });

    error.message = errorMessage;
    throw error;
  }
}

export async function updateBoardById(boardId: string, board: Board) {
  try {
    const updateResponse = await apiClient.patch(`/boards/${boardId}`, board);
    return updateResponse;
  } catch (error: any) {
    const errorMessage = "Failed to update board";
    console.error(errorMessage, { error });

    error.message = errorMessage;
    throw error;
  }
}
