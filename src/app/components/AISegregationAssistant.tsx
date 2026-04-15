import { useState } from "react";
import { ArrowLeft, Camera, ScanLine, CheckCircle2, Droplets, Trash2, Zap, Lightbulb, History } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { toast } from "sonner";

interface ScanResult {
  item: string;
  category: "wet" | "dry" | "hazardous";
  confidence: number;
  tips: string;
}

export function AISegregationAssistant() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const recentScans = [
    { item: "Plastic Bottle", category: "dry", time: "2 hours ago" },
    { item: "Fruit Peels", category: "wet", time: "Yesterday" },
    { item: "Battery", category: "hazardous", time: "2 days ago" },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulate AI scanning
    setTimeout(() => {
      const results: ScanResult[] = [
        {
          item: "Plastic Water Bottle",
          category: "dry",
          confidence: 95,
          tips: "Rinse the bottle before disposal. Remove the cap and label if possible for better recycling.",
        },
        {
          item: "Banana Peel",
          category: "wet",
          confidence: 98,
          tips: "Great for composting! This organic waste will decompose naturally and enrich the soil.",
        },
        {
          item: "AA Battery",
          category: "hazardous",
          confidence: 92,
          tips: "Never dispose batteries in regular waste. They contain toxic materials that can harm the environment.",
        },
        {
          item: "Cardboard Box",
          category: "dry",
          confidence: 96,
          tips: "Flatten the box to save space. Remove any tape or plastic before recycling.",
        },
        {
          item: "Food Leftovers",
          category: "wet",
          confidence: 94,
          tips: "Perfect for wet waste bin. Consider composting at home to reduce waste volume.",
        },
      ];

      const randomResult = results[Math.floor(Math.random() * results.length)];
      setScanResult(randomResult);
      setIsScanning(false);

      // Show success toast
      toast.success("Item identified successfully!", {
        description: `${randomResult.item} → ${randomResult.category.charAt(0).toUpperCase() + randomResult.category.slice(1)} Waste`,
      });
    }, 2500);
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "wet":
        return {
          icon: Droplets,
          color: "text-green-700",
          bgColor: "bg-green-100",
          borderColor: "border-green-300",
          label: "Wet Waste",
        };
      case "dry":
        return {
          icon: Trash2,
          color: "text-blue-700",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-300",
          label: "Dry Waste",
        };
      case "hazardous":
        return {
          icon: Zap,
          color: "text-red-700",
          bgColor: "bg-red-100",
          borderColor: "border-red-300",
          label: "Hazardous Waste",
        };
      default:
        return {
          icon: Trash2,
          color: "text-gray-700",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-300",
          label: "Unknown",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-2">
        <button onClick={() => navigate("/app")} className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900">AI Segregation Assistant</h1>
          <p className="text-sm text-gray-600">Scan items to learn proper disposal</p>
        </div>
      </div>

      {/* Camera/Scan Area */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {/* Simulated Camera View */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
            
            {!isScanning && !scanResult && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center z-10"
              >
                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-12 h-12 text-white" />
                </div>
                <p className="text-white text-sm">Position item within frame</p>
              </motion.div>
            )}

            {isScanning && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.1 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                className="z-10"
              >
                <div className="w-32 h-32 border-4 border-green-500 rounded-lg animate-pulse">
                  <ScanLine className="w-full h-full text-green-500 p-4" />
                </div>
              </motion.div>
            )}

            {scanResult && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="z-10"
              >
                <div className="bg-green-500 rounded-full p-6">
                  <CheckCircle2 className="w-16 h-16 text-white" />
                </div>
              </motion.div>
            )}

            {/* Scanning Grid Overlay */}
            {isScanning && (
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `repeating-linear-gradient(0deg, #4ade80 0px, #4ade80 1px, transparent 1px, transparent 20px),
                                 repeating-linear-gradient(90deg, #4ade80 0px, #4ade80 1px, transparent 1px, transparent 20px)`
              }} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scan Button */}
      {!isScanning && (
        <Button
          onClick={handleScan}
          className="w-full bg-green-600 hover:bg-green-700 py-6 mb-6 text-lg"
          disabled={isScanning}
        >
          <ScanLine className="w-6 h-6 mr-2" />
          {scanResult ? "Scan Another Item" : "Start Scanning"}
        </Button>
      )}

      {isScanning && (
        <Card className="mb-6 bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-gray-900">Analyzing item with AI...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scan Result */}
      {scanResult && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className={`mb-6 border-2 ${getCategoryInfo(scanResult.category).borderColor}`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 ${getCategoryInfo(scanResult.category).bgColor} rounded-full flex items-center justify-center`}>
                  {(() => {
                    const Icon = getCategoryInfo(scanResult.category).icon;
                    return <Icon className={`w-7 h-7 ${getCategoryInfo(scanResult.category).color}`} />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">{scanResult.item}</h3>
                  <Badge className={`${getCategoryInfo(scanResult.category).bgColor} ${getCategoryInfo(scanResult.category).color} border-0`}>
                    {getCategoryInfo(scanResult.category).label}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Confidence</p>
                  <p className="text-xl text-green-600">{scanResult.confidence}%</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900 mb-1">Disposal Tip</p>
                    <p className="text-xs text-gray-700">{scanResult.tips}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recent Scans */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-gray-600" />
            <h3 className="text-sm text-gray-900">Recent Scans</h3>
          </div>

          <div className="space-y-3">
            {recentScans.map((scan, index) => {
              const info = getCategoryInfo(scan.category);
              const Icon = info.icon;

              return (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${info.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${info.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{scan.item}</p>
                      <p className="text-xs text-gray-500">{scan.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {info.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Educational Info */}
      <Card className="mt-4 bg-green-50 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm text-gray-900 mb-2">How AI Segregation Works</p>
          <p className="text-xs text-gray-600">
            Our AI uses computer vision to identify waste items and classify them into wet, dry, or hazardous categories. 
            This helps you dispose items correctly and earn reward points for proper segregation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
