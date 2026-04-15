import { useState } from "react";
import { ArrowLeft, Trophy, Gift, Star, TrendingUp, CheckCircle2, Zap, Target } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";
import { toast } from "sonner";

interface Achievement {
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: any;
  color: string;
}

interface Reward {
  title: string;
  points: number;
  description: string;
  available: boolean;
}

export function RewardsGamification() {
  const navigate = useNavigate();
  const [totalPoints] = useState(1250);
  const [weeklyPoints] = useState(85);
  const [rank] = useState("Gold");
  const [nextRank] = useState("Platinum");
  const [pointsToNextRank] = useState(250);

  const [achievements] = useState<Achievement[]>([
    {
      title: "First Scan",
      description: "Used AI assistant for the first time",
      points: 50,
      completed: true,
      icon: Zap,
      color: "green",
    },
    {
      title: "Perfect Week",
      description: "7 days of correct segregation",
      points: 100,
      completed: true,
      icon: Target,
      color: "blue",
    },
    {
      title: "Eco Warrior",
      description: "Reach 1000 total points",
      points: 200,
      completed: true,
      icon: Trophy,
      color: "yellow",
    },
    {
      title: "Community Hero",
      description: "Report 5 issues",
      points: 150,
      completed: false,
      icon: Star,
      color: "purple",
    },
  ]);

  const [rewards] = useState<Reward[]>([
    {
      title: "Rs.50 Shopping Voucher",
      points: 500,
      description: "Redeem at partner stores",
      available: true,
    },
    {
      title: "Rs.100 Shopping Voucher",
      points: 1000,
      description: "Redeem at partner stores",
      available: true,
    },
    {
      title: "Movie Tickets (2)",
      points: 800,
      description: "Valid at select theaters",
      available: true,
    },
    {
      title: "Rs.200 Shopping Voucher",
      points: 2000,
      description: "Redeem at partner stores",
      available: false,
    },
  ]);

  const handleRedeem = (reward: Reward) => {
    if (totalPoints >= reward.points) {
      toast.success("Reward redeemed!", {
        description: `You've redeemed ${reward.title}`,
      });
    } else {
      toast.error("Insufficient points", {
        description: `You need ${reward.points - totalPoints} more points`,
      });
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
      yellow: "bg-yellow-100 text-yellow-700",
      purple: "bg-purple-100 text-purple-700",
    };
    return colors[color] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-2">
        <button onClick={() => navigate("/app")} className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900">Rewards & Achievements</h1>
          <p className="text-sm text-gray-600">Earn points for eco-friendly actions</p>
        </div>
      </div>

      {/* Points Summary */}
      <Card className="mb-6 bg-gradient-to-r from-green-600 to-blue-600 border-0">
        <CardContent className="p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-green-100 mb-1">Total Points</p>
              <p className="text-4xl mb-2">{totalPoints}</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm">+{weeklyPoints} this week</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <Trophy className="w-8 h-8" />
            </div>
          </div>

          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm">Current Rank: {rank}</p>
              <p className="text-sm">{pointsToNextRank} to {nextRank}</p>
            </div>
            <Progress value={(totalPoints % 500) / 5} className="h-2 bg-white/30" />
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="p-5">
          <h3 className="text-sm text-gray-900 mb-3">Earn Points By:</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">✓ Proper waste segregation</p>
              <Badge className="bg-green-600 text-white border-0">+10</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">✓ Using AI assistant</p>
              <Badge className="bg-green-600 text-white border-0">+5</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">✓ Reporting issues</p>
              <Badge className="bg-green-600 text-white border-0">+20</Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">✓ Weekly streak bonus</p>
              <Badge className="bg-green-600 text-white border-0">+50</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <div className="mb-6">
        <h2 className="text-lg text-gray-900 mb-3">Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${achievement.completed ? 'border-2 border-green-500' : 'opacity-60'}`}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${getColorClasses(achievement.color)} rounded-full flex items-center justify-center mx-auto mb-2 relative`}>
                      <Icon className="w-6 h-6" />
                      {achievement.completed && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 mb-1">{achievement.title}</p>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    <Badge className="bg-yellow-100 text-yellow-700 border-0">
                      +{achievement.points} pts
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Redeem Rewards */}
      <div className="mb-6">
        <h2 className="text-lg text-gray-900 mb-3">Redeem Rewards</h2>
        <div className="space-y-3">
          {rewards.map((reward, index) => {
            const canRedeem = totalPoints >= reward.points && reward.available;
            
            return (
              <motion.div
                key={reward.title}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={!reward.available ? 'opacity-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{reward.title}</p>
                        <p className="text-xs text-gray-500 mb-1">{reward.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                            {reward.points} points
                          </Badge>
                          {!reward.available && (
                            <Badge variant="outline" className="text-xs">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleRedeem(reward)}
                        disabled={!canRedeem}
                        className={canRedeem ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        Redeem
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
        <CardContent className="p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-purple-100 mb-1">Community Leaderboard</p>
              <p className="text-2xl">Rank #42</p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <Star className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-purple-100 mb-3">
            You're in the top 10% of your community!
          </p>
          <Button className="w-full bg-white text-purple-700 hover:bg-purple-50">
            View Full Leaderboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}