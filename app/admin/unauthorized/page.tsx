"use client";

import { useRouter } from 'next/navigation';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

const interTight = { className: "" };

export default function UnauthorizedPage() {
  const router = useRouter();
  const { userRole } = useAuth();

  return (
    <div
      className={`${interTight.className} flex flex-col items-center justify-center min-h-full p-8 text-center`}
    >
      <div className="max-w-sm">
        {/* Icon */}
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldX size={38} className="text-red-500" />
        </div>

        {/* Copy */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          You don&apos;t have permission to view this module. Contact your administrator
          to request access.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => router.push('/admin')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
          >
            <Home size={16} />
            Dashboard
          </button>
        </div>

        {/* Assigned modules hint */}
        {userRole && !userRole.isSuperAdmin && userRole.modules.length > 0 && (
          <p className="mt-8 text-xs text-gray-400">
            You have access to:{' '}
            <span className="font-medium text-gray-600">
              {userRole.modules.join(', ')}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
