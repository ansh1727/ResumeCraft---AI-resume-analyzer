import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';
import { adminAPI } from '../../services';
import toast from 'react-hot-toast';
import { Users, Trash2 } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.getUsers()
      .then(({ data }) => setUsers(data.users))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this user and all their data?')) return;
    try {
      await adminAPI.deleteUser(id);
      toast.success('User deleted');
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>

      {loading ? (
        <LoadingSkeleton rows={5} />
      ) : users.length === 0 ? (
        <EmptyState icon={Users} title="No users" description="No users registered yet." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="bg-white dark:bg-gray-900">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-4 py-3 text-gray-500">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs capitalize text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {user.role !== 'admin' && (
                      <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminUsers;
