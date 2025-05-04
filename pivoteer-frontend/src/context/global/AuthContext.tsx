import { createContext, ReactNode, useEffect, useState } from "react";
import { useGet } from "@/hooks/useGet";


interface User {
  id: number;
  email: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    fetchData: fetchUser,
    data,
    error,
  } = useGet<User>("/auth/status", true);

  const refetchUser = async () => {
    try {
      await fetchUser();
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchUser();
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth(); // only fetch on mount
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
      console.log(data)
    } else if (error) {
      setUser(null);
    }
  }, [data]);


  return (
    <AuthContext.Provider
    value={{
      user,
      loading,
      isAuthenticated: !!user,
      refetchUser
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};