
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { fetchProfile } from "../redux/profileSlice";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function Profile() {
//   const profile = useSelector((state) => state.profile);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProfile(1));
//   }, [dispatch]);

//   const chartData = {
//     labels: ["SGPA", "CGPA"],
//     datasets: [
//       {
//         label: "Grades",
//         data: [profile.sgpa || 0, profile.cgpa || 0],
//         backgroundColor: ["rgba(99,102,241,0.8)", "rgba(236,72,153,0.8)"],
//         borderRadius: 12,
//         barThickness: 40,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: "Academic Performance",
//         color: "#f472b6",
//         font: { size: 18, weight: "bold" },
//       },
//     },
//     scales: {
//       y: { beginAtZero: true, max: 10, ticks: { stepSize: 1 } },
//     },
//     animation: {
//       duration: 1000,
//       easing: "easeOutBounce",
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
//       <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-2xl transform hover:scale-105 transition-transform duration-500 border border-white/20">
//         <h2 className="text-4xl font-extrabold text-center text-pink-400 mb-6 drop-shadow-lg">
//           Profile
//         </h2>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           {[
//             { label: "Name", value: profile.name },
//             { label: "Roll No", value: profile.roll_no },
//             { label: "Branch", value: profile.branch },
//             { label: "Semester", value: profile.semester },
//             { label: "University", value: profile.university },
//           ].map((item) => (
//             <div
//               key={item.label}
//               className="p-4 rounded-xl bg-white/20 backdrop-blur-md shadow-md border border-white/30 text-white font-semibold flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300"
//             >
//               <span className="text-sm text-pink-200">{item.label}</span>
//               <span className="text-lg font-bold">{item.value || "N/A"}</span>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-4">
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProfile } from "../redux/profileSlice";
import { 
  User, 
  BookOpen, 
  Award, 
  Calendar, 
  GraduationCap,
  TrendingUp,
  Star,
  Zap
} from "lucide-react";

export default function Profile() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile(1));
    // Trigger chart animation after component mounts
    setTimeout(() => setShowChart(true), 500);
  }, [dispatch]);

  const profileItems = [
    { label: "Name", value: profile.name, icon: User, color: "from-blue-400 to-purple-600" },
    { label: "Roll No", value: profile.roll_no, icon: BookOpen, color: "from-green-400 to-blue-500" },
    { label: "Branch", value: profile.branch, icon: GraduationCap, color: "from-purple-400 to-pink-600" },
    { label: "Semester", value: profile.semester, icon: Calendar, color: "from-orange-400 to-red-500" },
    { label: "University", value: profile.university, icon: Award, color: "from-teal-400 to-cyan-600" },
  ];

  const sgpaPercentage = ((profile.sgpa || 0) / 10) * 100;
  const cgpaPercentage = ((profile.cgpa || 0) / 10) * 100;

  const CircularProgress = ({ percentage, value, label, delay = 0 }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    
    useEffect(() => {
      if (showChart) {
        setTimeout(() => {
          setAnimatedPercentage(percentage);
        }, delay);
      }
    }, [showChart, percentage, delay]);

    const strokeDasharray = `${animatedPercentage * 2.51} 251`;
    
    return (
      <div className="relative flex flex-col items-center group">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="transparent"
              className="drop-shadow-sm"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-2000 ease-out drop-shadow-lg"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
              {value || "0.0"}
            </span>
            <span className="text-xs text-pink-200 font-medium">{label}</span>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4 animate-pulse">
            Student Profile
          </h1>
          <div className="flex items-center justify-center space-x-2 text-pink-300">
            <Zap className="w-5 h-5 animate-bounce" />
            <span className="text-lg">Academic Dashboard</span>
            <Zap className="w-5 h-5 animate-bounce delay-300" />
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {profileItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.label}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${item.color} shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer group`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className={`w-8 h-8 ${activeCard === index ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
                    <Star className={`w-5 h-5 ${activeCard === index ? 'animate-ping text-yellow-300' : 'opacity-50'}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {item.value || "N/A"}
                  </p>
                </div>

                {/* Floating dots */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/30 rounded-full animate-bounce delay-500"></div>
              </div>
            );
          })}
        </div>

        {/* Academic Performance Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-pink-400 animate-bounce" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Academic Performance
              </h2>
              <TrendingUp className="w-8 h-8 text-purple-400 animate-bounce delay-300" />
            </div>
          </div>

          {/* Circular Progress Charts */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
            <CircularProgress 
              percentage={sgpaPercentage} 
              value={profile.sgpa} 
              label="SGPA" 
              delay={500}
            />
            <CircularProgress 
              percentage={cgpaPercentage} 
              value={profile.cgpa} 
              label="CGPA" 
              delay={1000}
            />
          </div>

          {/* Performance Indicators */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-sm text-pink-300 mb-1">Grade Status</div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                (profile.cgpa || 0) >= 8 ? 'bg-green-500/20 text-green-300' :
                (profile.cgpa || 0) >= 6 ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {(profile.cgpa || 0) >= 8 ? 'Excellent' :
                 (profile.cgpa || 0) >= 6 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}


