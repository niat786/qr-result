'use client';

export default function RecentQRCodes() {
  const recentQRCodes = [
    {
      id: '1',
      name: 'Restaurant Menu QR',
      type: 'URL',
      scans: 234,
      created: '2024-01-15',
      status: 'active',
      category: 'Business'
    },
    {
      id: '2',
      name: 'WiFi Password',
      type: 'WiFi',
      scans: 89,
      created: '2024-01-14',
      status: 'active',
      category: 'Connection'
    },
    {
      id: '3',
      name: 'Contact Card',
      type: 'vCard',
      scans: 156,
      created: '2024-01-13',
      status: 'active',
      category: 'Contact'
    },
    {
      id: '4',
      name: 'Payment Link',
      type: 'PayPal',
      scans: 67,
      created: '2024-01-12',
      status: 'paused',
      category: 'Payment'
    },
    {
      id: '5',
      name: 'Event Tickets',
      type: 'URL',
      scans: 423,
      created: '2024-01-11',
      status: 'active',
      category: 'Event'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Business':
        return 'ri-briefcase-line';
      case 'Connection':
        return 'ri-wifi-line';
      case 'Contact':
        return 'ri-user-line';
      case 'Payment':
        return 'ri-bank-card-line';
      case 'Event':
        return 'ri-calendar-event-line';
      default:
        return 'ri-qr-code-line';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent QR Codes</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap">
            View All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                QR Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scans
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentQRCodes.map((qr) => (
              <tr key={qr.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <i className={`${getCategoryIcon(qr.category)} text-white text-sm`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{qr.name}</div>
                      <div className="text-sm text-gray-500">{qr.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {qr.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <i className="ri-eye-line mr-1 text-gray-400"></i>
                    {qr.scans.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(qr.created).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(qr.status)}`}>
                    {qr.status.charAt(0).toUpperCase() + qr.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 cursor-pointer">
                      <i className="ri-eye-line"></i>
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 cursor-pointer">
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 cursor-pointer">
                      <i className="ri-download-line"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-700 cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}