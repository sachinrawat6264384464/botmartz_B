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
  Zap,
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

const ASSIGNABLE_MODULES = MODULES; // all current modules are assignable

export default function RoleManagementPage() {
  const { userRole: currentUserRole } = useAuth();

  const [users, setUsers] = useState<UserRoleDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState<UserRoleDoc | null>(null);
  const [tempModules, setTempModules] = useState<ModuleId[]>([]);
  const [tempIsSuperAdmin, setTempIsSuperAdmin] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newUid, setNewUid] = useState('');
  const [newRole, setNewRole] = useState<'superadmin' | 'admin' | 'user'>('user');
  const [addError, setAddError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

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

  const openEditModal = (user: UserRoleDoc) => {
    setEditingUser(user);
    setTempModules([...user.modules]);
    setTempIsSuperAdmin(user.isSuperAdmin);
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
        modules: tempIsSuperAdmin ? [] : tempModules,
        isSuperAdmin: tempIsSuperAdmin,
        updatedAt: serverTimestamp(),
      });
      setUsers((prev) =>
        prev.map((u) => u.uid === editingUser.uid ? { ...u, modules: tempIsSuperAdmin ? [] : tempModules, isSuperAdmin: tempIsSuperAdmin } : u)
      );
      setEditingUser(null);
    } catch (err) {
      console.error('Failed to save permissions:', err);
    } finally {
      setSaving(false);
    }
  };

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
      const isSuperAdmin = newRole === 'superadmin';
      const modules = newRole === 'admin' ? ['dashboard'] as ModuleId[] : [];
      await setDoc(doc(db, 'user_roles', newUid.trim()), {
        email: newEmail.trim(),
        displayName: '',
        modules,
        isSuperAdmin,
        createdAt: serverTimestamp(),
      });
      await fetchUsers();
      setShowAddModal(false);
      setNewEmail('');
      setNewUid('');
      setNewRole('user');
    } catch {
      setAddError('Failed to add user. Check the UID and try again.');
    } finally {
      setAdding(false);
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewEmail('');
    setNewUid('');
    setNewRole('user');
    setAddError('');
  };

  const getInitials = (name: string, email: string) =>
    (name || email).charAt(0).toUpperCase();

  return (
    <div className={`${interTight.className} p-6 max-w-[1400px]`}>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center">
              <Shield size={15} className="text-gray-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          </div>
          <p className="text-sm text-gray-500 ml-10">
            Assign module permissions to admin users ·{' '}
            <span className="font-medium text-gray-700">{users.length} user{users.length !== 1 ? 's' : ''}</span>
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus size={15} />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-52">
            <Loader2 size={24} className="animate-spin text-gray-300" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 px-8">
            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users size={20} className="text-gray-300" />
            </div>
            <p className="text-sm font-semibold text-gray-500">No users found</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              Users appear automatically after first login, or add them manually above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="text-left px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Assigned Modules</th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="text-right px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.uid} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-linear-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-white">
                            {getInitials(user.displayName, user.email)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.displayName || <span className="italic text-gray-400 font-normal">No name</span>}
                          </p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {user.isSuperAdmin ? (
                        <span className="text-xs text-gray-400 italic">All modules</span>
                      ) : user.modules.length === 0 ? (
                        <span className="text-xs text-gray-400">— None assigned</span>
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

                    <td className="px-5 py-4">
                      {user.isSuperAdmin ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200">
                          <Zap size={10} /> Super Admin
                        </span>
                      ) : user.modules.length > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                          <Shield size={10} /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-200">
                          <Users size={10} /> User
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openEditModal(user)}
                        disabled={user.email === currentUserRole?.email}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Edit size={13} />
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

      {/* Edit Permissions Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${interTight.className} bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Edit Permissions</h2>
                <p className="text-xs text-gray-400 mt-0.5">{editingUser.email}</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="p-5 border-b border-gray-100">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Role</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTempIsSuperAdmin(true);
                  }}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    tempIsSuperAdmin
                      ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 font-bold"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempIsSuperAdmin(false);
                    if (tempModules.length === 0) {
                      setTempModules(['dashboard']);
                    }
                  }}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    !tempIsSuperAdmin && tempModules.length > 0
                      ? "bg-sky-500/10 border-sky-500/30 text-sky-600 font-bold"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempIsSuperAdmin(false);
                    setTempModules([]);
                  }}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                    !tempIsSuperAdmin && tempModules.length === 0
                      ? "bg-gray-100 border-gray-300 text-gray-800 font-bold"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  User
                </button>
              </div>
            </div>

            <div className="p-5">
              {tempIsSuperAdmin ? (
                <div className="text-center py-6 px-4 bg-yellow-50/50 border border-yellow-100 rounded-xl">
                  <Zap size={20} className="text-yellow-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-yellow-800">Super Admins have full access</p>
                  <p className="text-[10px] text-yellow-600/80 mt-0.5">They bypass all module-level checks automatically.</p>
                </div>
              ) : tempModules.length === 0 ? (
                <div className="text-center py-6 px-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <Users size={20} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">No admin permissions assigned</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">This user has a basic role with zero admin panel access.</p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Select Modules
                  </p>
                  <div className="space-y-0.5">
                    {ASSIGNABLE_MODULES.map((mod) => {
                      const checked = tempModules.includes(mod.id);
                      const Icon = mod.icon;
                      return (
                        <label
                          key={mod.id}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleModule(mod.id)}
                            className="w-4 h-4 rounded border-gray-300 accent-gray-900"
                          />
                          <Icon
                            size={16}
                            className={`transition-colors ${checked ? 'text-gray-800' : 'text-gray-400 group-hover:text-gray-600'}`}
                          />
                          <span className={`text-sm font-medium transition-colors ${checked ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                            {mod.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 px-5 pb-5">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePermissions}
                disabled={saving}
                className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? 'Saving…' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${interTight.className} bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200`}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Add User Manually</h2>
              <button onClick={closeAddModal} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>Users are added automatically on first login. Use this to pre-assign permissions before a user has logged in.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Firebase UID</label>
                <input
                  type="text"
                  value={newUid}
                  onChange={(e) => setNewUid(e.target.value)}
                  placeholder="e.g. abc123xyz..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
                <p className="text-xs text-gray-400 mt-1.5">Find this in Firebase Console → Authentication → Users</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Role</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewRole('superadmin')}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      newRole === 'superadmin'
                        ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 font-bold"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Super Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewRole('admin')}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      newRole === 'admin'
                        ? "bg-sky-500/10 border-sky-500/30 text-sky-600 font-bold"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewRole('user')}
                    className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      newRole === 'user'
                        ? "bg-gray-100 border-gray-300 text-gray-800 font-bold"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    User
                  </button>
                </div>
              </div>

              {addError && (
                <p className="text-xs text-red-500 flex items-center gap-1.5 mt-2">
                  <AlertCircle size={13} /> {addError}
                </p>
              )}
            </div>

            <div className="flex gap-2 px-5 pb-5">
              <button
                onClick={closeAddModal}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={adding}
                className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {adding && <Loader2 size={14} className="animate-spin" />}
                {adding ? 'Adding…' : 'Add User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
