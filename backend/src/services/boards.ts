import Boards from '../models/boards';

async function getAll() {
  return Boards.find();
}

async function create(data) {
  return new Boards(data).save();
}

async function remove(id) {
  return Boards.findOneAndDelete({ id });
}

async function update(boardId, updatedData) {
  return Boards.findOneAndUpdate({ id: boardId }, updatedData, { new: true });
}

export { getAll, create, update, remove };
