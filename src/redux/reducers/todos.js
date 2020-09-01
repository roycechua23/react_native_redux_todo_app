import {ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO} from '../actionTypes';

let todoID = 1;

const initialState = {
  todos_list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const {task} = action.payload;
      return {
        ...state,
        todos_list: [
          ...state.todos_list,
          {id: ++todoID, task: task, isDone: false},
        ],
      };
    }
    case TOGGLE_TODO: {
      const {id} = action.payload;
      const updatedItem = state.todos_list.find((element) => element.id === id);
      updatedItem.isDone = !updatedItem.isDone;

      return {
        ...state,
        todos_list: [
          ...state.todos_list.filter((element) => element.id != id),
          updatedItem,
        ],
      };
    }
    case DELETE_TODO: {
      const {id} = action.payload;

      return {
        ...state,
        todos_list: [...state.todos_list.filter((element) => element.id != id)],
      };
    }
    case EDIT_TODO: {
      const { id, task, isDone } = action.payload;
      return {
        ...state,
        todos_list: [
          ...state.todos_list.filter((element) => element.id != id),
          {id, task, isDone},
        ],
      };
    }
    default:
      return state;
  }
}
