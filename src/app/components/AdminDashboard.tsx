import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Trash2, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  MapPin, 
  CheckCircle2, 
  Clock,
  ArrowLeft,
  Menu,
  BarChart3,
  FileText,
  Settings,
  Truck,
  Droplets,
  Zap,
  Navigation
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface BinData {
  id: string;
  location: string;
  type: string;
  level: number;
  lastEmptied: string;
  status: "normal" | "warning" | "critical";
}

interface TruckData {
  id: string;
  driver: string;
  route: string;
  progress: number;
  status: "active" | "idle";
  currentLocation: string;
}

interface ComplaintData {
  id: string;
  type: string;
  location: string;
  status: "pending" | "in-progress" | "resolved";
  reportedBy: string;
  date: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const [bins] = useState<BinData[]>([
    { id: "BIN001", location: "MG Road, Sector 1", type: "Wet", level: 85, lastEmptied: "2 hours ago", status: "critical" },
    { id: "BIN002", location: "Park Street, Sector 2", type: "Dry", level: 60, lastEmptied: "5 hours ago", status: "warning" },
    { id: "BIN003", location: "Church Road, Sector 3", type: "Hazardous", level: 30, lastEmptied: "1 day ago", status: "normal" },
    { id: "BIN004", location: "Lake View, Sector 5", type: "Wet", level: 45, lastEmptied: "3 hours ago", status: "normal" },
    { id: "BIN005", location: "Hill Station, Sector 6", type: "Dry", level: 90, lastEmptied: "8 hours ago", status: "critical" },
  ]);

  const [trucks] = useState<TruckData[]>([
    { id: "TRK001", driver: "Shankar Kumar", route: "Route A", progress: 60, status: "active", currentLocation: "Sector 3" },
    { id: "TRK002", driver: "Rajesh Singh", route: "Route B", progress: 30, status: "active", currentLocation: "Sector 1" },
    { id: "TRK003", driver: "Amit Patel", route: "Route C", progress: 0, status: "idle", currentLocation: "Depot" },
  ]);

  const [complaints] = useState<ComplaintData[]>([
    { id: "C1236", type: "Missed Pickup", location: "MG Road", status: "in-progress", reportedBy: "Priya S.", date: "Apr 15, 10:30 AM" },
    { id: "C1235", type: "Illegal Dumping", location: "Park Street", status: "pending", reportedBy: "Rahul K.", date: "Apr 14, 3:45 PM" },
    { id: "C1234", type: "Bin Overflow", location: "Lake View", status: "resolved", reportedBy: "Anjali M.", date: "Apr 13, 9:20 AM" },
  ]);

  const stats = [
    { title: "Total Bins", value: "245", change: "+5%", icon: Trash2, color: "green" },
    { title: "Active Trucks", value: "12", change: "2 idle", icon: Truck, color: "blue" },
    { title: "Total Users", value: "1,847", change: "+12%", icon: Users, color: "purple" },
    { title: "Pending Issues", value: "8", change: "-3 today", icon: AlertCircle, color: "orange" },
  ];

  const getBinStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-700 bg-red-100 border-red-300";
      case "warning": return "text-orange-700 bg-orange-100 border-orange-300";
      default: return "text-green-700 bg-green-100 border-green-300";
    }
  };

  const getComplaintStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-700";
      case "in-progress": return "bg-blue-100 text-blue-700";
      default: return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/login")} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">Eco-Cycle Admin</h1>
                <p className="text-xs text-gray-500">Municipal Waste Management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 border-0">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              All Systems Online
            </Badge>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              green: "bg-green-100 text-green-700",
              blue: "bg-blue-100 text-blue-700",
              purple: "bg-purple-100 text-purple-700",
              orange: "bg-orange-100 text-orange-700",
            };

            return (
              <motion.div
                key={stat.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl text-gray-900 mb-1">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                      </div>
                      <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bins">Smart Bins</TabsTrigger>
            <TabsTrigger value="trucks">Fleet Tracking</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Critical Bins Alert */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Critical Bins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bins.filter(bin => bin.status === "critical").map((bin) => (
                      <div key={bin.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <Trash2 className="w-5 h-5 text-red-700" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{bin.location}</p>
                            <p className="text-xs text-gray-600">{bin.type} Waste - {bin.level}% Full</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Dispatch
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Trucks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    Active Fleet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trucks.filter(truck => truck.status === "active").map((truck) => (
                      <div key={truck.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-sm text-gray-900">{truck.driver}</p>
                            <p className="text-xs text-gray-600">{truck.route} - {truck.currentLocation}</p>
                          </div>
                          <Badge className="bg-blue-600 text-white border-0">
                            <Navigation className="w-3 h-3 mr-1" />
                            Live
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={truck.progress} className="flex-1 h-2" />
                          <span className="text-xs text-gray-600">{truck.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Collection Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Today's Collection Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Droplets className="w-6 h-6 text-green-700" />
                    </div>
                    <p className="text-2xl text-gray-900 mb-1">2,450 L</p>
                    <p className="text-sm text-gray-600">Wet Waste Collected</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Trash2 className="w-6 h-6 text-blue-700" />
                    </div>
                    <p className="text-2xl text-gray-900 mb-1">1,850 L</p>
                    <p className="text-sm text-gray-600">Dry Waste Collected</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-red-700" />
                    </div>
                    <p className="text-2xl text-gray-900 mb-1">150 L</p>
                    <p className="text-sm text-gray-600">Hazardous Waste</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bins Tab */}
          <TabsContent value="bins">
            <Card>
              <CardHeader>
                <CardTitle>All Smart Bins - IoT Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm text-gray-600">Bin ID</th>
                        <th className="text-left py-3 px-4 text-sm text-gray-600">Location</th>
                        <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                        <th className="text-left py-3 px-4 text-sm text-gray-600">Fill Level</th>
                        <th className="text-left py-3 px-4 text-sm text-gray-600">Last Emptied</th>
                        <th className="text-left py-3 px-4 text-sm text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bins.map((bin) => (
                        <tr key={bin.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">{bin.id}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900">{bin.location}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">{bin.type}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Progress value={bin.level} className="w-24 h-2" />
                              <span className="text-sm text-gray-900">{bin.level}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">{bin.lastEmptied}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${getBinStatusColor(bin.status)} border-0`}>
                              {bin.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trucks Tab */}
          <TabsContent value="trucks">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Management & Route Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trucks.map((truck) => (
                    <div key={truck.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Truck className="w-6 h-6 text-blue-700" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{truck.id} - {truck.driver}</p>
                            <p className="text-xs text-gray-600">{truck.route}</p>
                          </div>
                        </div>
                        <Badge className={truck.status === "active" ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-700 border-0"}>
                          {truck.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Current Location:</span>
                          <span className="text-gray-900">{truck.currentLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Route Progress:</span>
                          <Progress value={truck.progress} className="flex-1 h-2" />
                          <span className="text-sm text-gray-900">{truck.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle>Citizen Complaints & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complaints.map((complaint) => {
                    const StatusIcon = complaint.status === "resolved" ? CheckCircle2 : 
                                      complaint.status === "in-progress" ? Clock : AlertCircle;
                    
                    return (
                      <div key={complaint.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm text-gray-900">{complaint.type}</p>
                              <Badge className={`${getComplaintStatusColor(complaint.status)} border-0`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {complaint.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">ID: {complaint.id}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {complaint.location}
                              </span>
                              <span>Reported by: {complaint.reportedBy}</span>
                              <span>{complaint.date}</span>
                            </div>
                          </div>
                          {complaint.status !== "resolved" && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Take Action
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
