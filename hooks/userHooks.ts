import { checkAuth, getProfile } from "@/libs/authentication";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { profile: data };
};

export const useProfileID = () => {
  const { data } = useQuery({
    queryKey: ["AuthInfo"],
    queryFn: () => checkAuth(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    userID: data?.user_id,
    barangayID: data?.barangay_id,
    userRole: data?.role,
    barangayName: data?.barangay_name,
  };
};
