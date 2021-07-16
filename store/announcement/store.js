import {createStore} from "redux";
import {itemReducer} from "./reducer.js";

const itemStore = createStore( itemReducer); 

export {itemStore};
