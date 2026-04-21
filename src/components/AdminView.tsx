import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Star, 
  Package, 
  Layers, 
  GraduationCap, 
  FileText, 
  Users, 
  BarChart3, 
  ShoppingBag, 
  ClipboardList, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  X,
  CreditCard,
  Truck,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type AdminTab = 'dashboard' | 'analytics' | 'banners' | 'ratings' | 'products' | 'categories' | 'courses' | 'blogs' | 'users' | 'orders' | 'forms';

// --- Mock Data ---
const REVENUE_DATA = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 67000 },
];

const ORDER_TREND_DATA = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 19 },
  { name: 'Wed', orders: 15 },
  { name: 'Thu', orders: 22 },
  { name: 'Fri', orders: 30 },
  { name: 'Sat', orders: 25 },
  { name: 'Sun', orders: 14 },
];

const CUSTOMER_GROWTH_DATA = [
  { month: 'Jan', new: 120, total: 1200 },
  { month: 'Feb', new: 150, total: 1350 },
  { month: 'Mar', new: 180, total: 1530 },
  { month: 'Apr', new: 220, total: 1750 },
  { month: 'May', new: 210, total: 1960 },
  { month: 'Jun', new: 280, total: 2240 },
];

const PRODUCT_SALES_DATA = [
  { name: 'Mouse', sales: 420 },
  { name: 'Keyboards', sales: 380 },
  { name: 'Audio', sales: 510 },
  { name: 'Stationery', sales: 890 },
  { name: 'Gifts', sales: 240 },
];

const CATEGORY_DATA = [
  { name: 'Tech', value: 400 },
  { name: 'Gifts', value: 300 },
  { name: 'Stationery', value: 300 },
];

const COLORS = ['#2bb6b6', '#3b82f6', '#f59e0b'];

