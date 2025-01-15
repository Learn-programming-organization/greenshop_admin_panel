import React from 'react';
import useGetDataForDashboard from '../hooks/useGetDataForDashboard';

// Custom Progress komponenti
const Progress = ({ percent, color }: { percent: number, color: string }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div 
      className="h-2.5 rounded-full" 
      style={{ 
        width: `${percent}%`,
        backgroundColor: color 
      }}
    ></div>
  </div>
);

// Card komponenti
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    {children}
  </div>
);

const Home: React.FC = () => {

  // Statistik ma'lumotlar
  const { productsCount, categoriesCount, usersCount } = useGetDataForDashboard()


  // Progress bar uchun umumiy ma'lumot
  const total = productsCount + categoriesCount + usersCount;

  // SVG ikonlar
  const icons = {
    user: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    category: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    product: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Statistik kartochkalar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center text-blue-500 mb-4">{icons.user}</div>
          <h3 className="font-medium text-gray-600">Jami foydalanuvchilar</h3>
          <p className="text-2xl font-bold mt-2">{usersCount}</p>
        </Card>
        
        <Card>
          <div className="flex items-center text-green-500 mb-4">{icons.category}</div>
          <h3 className="font-medium text-gray-600">Kategoriyalar</h3>
          <p className="text-2xl font-bold mt-2">{categoriesCount}</p>
        </Card>
        
        <Card>
          <div className="flex items-center text-yellow-500 mb-4">{icons.product}</div>
          <h3 className="font-medium text-gray-600">Mahsulotlar</h3>
          <p className="text-2xl font-bold mt-2">{productsCount}</p>
        </Card>
      </div>

      {/* Progress barlar */}
      <Card>
        <h3 className="font-medium text-gray-600 mb-6">Statistika ko'rsatkichlari</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Kategoriyalar</h4>
            <Progress percent={Math.round((categoriesCount / total) * 100)} color="#10B981" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Foydalanuvchilar</h4>
            <Progress percent={Math.round((usersCount / total) * 100)} color="#3B82F6" />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Mahsulotlar</h4>
            <Progress percent={Math.round((productsCount / total) * 100)} color="#F59E0B" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;