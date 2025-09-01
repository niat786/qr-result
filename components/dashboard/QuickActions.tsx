'use client';

export default function QuickActions() {
  const quickActions = [
    {
      icon: 'ri-qr-code-fill',
      title: 'Create QR Code',
      description: 'Generate a new QR code',
      color: 'from-blue-500 to-blue-600',
      action: () => window.location.href = '/'
    },
    {
      icon: 'ri-upload-line',
      title: 'Bulk Import',
      description: 'Import multiple QR codes',
      color: 'from-green-500 to-green-600',
      action: () => console.log('Bulk import')
    },
    {
      icon: 'ri-download-line',
      title: 'Export Data',
      description: 'Download your QR analytics',
      color: 'from-purple-500 to-purple-600',
      action: () => console.log('Export data')
    },
    {
      icon: 'ri-settings-line',
      title: 'Account Settings',
      description: 'Manage your preferences',
      color: 'from-gray-500 to-gray-600',
      action: () => console.log('Settings')
    }
  ];

  const recentActivity = [
    {
      icon: 'ri-scan-line',
      title: 'Restaurant Menu QR scanned',
      time: '2 minutes ago',
      color: 'text-green-600'
    },
    {
      icon: 'ri-qr-code-line',
      title: 'New QR code created',
      time: '1 hour ago',
      color: 'text-blue-600'
    },
    {
      icon: 'ri-edit-line',
      title: 'Contact Card QR updated',
      time: '3 hours ago',
      color: 'text-orange-600'
    },
    {
      icon: 'ri-download-line',
      title: 'QR code downloaded',
      time: '5 hours ago',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-left"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mr-3`}>
                <i className={`${action.icon} text-white text-lg`}></i>
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
              <i className="ri-arrow-right-line text-gray-400 ml-auto"></i>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center p-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${activity.color} bg-opacity-10`}>
                <i className={`${activity.icon} text-sm ${activity.color}`}></i>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{activity.title}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer">
          View All Activity
        </button>
      </div>

      {/* Performance Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          <i className="ri-lightbulb-line mr-2 text-yellow-500"></i>
          Performance Tips
        </h3>
        <div className="space-y-3">
          <div className="text-sm text-gray-700">
            <strong>Optimize QR placement:</strong> Position QR codes at eye level for better scan rates
          </div>
          <div className="text-sm text-gray-700">
            <strong>Use high contrast:</strong> Dark patterns on light backgrounds scan better
          </div>
          <div className="text-sm text-gray-700">
            <strong>Test regularly:</strong> Ensure your QR codes work across different devices
          </div>
        </div>
      </div>
    </div>
  );
}