export default function AdminView({ setView }: { setView: (v: string) => void }) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'categories', label: 'Categories', icon: <Layers size={20} /> },
    { id: 'courses', label: 'Courses', icon: <GraduationCap size={20} /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'ratings', label: 'Ratings', icon: <Star size={20} /> },
    { id: 'banners', label: 'Banners', icon: <ImageIcon size={20} /> },
    { id: 'forms', label: 'Form Submissions', icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden fixed inset-0 z-[100]">
      {/* Admin Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shrink-0">
            <LayoutDashboard size={18} />
          </div>
          {isSidebarOpen && <span className="font-black tracking-tighter text-lg">DELTA ADMIN</span>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <div className={activeTab === item.id ? 'text-white' : 'group-hover:text-slate-900'}>
                {item.icon}
              </div>
              {isSidebarOpen && <span className="text-sm font-bold">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <button 
            onClick={() => { setView("home"); window.scrollTo(0,0); }}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <ChevronLeft size={20} />
            {isSidebarOpen && <span className="text-sm font-bold">Back to Store</span>}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-300 hover:text-slate-900 transition-all"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            {isSidebarOpen && <span className="text-xs font-black uppercase tracking-widest">Collapse Menu</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 text-slate-400 uppercase text-[10px] font-black tracking-widest">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-slate-900">{activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 text-xs w-64 outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">Admin User</p>
                <p className="text-[10px] font-medium text-slate-400">System Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-sm overflow-hidden text-[10px] flex items-center justify-center font-black text-white">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'analytics' && <AnalyticsView />}
              {activeTab === 'orders' && <OrdersView />}
              {activeTab === 'products' && <ProductsView />}
              {activeTab === 'users' && <UsersView />}
              {activeTab === 'forms' && <FormsView />}
              {activeTab === 'banners' && <BannersView />}
              {activeTab === 'ratings' && <RatingsAdminView />}
              {activeTab === 'categories' && <AdminCategoriesView />}
              {activeTab === 'courses' && <CoursesAdminView />}
              {activeTab === 'blogs' && <BlogsAdminView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- New Sub-View Components ---

function BannersView() {
  const banners = [
    { page: 'Home', title: 'Curated Essentials', subtitle: 'Elevate your workspace with premium tools.', img: 'https://picsum.photos/seed/b-home/1200/400' },
    { page: 'Shop', title: 'Summer Collection', subtitle: 'Explore the latest arrivals in stationery.', img: 'https://picsum.photos/seed/b-shop/1200/400' },
    { page: 'Tech', title: 'Precision Power', subtitle: 'High-performance gear for high-performance work.', img: 'https://picsum.photos/seed/b-tech/1200/400' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Banner Management</h2>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10">Add Location</button>
      </div>
      <div className="grid gap-8">
        {banners.map((b, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/3 aspect-[16/10] relative bg-slate-100">
              <img src={b.img} alt="banner" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">{b.page} Hero</span>
              </div>
            </div>
            <div className="flex-1 p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Heading</p>
                  <h4 className="text-2xl font-black">{b.title}</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sub-headline</p>
                  <p className="text-sm text-slate-500 font-medium italic">"{b.subtitle}"</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Edit Content</button>
                <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Replace Image</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RatingsAdminView() {
  const reviews = [
    { type: 'Product', target: 'MX Master 3S', user: 'Rahul Sharma', rating: 5, comment: 'Best mouse I ever used!', date: 'Today' },
    { type: 'Course', target: 'Tally Advance', user: 'Anita Gupta', rating: 4, comment: 'Great materials, but video quality could be better.', date: 'Yesterday' },
    { type: 'Service', target: 'Device Repair', user: 'Sonal Verma', rating: 5, comment: 'Fast turnaround time.', date: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Ratings & Reviews</h2>
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Review Target</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Score & Comment</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-delta-primary uppercase tracking-widest">{r.type}</span>
                    <p className="text-sm font-bold">{r.target}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">{r.user}</span>
                      <span className="text-[10px] text-slate-300 font-medium">{r.date}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-2">
                    <div className="flex gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < r.rating ? "currentColor" : "none"} />)}
                    </div>
                    <p className="text-xs text-slate-500 italic max-w-sm">"{r.comment}"</p>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight underline decoration-delta-primary/20 decoration-8 underline-offset-8">Advanced Analytics</h2>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.2em] text-xs">Full ecosystem performance report (2026)</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <Calendar size={14} /> Last 6 Months
          </button>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:-translate-y-1 transition-all">Download CSV</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Section 1: Orders Analytics */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-black">Orders Analysis</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction volume trend</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-black">1,842</p>
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">+24% vs Prev week</p>
              </div>
              <div className="w-12 h-12 bg-delta-primary/10 rounded-2xl flex items-center justify-center text-delta-primary">
                <ShoppingBag size={24} />
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ORDER_TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="orders" stroke="#2bb6b6" strokeWidth={4} dot={{ r: 6, fill: '#2bb6b6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[3rem] border border-slate-800 shadow-2xl flex flex-col justify-between">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-black">Quick Totals</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Performance Indicators</p>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Conversion Rate', value: '4.2%', color: 'text-delta-primary' },
                { label: 'Avg Order Value', value: '₹2,450', color: 'text-white' },
                { label: 'Repeat Customers', value: '38%', color: 'text-white' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                   <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 leading-relaxed mt-8">Real-time data synchronization enabled. All values are calculated from the Delta Cloud Core.</p>
        </div>

        {/* Section 2: Customer Analytics */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-black">Customer Retention</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New vs Returning dynamics</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'New', value: 450 },
                    { name: 'Returning', value: 850 },
                  ]}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  <Cell fill="#2bb6b6" />
                  <Cell fill="#edf2f7" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-1 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Lifetime</p>
                <p className="text-lg font-black text-slate-900">8.4 Months</p>
             </div>
             <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-1 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Churn Rate</p>
                <p className="text-lg font-black text-slate-900">2.1%</p>
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-black">User Onboarding Trend</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly signup expansion</p>
            </div>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                   <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="u" />
                </div>
              ))}
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CUSTOMER_GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '24px', border: 'none', shadow: 'none' }}
                />
                <Bar dataKey="new" fill="#2bb6b6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 3: Product Analytics */}
        <div className="lg:col-span-3 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1 space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-black">Stock Health</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory distribution stats</p>
            </div>
            <div className="space-y-6">
               {[
                 { label: 'Healthy Stock', value: 85, color: 'bg-green-500' },
                 { label: 'Low Stock', value: 12, color: 'bg-amber-500' },
                 { label: 'Out of Stock', value: 3, color: 'bg-red-500' },
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-slate-400">{item.label}</span>
                       <span>{item.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full ${item.color}`} 
                       />
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="md:col-span-2 space-y-8">
             <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black">Product Performance</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sales volume by category</p>
                </div>
                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 border border-slate-100">
                  <Filter size={18} />
                </button>
             </div>
             <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={PRODUCT_SALES_DATA} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontSize: 10, fontWeight: 'black', fill: '#1e293b' }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px' }} />
                    <Bar dataKey="sales" fill="#1e293b" radius={[0, 4, 4, 0]} barSize={24} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCategoriesView() {
  const pages = [
    { name: 'Tech', icons: ['Mouse', 'Keyboard', 'Headphones'], count: 12 },
    { name: 'Gifts', icons: ['Gift', 'Sparkles'], count: 8 },
    { name: 'Stationery', icons: ['Pen', 'FileText'], count: 15 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Category Handling</h2>
        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
          <Plus size={16} /> New Category
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {pages.map((p, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
               <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <Layers />
               </div>
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{p.count} Sub-items</span>
            </div>
            <div className="space-y-4">
               <h4 className="text-xl font-black">{p.name} Page</h4>
               <div className="flex flex-wrap gap-2">
                  {p.icons.map(icon => (
                    <span key={icon} className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-500 border border-slate-100">{icon}</span>
                  ))}
               </div>
            </div>
            <div className="pt-4 flex gap-2">
               <button className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Manage</button>
               <button className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesAdminView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Course Catalog</h2>
        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
          <Plus size={16} /> Post New Course
        </button>
      </div>
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
         <div className="space-y-6">
            {[
              { title: 'Tally Advance', duration: '2 Months', price: '₹3,500', students: 840 },
              { title: 'Full Stack Basics', duration: '6 Months', price: '₹12,000', students: 320 },
              { title: 'DCA Certification', duration: '6 Months', price: '₹6,500', students: 1200 },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-black/5 flex items-center justify-center text-slate-400 overflow-hidden">
                       <img src={`https://picsum.photos/seed/course-${i}/200/200`} alt="c" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="font-bold text-slate-900">{c.title}</h4>
                       <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span>{c.duration}</span>
                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span>{c.students} Students</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center gap-8">
                    <span className="text-xl font-black">{c.price}</span>
                    <div className="flex gap-2">
                       <button className="p-3 bg-white border border-slate-200 rounded-xl hover:text-delta-primary transition-all shadow-sm"><Edit3 size={16} /></button>
                       <button className="p-3 bg-white border border-slate-200 rounded-xl hover:text-red-500 transition-all shadow-sm"><Trash2 size={16} /></button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}

function BlogsAdminView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Blog Editorial</h2>
        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl">
          <Plus size={16} /> New Article
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {[1, 2, 3, 4].map(i => (
           <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="aspect-[2/1] bg-slate-100 relative">
                 <img src={`https://picsum.photos/seed/blog-${i}/600/300`} alt="b" className="w-full h-full object-cover" />
                 <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-widest">Published</span>
                 </div>
              </div>
              <div className="p-6 space-y-4">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-delta-primary uppercase tracking-widest underline decoration-delta-primary/20">Technology</p>
                    <h4 className="text-lg font-bold">The Future of Digital Stationery in 2026</h4>
                 </div>
                 <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">12 April, 2026</span>
                    <div className="flex gap-2">
                       <button className="p-2 text-slate-400 hover:text-delta-primary transition-colors"><Edit3 size={16} /></button>
                       <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}


function DashboardView() {
  const stats = [
    { label: 'Total Revenue', value: '₹4,52,000', change: '+12.5%', icon: <CreditCard />, up: true },
    { label: 'Total Orders', value: '1,240', change: '+8.2%', icon: <ShoppingBag />, up: true },
    { label: 'Total Products', value: '842', change: '+12 New', icon: <Package />, up: true },
    { label: 'Avg Rating', value: '4.8/5', change: '-2%', icon: <Star />, up: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">7 Days</button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">30 Days</button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900">
              {s.icon}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-black">{s.value}</p>
                <span className={`text-[10px] font-bold ${s.up ? 'text-green-500' : 'text-red-500'}`}>{s.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Revenue Analytics</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-delta-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Monthly Stats</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontSize: '10px' }}
                />
                <Bar dataKey="revenue" fill="#2bb6b6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 flex flex-col">
          <h3 className="text-lg font-bold">Sales by Category</h3>
          <div className="flex-1 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {CATEGORY_DATA.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-xs font-bold text-slate-600">{c.name}</span>
                </div>
                <span className="text-xs font-black">{Math.round((c.value / 1000) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold">Recent Orders</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-delta-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: '#ORD-9821', user: 'Rahul Sharma', status: 'Processing', amount: '₹12,400', date: '2 mins ago' },
                  { id: '#ORD-9820', user: 'Anita Gupta', status: 'Paid', amount: '₹4,500', date: '1 hour ago' },
                  { id: '#ORD-9819', user: 'Vikram Singh', status: 'Shipped', amount: '₹8,900', date: '3 hours ago' },
                  { id: '#ORD-9818', user: 'Sonal Verma', status: 'Delivered', amount: '₹14,200', date: '5 hours ago' },
                ].map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-slate-900">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">{order.user}</span>
                        <span className="text-[10px] text-slate-400">{order.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        order.status === 'Paid' ? 'bg-green-100 text-green-600' : 
                        order.status === 'Processing' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-black text-slate-900 text-right">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Inventory Alerts</h3>
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[8px] font-black uppercase tracking-widest">3 Critical</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Logitech G Pro Mouse', stock: '2 left', alert: 'Low Stock' },
                  { name: 'Sony WH-1000XM5', stock: 'Out of Stock', alert: 'Critical' },
                  { name: 'Artistic Table Clock', stock: '1 left', alert: 'Low Stock' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center">
                        <Package size={18} className="text-slate-400" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold">{item.name}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${item.alert === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>{item.stock}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors text-delta-primary">
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h3 className="font-bold">Recent Customers</h3>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">+14</div>
              </div>
              <p className="text-xs text-slate-400 font-medium">14 new customers joined in the last 24 hours.</p>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
              <h3 className="font-bold">Top Selling Products</h3>
              <div className="space-y-4">
                {[
                  { name: 'Parker Fountain Pen', sales: 420, revenue: '₹5,45,580', img: 'https://picsum.photos/seed/delta-pen-1/100/100' },
                  { name: 'Leather Journal', sales: 380, revenue: '₹3,23,000', img: 'https://picsum.photos/seed/delta-journal-1/100/100' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl border border-black/5 overflow-hidden">
                          <img src={item.img} alt="item" className="w-full h-full object-cover" />
                       </div>
                       <div className="space-y-0.5">
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-[10px] font-black text-delta-primary uppercase tracking-widest">{item.sales} Units Sold</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-900">{item.revenue}</p>
                       <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function OrdersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const orders = [
    { id: 'DEL-9201', user: 'Rahul S.', email: 'rahul@example.com', date: 'Apr 18, 2026', total: '₹4,500', payment: 'Paid', method: 'UPI', status: 'Processing' },
    { id: 'DEL-9202', user: 'Priya M.', email: 'priya@example.com', date: 'Apr 17, 2026', total: '₹12,200', payment: 'Unpaid', method: 'COD', status: 'Pending' },
    { id: 'DEL-9203', user: 'Amit K.', email: 'amit@example.com', date: 'Apr 17, 2026', total: '₹8,900', payment: 'Paid', method: 'Card', status: 'Shipped' },
    { id: 'DEL-9204', user: 'Sneha V.', email: 'sneha@example.com', date: 'Apr 16, 2026', total: '₹2,500', payment: 'Paid', method: 'UPI', status: 'Delivered' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Order Log</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Manage all customer transactions and delivery states.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Filter size={14} /> Today
          </button>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-slate-900/10">
            Export Records
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or User..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-xs outline-none focus:ring-2 focus:ring-delta-primary/20"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment:</span>
            <select className="bg-slate-50 border-none px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
              <option>All Status</option>
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sort:</span>
            <select className="bg-slate-50 border-none px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
              <option>Newest First</option>
              <option>Amount: High-Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Order Information</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Detail</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic-headers">
              {orders.map((o, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900">#{o.id}</span>
                          <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 bg-slate-100 rounded-md uppercase tracking-widest">{o.date}</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-black">
                            {o.user[0]}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-900 underline decoration-delta-primary/30 underline-offset-4">{o.user}</span>
                             <span className="text-[10px] text-slate-400 font-medium">{o.email}</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-slate-900">{o.total}</span>
                          <CreditCard size={14} className="text-slate-300" />
                       </div>
                       <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${o.payment === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {o.payment}
                          </span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{o.method}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl w-fit border border-slate-100">
                       <div className={`w-2 h-2 rounded-full animate-pulse ${o.status === 'Processing' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{o.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-slate-900/10">
                          <Eye size={12} /> Manage
                       </button>
                       <button className="p-2 text-slate-200 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductsView() {
  const [activeTab, setActiveTab] = useState('tech');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
           <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
           <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total SKU: 420</span>
              <div className="w-1 h-1 bg-slate-200 rounded-full" />
              <span className="text-xs text-red-500 font-black uppercase tracking-widest">3 Out of Stock</span>
           </div>
        </div>
        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 hover:-translate-y-1 transition-all">
          <Plus size={16} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-2 border-b border-slate-100">
            <div className="flex gap-1">
               {['tech', 'gifts', 'stationery', 'courses'].map(t => (
                 <button 
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                   {t}
                 </button>
               ))}
            </div>
         </div>
         
         <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                 <div key={i} className="group flex flex-col bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-delta-primary/20 transition-all hover:shadow-xl hover:shadow-delta-primary/5">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-white mb-6 relative shadow-inner border border-black/5">
                       <img src={`https://picsum.photos/seed/p-${i}/400/400`} alt="prod" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-black/5">Logitech</span>
                       </div>
                    </div>
                    <div className="space-y-4 flex-1 flex flex-col">
                       <div className="space-y-1">
                          <div className="flex items-center justify-between">
                             <p className="text-[10px] font-black text-delta-primary uppercase tracking-widest">Mouse</p>
                             <div className="flex items-center gap-1 text-slate-300">
                                <Star size={10} fill="currentColor" />
                                <span className="text-[10px] font-bold text-slate-400">4.9</span>
                             </div>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:underline underline-offset-4 decoration-delta-primary/30">MX Master 3S Gen {i}</h4>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="space-y-1">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Price & Size</p>
                             <div className="flex items-baseline gap-1">
                                <p className="text-lg font-black text-slate-900">₹9,999</p>
                                <span className="text-[9px] text-slate-400 font-bold">/ XL</span>
                             </div>
                          </div>
                          <div className="space-y-1 text-right">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inventory</p>
                             <p className={`text-lg font-black ${i === 2 ? 'text-red-500' : 'text-slate-900'}`}>
                                {i === 2 ? '0' : '42'} <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">{i === 2 ? 'OUT' : 'LEFT'}</span>
                             </p>
                          </div>
                       </div>

                       <div className="pt-4 mt-auto flex items-center gap-2">
                          <button className="flex-1 py-3 bg-white border border-black/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Edit</button>
                          <button className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                             <Trash2 size={14} />
                          </button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}

function UsersView() {
  const users = [
    { name: 'Rahul Sharma', email: 'rahul@delta.ac', role: 'Premium Student', joined: '12 Jan 2026', avatar: 'https://i.pravatar.cc/100?u=rahul' },
    { name: 'Anita Gupta', email: 'anita@workspace.in', role: 'Staff Member', joined: '02 Feb 2026', avatar: 'https://i.pravatar.cc/100?u=anita' },
    { name: 'Sonal Verma', email: 'sonal.v@gmail.com', role: 'Customer', joined: '25 Mar 2026', avatar: 'https://i.pravatar.cc/100?u=sonal' },
    { name: 'Vikram Singh', email: 'vix_king@outlook.com', role: 'Alumni', joined: '15 Apr 2026', avatar: 'https://i.pravatar.cc/100?u=vikram' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Directory</h2>
          <p className="text-sm text-slate-400 font-medium">Manage permissions and view activity of all Delta members.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-50 bg-slate-200" />)}
          </div>
          <span className="text-sm font-black text-slate-900 underline underline-offset-4 decoration-delta-primary/30">2,542 Total Users</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {['All Users', 'Customers', 'Students', 'Staff'].map(t => (
              <button key={t} className={`text-[10px] font-black uppercase tracking-widest ${t === 'All Users' ? 'text-slate-900 border-b-2 border-slate-900 pb-2' : 'text-slate-400 hover:text-slate-900 transition-colors'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs outline-none"
            />
          </div>
        </div>
        <div className="p-8 grid md:grid-cols-2 gap-8">
           {users.map((u, i) => (
             <div key={i} className="group p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-delta-primary/20 transition-all flex items-center justify-between gap-6">
               <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={u.avatar} alt="u" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-900 underline underline-offset-4 decoration-transparent group-hover:decoration-delta-primary/30 transition-all">{u.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                    <div className="pt-2 flex items-center gap-3">
                       <span className="px-3 py-1 bg-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm border border-black/5 text-slate-900">{u.role}</span>
                       <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{u.joined}</span>
                    </div>
                  </div>
               </div>
               <div className="flex flex-col gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                  <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-delta-primary transition-colors border border-black/5 shadow-sm"><Edit3 size={16} /></button>
                  <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-red-500 transition-colors border border-black/5 shadow-sm"><Trash2 size={16} /></button>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function FormsView() {
  const forms = [
    { type: 'Job Application', user: 'Anita Gupta', page: 'Careers', message: 'Applying for Senior Teacher position...', date: '1 hour ago', status: 'New' },
    { type: 'Inquiry', user: 'Rahul S.', page: 'Contact', message: 'Need information about Tally Advance course.', date: '3 hours ago', status: 'Read' },
    { type: 'Bulk Ordering', user: 'Vikram Singh', page: 'Shop', message: 'Looking for 50 sets of Stationery Box.', date: '1 day ago', status: 'New' },
    { type: 'Support', user: 'Sneha V.', page: 'Tech', message: 'Laptop screen repair inquiry.', date: '2 days ago', status: 'Archive' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Form Submissions</h2>
          <p className="text-sm text-slate-400 font-medium">Categorized user responses from job applications, inquiries, and orders.</p>
        </div>
      </div>

      <div className="space-y-4">
        {forms.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group hover:shadow-xl hover:shadow-slate-200/20 transition-all">
             <div className="flex items-start gap-8 flex-1">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 border-2 font-black text-xs ${
                   f.status === 'New' ? 'bg-delta-primary/5 border-delta-primary/20 text-delta-primary' : 'bg-slate-50 border-slate-100 text-slate-400'
                }`}>
                   {f.status}
                </div>
                <div className="space-y-3 flex-1">
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white bg-slate-900 px-3 py-1 rounded-full">{f.type}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">from {f.page} page</span>
                   </div>
                   <h4 className="text-lg font-bold text-slate-900">{f.user}</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl italic">"{f.message}"</p>
                </div>
             </div>
             <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                   <Clock size={12} /> {f.date}
                </div>
                <div className="flex items-center gap-3 w-full">
                   <button className="flex-1 md:w-32 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-delta-primary transition-all shadow-lg shadow-black/5">Open</button>
                   <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"><Trash2 size={16} /></button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Settings(props: any) {
  return <div {...props}><ImageIcon size={20} /></div>
}

function ChevronLeft(props: any) {
  return <ChevronRight className="rotate-180" {...props} />
}

function Sparkles(props: any) {
  return <Star {...props} />
}
function Play(props: any) {
  return <ImageIcon {...props} />
}
function Menu(props: any) {
  return <LayoutDashboard {...props} />
}
