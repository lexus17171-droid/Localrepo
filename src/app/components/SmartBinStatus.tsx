import { useState } from "react";
import { ArrowLeft, Droplets, Trash2, Zap, TrendingUp, Calendar, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

interface BinDetails {
  type: string;
  level: number;
  capacity: string;
  lastEmptied: string;
  nextPickup: string;
  color: string;
  bgColor: string;
  icon: any;
  trend: number;
}

export function SmartBinStatus() {
  const navigate = useNavigate();
  const [bins] = useState<BinDetails[]>([
    {
      type: "Wet Waste",
      level: 85,
      capacity: "85L / 100L",
      lastEmptied: "Yesterday, 10:30 AM",
      nextPickup: "Today, 10:30 AM",
      color: "text-green-700",
      bgColor: "bg-green-100",
      icon: Droplets,
      trend: 15,
    },
    {
      type: "Dry Waste",
      level: 45,
      capacity: "45L / 100L",
      lastEmptied: "2 days ago",
      nextPickup: "Tomorrow, 10:30 AM",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      icon: Trash2,
      trend: -5,
    },
    {
      type: "Hazardous Waste",
      level: 20,
      capacity: "10L / 50L",
      lastEmptied: "5 days ago",
      nextPickup: "In 3 days",
      color: "text-red-700",
      bgColor: "bg-red-100",
      icon: Zap,
      trend: 8,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-2">
        <button onClick={() => navigate("/app")} className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900">Smart Bin Status</h1>
          <p className="text-sm text-gray-600">Real-time IoT sensor data</p>
        </div>
      </div>

      {/* IoT Status Indicator */}
      <Card className="mb-6 bg-white border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div>
              <p className="text-sm text-gray-900">IoT Sensors Active</p>
              <p className="text-xs text-gray-500">Last updated: 2 minutes ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bin Details */}
      <div className="space-y-4">
        {bins.map((bin, index) => {
          const Icon = bin.icon;
          const isAlmostFull = bin.level >= 80;

          return (
            <motion.div
              key={bin.type}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${isAlmostFull ? 'border-orange-300 shadow-lg' : ''}`}>
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${bin.bgColor} rounded-full flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${bin.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900">{bin.type}</h3>
                        <p className="text-sm text-gray-500">{bin.capacity}</p>
                      </div>
                    </div>
                    {isAlmostFull && (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Almost Full
                      </Badge>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Fill Level</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-4 h-4 ${bin.trend > 0 ? 'text-red-500' : 'text-green-500'} ${bin.trend < 0 ? 'rotate-180' : ''}`} />
                        <p className="text-sm text-gray-900">{bin.level}%</p>
                      </div>
                    </div>
                    <Progress 
                      value={bin.level} 
                      className={`h-3 ${isAlmostFull ? 'bg-orange-100' : ''}`}
                    />
                    {bin.trend > 0 && (
                      <p className="text-xs text-gray-500 mt-1">+{bin.trend}% since yesterday</p>
                    )}
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Emptied</p>
                      <p className="text-sm text-gray-900">{bin.lastEmptied}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Next Pickup</p>
                      <p className="text-sm text-gray-900">{bin.nextPickup}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Stats */}
      <Card className="mt-6 bg-gradient-to-r from-green-600 to-blue-600 border-0">
        <CardContent className="p-5 text-white">
          <h3 className="text-lg mb-3">This Week's Collection</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl">3</p>
              <p className="text-sm text-white/80">Pickups</p>
            </div>
            <div>
              <p className="text-2xl">285L</p>
              <p className="text-sm text-white/80">Collected</p>
            </div>
            <div>
              <p className="text-2xl">95%</p>
              <p className="text-sm text-white/80">Accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="mt-4 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Calendar className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 mb-1">Scheduled Collection Days</p>
              <p className="text-xs text-gray-600">
                Wet waste: Daily • Dry waste: Mon, Wed, Fri • Hazardous: Every 15 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
