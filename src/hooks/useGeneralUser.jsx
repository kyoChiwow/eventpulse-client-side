import useRole from "./useRole";


const useGeneralUser = () => {
    const [role, isRoleLoading] = useRole();
    const isGeneralUser = role === "user" || role === "guest";

    return [isGeneralUser, isRoleLoading];
};

export default useGeneralUser;