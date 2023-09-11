import { ADD_TREE, SET_TREES } from './trees-actions';
import Tree from '../models/tree';

const initialState = {
    trees: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_TREE:
            const newTree = new Tree(
                action.treeData.id.toString(),
                action.treeData.title,
                action.treeData.image,
                action.treeData.address,
                action.treeData.coords.lat,
                action.treeData.coords.lng
            );
            return {
                trees: state.trees.concat(newTree)
            };
        case SET_TREES:
            return {
              trees: action.trees.map(
                pl =>
                  new Tree(
                    pl.id.toString(),
                    pl.title,
                    pl.imageUri,
                    pl.address,
                    pl.lat,
                    pl.lng
                  )
              )
            };        
    }
    return state;
};