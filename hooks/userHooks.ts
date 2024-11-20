import { getProfile } from "@/libs/authentication";
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
