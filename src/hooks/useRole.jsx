import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  if (user?.isAnonymous) {
    return ["guest", false]; 
  }
  

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: role, isPending: isRoleLoading } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
