import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { appDispatch, RootState } from '../store/store';

export const useCustomDispatch = () => useDispatch<appDispatch>();
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;