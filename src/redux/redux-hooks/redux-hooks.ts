import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Appdispatch, RootState } from '../store/store'

export const useAppDispatch = () => useDispatch<Appdispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
