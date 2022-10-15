import { Navigate } from 'react-router-dom';


export const SignUp = ({ signed }) => {
  if (signed) {
        return <Navigate to={"/"} replace />
    }

    return (
        <h1>SignUp</h1>
    );
}