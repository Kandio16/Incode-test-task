import express, { NextFunction, Request, Response } from 'express';
import { create, getAll, remove, update } from '~/services/boards';

export async function getAllBoards(req: Request, res: Response, next: NextFunction) {
  try {
    const boards = await getAll();

    res.status(200).json(boards);
  } catch (error) {
    console.error('Failed to get board', error);
    next(error);
  }
}

export async function addBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const newBoard = req.body;

    const response = await create(newBoard);

    res.status(201).json(response);
  } catch (error) {
    console.error('Failed to create board', error);
    res.status(500).json({ error: 'Failed to create board' });
    next(error);
  }
}

export async function deleteBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const boardId = req.params.id;

    const deletedBoard = await remove(boardId);

    if (deletedBoard) {
      res.status(200).json({ message: 'Board deleted successfully' });
    } else {
      res.status(404).json({ error: 'Board not found' });
    }
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Failed to delete board' });
  }
}

export async function editBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const boardId = req.params.id;
    const updatedData = req.body;

    await update(boardId, updatedData);

    res.status(200).json({ message: 'Board edited successfully' });
  } catch (error) {
    console.error('Failed to update board', error);
    res.status(500).json({ error: 'Failed to update board' });
    next(error);
  }
}
