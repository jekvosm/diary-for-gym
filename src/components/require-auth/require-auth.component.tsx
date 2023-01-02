import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/redux-hooks/redux-hooks'
import { selectCurrentUser } from '../../store/slices/user/user-selectors'

const RequireAuth = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const location = useLocation()

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  )
}
export default RequireAuth
