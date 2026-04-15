import { useState } from "react";
import { ArrowLeft, User, MapPin, Bell, Globe, LogOut, ChevronRight, Mail, Phone, Home } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { motion } from "motion/react";
import { toast } from "sonner";

export function UserProfile() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [truckArrivalAlerts, setTruckArrivalAlerts] = useState(true);
  const [binFullAlerts, setBinFullAlerts] = useState(true);
  const [language, setLanguage] = useState("English");
  const [isEditing, setIsEditing] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    address: "321 Lake View, Sector 5, Bangalore - 560001",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const languages = ["English", "Hindi", "Kannada", "Tamil", "Telugu"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-2">
        <button onClick={() => navigate("/app")} className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900">Profile & Settings</h1>
          <p className="text-sm text-gray-600">Manage your account</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl text-gray-900">{userInfo.name}</h2>
              <p className="text-sm text-gray-600">{userInfo.email}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <div className="relative mt-1">
                  <Home className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="address"
                    value={userInfo.address}
                    onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3 py-2">
                <Phone className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm text-gray-900">{userInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 py-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm text-gray-900">{userInfo.address}</p>
                </div>
              </div>
              <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full mt-2">
                Edit Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-gray-700" />
            <h3 className="text-sm text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">All Notifications</p>
                <p className="text-xs text-gray-500">Enable/disable all notifications</p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Truck Arrival Alerts</p>
                <p className="text-xs text-gray-500">Get notified when truck is near</p>
              </div>
              <Switch
                checked={truckArrivalAlerts}
                onCheckedChange={setTruckArrivalAlerts}
                disabled={!notificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Bin Full Alerts</p>
                <p className="text-xs text-gray-500">Alert when bins reach 80%</p>
              </div>
              <Switch
                checked={binFullAlerts}
                onCheckedChange={setBinFullAlerts}
                disabled={!notificationsEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-gray-700" />
            <h3 className="text-sm text-gray-900">Language Preferences</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  toast.success(`Language changed to ${lang}`);
                }}
                className={`p-3 rounded-lg border-2 text-sm transition-all ${
                  language === lang
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other Options */}
      <Card className="mb-6">
        <CardContent className="p-0">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <p className="text-sm text-gray-900">Help & Support</p>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <p className="text-sm text-gray-900">Privacy Policy</p>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <p className="text-sm text-gray-900">Terms & Conditions</p>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full border-red-300 text-red-600 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>

      {/* Version Info */}
      <p className="text-center text-xs text-gray-500 mt-4">
        Eco-Cycle v1.0.0
      </p>
    </div>
  );
}
