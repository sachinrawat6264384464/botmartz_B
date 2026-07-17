"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, getDoc, getDocs, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { ModuleId } from '@/lib/modules';

export interface UserRole {
  email: string;
  displayName: string;
  modules: ModuleId[];
  isSuperAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  /** Returns true if the current user can access the given module. */
  hasAccess: (moduleId: ModuleId) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  hasAccess: () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Fetch existing role or create a blank one on first login
        const roleRef = doc(db, 'user_roles', firebaseUser.uid);
        const roleSnap = await getDoc(roleRef);

        if (roleSnap.exists()) {
          const data = roleSnap.data();
          setUserRole({
            email: data.email ?? firebaseUser.email ?? '',
            displayName: data.displayName ?? firebaseUser.displayName ?? '',
            modules: data.modules ?? [],
            isSuperAdmin: data.isSuperAdmin ?? false,
          });
        } else {
          // No role doc yet — check if user_roles collection is empty.
          // The very first user to log in becomes super admin automatically.
          let isSuperAdmin = false;
          try {
            const allRoles = await getDocs(collection(db, 'user_roles'));
            isSuperAdmin = allRoles.empty;
          } catch (e) {
            console.warn("Could not list user_roles (restricted access):", e);
            isSuperAdmin = false;
          }

          const newRole: UserRole = {
            email: firebaseUser.email ?? '',
            displayName: firebaseUser.displayName ?? '',
            modules: [],
            isSuperAdmin,
          };
          await setDoc(roleRef, { ...newRole, createdAt: serverTimestamp() });
          setUserRole(newRole);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const hasAccess = (moduleId: ModuleId): boolean => {
    if (!userRole) return false;
    if (userRole.isSuperAdmin) return true;
    return userRole.modules.includes(moduleId);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, hasAccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
