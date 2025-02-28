import { checkAuth, getProfile } from "@/libs/authentication";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { profile: data };
};

export const useProfileID = (): {
  userID: number | null;
  barangayID: number | null;
  userRole: string | null;
  barangayName: string | null;
} => {
  const [userID, setUserID] = useState<number | null>(null);
  const [barangayID, setBarangayID] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [barangayName, setBarangayName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileID = async () => {
      const authResponse = await checkAuth();
      const authData = await authResponse.json();
      setUserID(authData.user_id);
      setBarangayID(authData.barangay_id);
      setUserRole(authData.role);
      setBarangayName(authData.barangay_name);
    };

    fetchProfileID();
  }, []);

  return { userID, barangayID, userRole, barangayName };
};
