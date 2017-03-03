import { compose, createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import layerMiddleware from '../middleware/layerMiddleware';

export default function configureStore(layerClient, initialState) {
  const finalCreateStore = compose(
    applyMiddleware(layerMiddleware(layerClient))
  )(createStore);

  return finalCreateStore(reducer, initialState);;
}
