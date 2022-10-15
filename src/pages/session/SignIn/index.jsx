import { Navigate } from 'react-router-dom';


export const SignIn = ({ signed }) => {
  if (signed) {
        return <Navigate to={"/"} replace />
    }

    return (
        <h1>SignIn</h1>
    );
}