import { useState, useEffect } from "react";
import { ArrowLeft, Truck, Navigation, Clock, Phone, User, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function LiveTruckTracking() {
  const navigate = useNavigate();
  const [eta, setEta] = useState(15);
  const [distance, setDistance] = useState(2.5);
  const [currentStop, setCurrentStop] = useState(3);
  const [totalStops] = useState(12);

  // Simulate truck movement
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
      setDistance(prev => Math.max(0, prev - 0.2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const route = [
    { address: "123 MG Road", status: "completed", time: "9:45 AM" },
    { address: "456 Park Street", status: "completed", time: "10:05 AM" },
    { address: "789 Church Road", status: "current", time: "10:20 AM" },
    { address: "321 Lake View", status: "your-location", time: "10:35 AM" },
    { address: "654 Hill Station", status: "pending", time: "10:50 AM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Map Area (Simulated) */}
      <div className="relative h-80 bg-gradient-to-br from-blue-200 to-green-200">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(0deg, #333 0px, #333 1px, transparent 1px, transparent 20px),
                           repeating-linear-gradient(90deg, #333 0px, #333 1px, transparent 1px, transparent 20px)`
        }} />
        
        {/* Animated Truck Icon */}
        <motion.div
          animate={{ 
            x: [0, 50, 100, 150, 200],
            y: [80, 120, 160, 140, 180]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10"
        >
          <div className="bg-green-600 p-3 rounded-full shadow-lg">
            <Truck className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Your Location Pin */}
        <div className="absolute bottom-20 right-16">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="bg-blue-600 p-2 rounded-full shadow-lg">
              <MapPin className="w-5 h-5 text-white fill-white" />
            </div>
          </motion.div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate("/app")} 
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="p-4 -mt-6">
        {/* Status Card */}
        <Card className="mb-4 shadow-lg">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h2 className="text-lg text-gray-900">Truck En Route</h2>
                  <Badge className="bg-green-100 text-green-700 border-0 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Time</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <p className="text-xl text-gray-900">{eta} min</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Distance Away</p>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-600" />
                  <p className="text-xl text-gray-900">{distance.toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Worker Info */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-3">Collection Team</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Shankar Kumar</p>
                  <p className="text-xs text-gray-500">Waste Collection Worker</p>
                </div>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Route Progress */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-900">Route Progress</h3>
              <Badge variant="outline" className="text-xs">
                Stop {currentStop} of {totalStops}
              </Badge>
            </div>

            <div className="space-y-3">
              {route.map((stop, index) => {
                const isCompleted = stop.status === "completed";
                const isCurrent = stop.status === "current";
                const isYourLocation = stop.status === "your-location";

                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        isCompleted ? 'bg-green-600' :
                        isCurrent ? 'bg-blue-600 animate-pulse' :
                        isYourLocation ? 'bg-orange-600' :
                        'bg-gray-300'
                      }`} />
                      {index < route.length - 1 && (
                        <div className={`w-0.5 h-8 ${
                          isCompleted ? 'bg-green-300' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className={`text-sm ${
                        isYourLocation ? 'text-orange-700 font-medium' : 
                        isCurrent ? 'text-blue-700 font-medium' :
                        'text-gray-900'
                      }`}>
                        {stop.address}
                        {isYourLocation && " (Your Location)"}
                      </p>
                      <p className="text-xs text-gray-500">{stop.time}</p>
                    </div>
                    {isCompleted && (
                      <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                        Done
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                        Now
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Alert Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Navigation className="w-4 h-4 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-900 mb-1">Live Tracking Active</p>
                <p className="text-xs text-gray-600">
                  You'll receive a notification when the truck is 5 minutes away. Please keep your waste bins ready.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
