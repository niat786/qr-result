'use client';

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total QR Codes',
      value: '247',
      change: '+12%',
      changeType: 'increase',
      icon: 'ri-qr-code-fill',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Scans',
      value: '5,847',
      change: '+24%',
      changeType: 'increase',
      icon: 'ri-scan-line',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Active QR Codes',
      value: '189',
      change: '+8%',
      changeType: 'increase',
      icon: 'ri-eye-line',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Scans Today',
      value: '128',
      change: '-5%',
      changeType: 'decrease',
      icon: 'ri-calendar-line',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <i className={`${
                    stat.changeType === 'increase' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'
                  } mr-1`}></i>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
              <i className={`${stat.icon} text-white text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}