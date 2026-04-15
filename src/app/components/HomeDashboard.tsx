import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Leaf, Trash2, Droplets, Zap, Clock, TrendingUp, Bell, User, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { toast } from "sonner";

interface BinData {
  type: string;
  level: number;
  color: string;
  icon: any;
}

export function HomeDashboard() {
  const navigate = useNavigate();
  const [bins, setBins] = useState<BinData[]>([
    { type: "Wet Waste", level: 65, color: "green", icon: Droplets },
    { type: "Dry Waste", level: 45, color: "blue", icon: Trash2 },
    { type: "Hazardous", level: 20, color: "red", icon: Zap },
  ]);
  const [nextPickup, setNextPickup] = useState("Today, 10:30 AM");
  const [rewardPoints, setRewardPoints] = useState(1250);

  useEffect(() => {
    // Simulate IoT bin alert when level reaches 80%
    const interval = setInterval(() => {
      setBins(prevBins => {
        const updatedBins = prevBins.map(bin => {
          if (bin.type === "Wet Waste" && bin.level < 80) {
            const newLevel = Math.min(bin.level + 1, 85);
            if (newLevel >= 80 && bin.level < 80) {
              toast.warning("🔔 Wet Waste bin is 80% full!", {
                description: "Pickup scheduled for today",
              });
            }
            return { ...bin, level: newLevel };
          }
          return bin;
        });
        return updatedBins;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <div>
          <h1 className="text-2xl text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Let's keep our city clean</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-full shadow-sm">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
          <button onClick={() => navigate("/app/profile")} className="p-2 bg-white rounded-full shadow-sm">
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Next Pickup Card */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-6 bg-gradient-to-r from-green-600 to-green-700 border-0">
          <CardContent className="p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-green-100 mb-1">Next Pickup</p>
                <p className="text-2xl">{nextPickup}</p>
              </div>
              <div className="bg-white/20 rounded-full p-2">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <Button 
              onClick={() => navigate("/app/truck-tracking")}
              className="w-full bg-white text-green-700 hover:bg-green-50"
            >
              Track Truck Live
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bin Status Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg text-gray-900">Smart Bin Status</h2>
          <button
            onClick={() => navigate("/app/bin-status")}
            className="text-sm text-green-600 flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {bins.map((bin, index) => {
            const Icon = bin.icon;
            const colorClasses = {
              green: "bg-green-100 text-green-700",
              blue: "bg-blue-100 text-blue-700",
              red: "bg-red-100 text-red-700",
            };

            return (
              <motion.div
                key={bin.type}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/app/bin-status")}>
                  <CardContent className="p-4">
                    <div className={`w-10 h-10 rounded-full ${colorClasses[bin.color as keyof typeof colorClasses]} flex items-center justify-center mb-2`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{bin.type}</p>
                    <p className="text-xl text-gray-900 mb-2">{bin.level}%</p>
                    <Progress value={bin.level} className="h-1.5" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rewards Summary */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 to-blue-700 border-0">
        <CardContent className="p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-1">Reward Points</p>
              <p className="text-3xl">{rewardPoints}</p>
              <p className="text-sm text-blue-100 mt-1">+50 points this week</p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          <Button 
            onClick={() => navigate("/app/rewards")}
            className="w-full mt-4 bg-white text-blue-700 hover:bg-blue-50"
          >
            View Rewards
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/app/ai-assistant")}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Leaf className="w-6 h-6 text-green-700" />
            </div>
            <p className="text-sm text-gray-900">AI Assistant</p>
            <p className="text-xs text-gray-500">Scan to segregate</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/app/report-issue")}>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trash2 className="w-6 h-6 text-red-700" />
            </div>
            <p className="text-sm text-gray-900">Report Issue</p>
            <p className="text-xs text-gray-500">Missed pickup?</p>
          </CardContent>
        </Card>
      </div>

      {/* Educational Tip */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <p className="text-sm text-gray-900 mb-1">💡 Daily Tip</p>
              <p className="text-xs text-gray-600">
                Rinse plastic containers before disposing them in the dry waste bin. This prevents contamination!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
