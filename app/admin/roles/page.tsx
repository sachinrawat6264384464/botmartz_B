"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useAuth } from '@/lib/context/AuthContext';
import { MODULES, ModuleId } from '@/lib/modules';
import {
  Shield,
  Edit,
  X,
  Save,
  Plus,
  Loader2,
  Users,
  AlertCircle,
} from 'lucide-react';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

interface UserRoleDoc {
  uid: string;
  email: string;
  displayName: string;
  modules: ModuleId[];
  isSuperAdmin: boolean;
  createdAt?: any;
}

// Modules available for assignment (excludes 'roles' — that's super-admin-only)
const ASSIGNABLE_MODULES = MODULES.filter((m) => m.id !== 'roles');

export default function RoleManagementPage() {
  const { userRole: currentUserRole } = useAuth();

  const [users, setUsers] = useState<UserRoleDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit modal
  const [editingUser, setEditingUser] = useState<UserRoleDoc | null>(null);
  const [tempModules, setTempModules] = useState<ModuleId[]>([]);
  const [saving, setSaving] = useState(false);

  // Add user modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newUid, setNewUid] = useState('');
  const [addError, setAddError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'user_roles'));
      const data = snapshot.docs.map((d) => ({
        uid: d.id,
        email: '',
        displayName: '',
        modules: [],
        isSuperAdmin: false,
        ...d.data(),
      })) as UserRoleDoc[];
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch user_roles:', err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Edit permissions ── */
  const openEditModal = (user: UserRoleDoc) => {
    setEditingUser(user);
    setTempModules([...user.modules]);
  };

  const toggleModule = (id: ModuleId) => {
    setTempModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const savePermissions = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'user_roles', editingUser.uid), {
        modules: tempModules,
        updatedAt: serverTimestamp(),
      });
      setUsers((prev) =>
        prev.map((u) =>
          u.uid === editingUser.uid ? { ...u, modules: tempModules } : u
        )
      );
      setEditingUser(null);
    } catch (err) {
      console.error('Failed to save permissions:', err);
    } finally {
      setSaving(false);
    }
  };

  /* ── Add user manually ── */
  const handleAddUser = async () => {
    setAddError('');
    if (!newEmail.trim() || !newUid.trim()) {
      setAddError('Both Email and Firebase UID are required.');
      return;
    }
    if (users.find((u) => u.uid === newUid.trim())) {
      setAddError('A user with this UID already exists.');
      return;
    }
    setAdding(true);
    try {
      await setDoc(doc(db, 'user_roles', newUid.trim()), {
        email: newEmail.trim(),
        displayName: '',
        modules: [],
        isSuperAdmin: false,
        createdAt: serverTimestamp(),
      });
      await fetchUsers();
      setShowAddModal(false);
      setNewEmail('');
      setNewUid('');
    } catch (err) {
      setAddError('Failed to add user. Check the UID and try again.');
    } finally {
      setAdding(false);
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewEmail('');
    setNewUid('');
    setAddError('');
  };

  return (
    <div className={`${interTight.className} p-8`}>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Shield size={30} className="text-gray-700" />
            Role Management
          </h1>
          <p className="text-gray-500 text-sm">
            Assign dashboard module permissions to each admin user.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
        >
          <Plus size={17} />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-52">
            <Loader2 size={32} className="animate-spin text-gray-300" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 px-8 text-gray-400">
            <Users size={44} className="mx-auto mb-4 opacity-30" />
            <p className="text-base font-medium text-gray-600">No users found</p>
            <p className="text-sm mt-1 max-w-sm mx-auto">
              Users appear here automatically after their first login, or you can add them manually above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Assigned Modules
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.uid} className="hover:bg-gray-50 transition-colors">
                    {/* User info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-white">
                            {(user.displayName || user.email).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {user.displayName || <span className="italic text-gray-400">No name</span>}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Modules */}
                    <td className="px-6 py-4">
                      {user.isSuperAdmin ? (
                        <span className="text-sm text-gray-400 italic">All modules</span>
                      ) : user.modules.length === 0 ? (
                        <span className="text-sm text-gray-400">— None assigned</span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {user.modules.map((mId) => {
                            const mod = MODULES.find((m) => m.id === mId);
                            return (
                              <span
                                key={mId}
                                className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                              >
                                {mod?.label ?? mId}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    {/* Role badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.isSuperAdmin
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {user.isSuperAdmin ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>

                    {/* Edit button */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openEditModal(user)}
                        disabled={user.isSuperAdmin}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Edit size={14} />
                        Edit Permissions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Edit Permissions Modal ── */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Permissions</h2>
                <p className="text-sm text-gray-500 mt-0.5">{editingUser.email}</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Module checkboxes */}
            <div className="p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Select Modules
              </p>
              <div className="space-y-1">
                {ASSIGNABLE_MODULES.map((mod) => {
                  const checked = tempModules.includes(mod.id);
                  const Icon = mod.icon;
                  return (
                    <label
                      key={mod.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleModule(mod.id)}
                        className="w-4 h-4 rounded border-gray-300 accent-black"
                      />
                      <Icon
                        size={17}
                        className={`transition-colors ${
                          checked ? 'text-gray-800' : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium transition-colors ${
                          checked ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'
                        }`}
                      >
                        {mod.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePermissions}
                disabled={saving}
                className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {saving ? 'Saving…' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add User Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Add User Manually</h2>
              <button
                onClick={closeAddModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Info tip */}
              <div className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>
                  Users are added here automatically on first login. Use this form to
                  pre-assign permissions before a user has logged in.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Firebase UID
                </label>
                <input
                  type="text"
                  value={newUid}
                  onChange={(e) => setNewUid(e.target.value)}
                  placeholder="e.g. abc123xyz..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  Find this in Firebase Console → Authentication → Users
                </p>
              </div>

              {addError && (
                <p className="text-sm text-red-500 flex items-center gap-2">
                  <AlertCircle size={14} /> {addError}
                </p>
              )}
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={closeAddModal}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={adding}
                className="flex-1 px-4 py-2.5 bg-black text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {adding && <Loader2 size={15} className="animate-spin" />}
                {adding ? 'Adding…' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
