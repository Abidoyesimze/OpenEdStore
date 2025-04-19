import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import { FaHome, FaFolder, FaBell, FaCog, FaSearch } from 'react-icons/fa';
import { BrowserProvider } from 'ethers';
import Vector8 from '../assets/Vector (8).png';
import Vector9 from '../assets/Vector (9).png';
import Vector10 from '../assets/Vector (10).png';
import Vector11 from '../assets/Vector (11).png';
import Vector12 from '../assets/Vector (12).png';
import Vector13 from '../assets/Vector (13).png';
import Ellipse1 from '../assets/Ellipse 4 (1).png';
import StudentSidebar from './dashboard/StudentSidebar';

const user1 = Vector13;
const user2 = Ellipse1;
const user3 = Vector13;
const user4 = Ellipse1;

const notifications = [
  {
    id: 1,
    avatar: user1,
    message: 'New resource uploaded by Prof. Esther in Blockchain 101.',
    date: '30 Mins ago',
  },
  {
    id: 2,
    avatar: user2,
    message: 'Access granted for WEEK 4 Slides by Mr. Simze.',
    date: 'Mar 18',
  },
  {
    id: 3,
    avatar: user3,
    message: 'New resource uploaded by Prof. Ada in Blockchain 101.',
    date: 'Mar 27',
  },
  {
    id: 4,
    avatar: user4,
    message: 'Access granted for WEEK 4 Slides by Mr. Simze.',
    date: 'Mar 28',
  },
];

const metrics = {
  recentFiles: 12,
  filesAccessed: 34,
  filesUploaded: 132,
  completionPercentage: 23,
};

const Dashboard = () => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [ensName, setEnsName] = useState<string>('');
  

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setUserAddress(address);

          try {
            const ensName = await provider.lookupAddress(address);
            if (ensName) {
              setEnsName(ensName);
            }
          } catch (ensError) {
            console.log('Could not resolve ENS name:', ensError);
          }
        }
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    };

    getUserInfo();
  }, []);

  const formatAddress = (address: string | null) => {
    if (!address) return 'Guest';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleViewNotification = (id: number) => {
    console.log(`Viewing notification ${id}`);
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100 font-sans">
      <StudentSidebar activePage="home" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white text-black p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome {ensName ? ensName : userAddress ? formatAddress(userAddress) : 'Guest'} 👋
          </h1>
          <div className="flex items-center gap-4 md:gap-6">
            <button className="flex items-center gap-2">
              <img className="w-5 h-5" src={Vector8} alt="Access" />
              <span className="text-sm md:text-base cursor-pointer">Access Requests</span>
            </button>
            <button className="flex items-center gap-2">
              <img className="w-5 h-5" src={Vector9} alt="Downloads" />
              <span className="text-sm md:text-base cursor-pointer">My Downloads</span>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 space-y-6">
          {/* Metrics */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recent Files */}
              <MetricCard
                icon={Vector10}
                iconBg="bg-[#E1F1DB]"
                value={metrics.recentFiles}
                label="Recent files"
              />
              {/* Files Accessed */}
              <MetricCard
                icon={Vector11}
                iconBg="bg-[#F1EEDB]"
                value={metrics.filesAccessed}
                label="Files accessed"
              />
              {/* Uploaded */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
                <div className="w-20 h-20 mb-6">
                  <CircularProgressbar
                    value={metrics.completionPercentage}
                    text={`${metrics.completionPercentage}%`}
                    styles={buildStyles({
                      pathColor: '#00C49F',
                      textColor: '#000',
                      trailColor: '#e5e5e5',
                      textSize: '28px',
                    })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-800">
                    {metrics.filesUploaded}
                  </p>
                  <p className="text-sm text-gray-500">Files uploaded</p>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex gap-4 items-center mb-4">
              <img className="w-6 h-6" src={Vector12} alt="" />
              <h2 className="text-lg font-semibold text-gray-800">
                Notifications
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="accent-yellow-600" />
                    <img
                      src={notification.avatar}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-sm text-gray-700">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 ml-14 sm:ml-0">
                    <span className="text-xs text-gray-500">
                      {notification.date}
                    </span>
                    <button
                      onClick={() => handleViewNotification(notification.id)}
                      className="bg-black text-white text-sm px-4 py-1 rounded hover:bg-gray-800"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const MetricCard = ({
  icon,
  iconBg,
  value,
  label,
}: {
  icon: string;
  iconBg: string;
  value: number;
  label: string;
}) => (
  <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
    <div className="flex flex-col gap-6">
      <div className={`${iconBg} p-5 rounded-lg`}>
        <img src={icon} alt="" className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-3">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
    <button
      className="text-gray-500 hover:text-black"
      aria-label="Next"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
);

export default Dashboard;