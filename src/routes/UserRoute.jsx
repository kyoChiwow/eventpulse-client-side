import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGeneralUser from "../hooks/useGeneralUser";
import Loading from "../pages/Loading/Loading"
import PropTypes from "prop-types";

const UserRoute = ({ children }) => {
    const [isGeneralUser, isGeneralUserLoading] = useGeneralUser();
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isGeneralUserLoading ) {
        return <Loading></Loading>;
    }

    if (user && isGeneralUser ) {
        return children;
    }

    return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
};

UserRoute.propTypes = {
    children: PropTypes.node.isRequired,
}
export default UserRoute;