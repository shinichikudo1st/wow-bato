import { checkAuth, getProfile } from "@/libs/authentication";
import { ProfileData } from "@/types/authTypes";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return { profile };
};

export const useProfileID = () => {
  const [userID, setUserID] = useState<number | null>(null);
  const [barangayID, setBarangayID] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfileID = async () => {
      const authResponse = await checkAuth();
      const authData = await authResponse.json();
      setUserID(authData.user_id);
      setBarangayID(authData.barangay_id);
    };

    fetchProfileID();
  }, []);

  return { userID, barangayID };
};
