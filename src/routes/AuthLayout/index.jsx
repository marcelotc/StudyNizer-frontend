import { Navigate, Outlet } from 'react-router-dom';

export const AuthLayout = ({ signed }) => {

    if (!signed) {
        return <Navigate to={"/sign-in"} replace />
    }

    if (signed) {
        return <Outlet />
    }
};
