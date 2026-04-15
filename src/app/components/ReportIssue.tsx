import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Upload, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { toast } from "sonner";

interface Report {
  id: string;
  type: string;
  status: "pending" | "in-progress" | "resolved";
  date: string;
  description: string;
}

export function ReportIssue() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState("");
  const [description, setDescription] = useState("");
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [previousReports] = useState<Report[]>([
    {
      id: "R1234",
      type: "Missed Pickup",
      status: "resolved",
      date: "Apr 10, 2026",
      description: "Wet waste not collected",
    },
    {
      id: "R1235",
      type: "Garbage Pile",
      status: "in-progress",
      date: "Apr 14, 2026",
      description: "Illegal dumping near park",
    },
  ]);

  const issueTypes = [
    "Missed Pickup",
    "Garbage Pile/Illegal Dumping",
    "Bin Overflow",
    "Mixed Waste",
    "Damaged Bin",
    "Other",
  ];

  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
    toast.success("Photo uploaded successfully");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    
    setTimeout(() => {
      toast.success("Report submitted successfully!", {
        description: "Tracking ID: R1236 - We'll resolve this soon.",
      });
      
      setTimeout(() => {
        navigate("/app");
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <Card className="max-w-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl text-gray-900 mb-2">Report Submitted!</h2>
              <p className="text-gray-600 mb-4">
                Your issue has been logged and our team will address it soon.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">Tracking ID</p>
                <p className="text-xl text-blue-700">R1236</p>
              </div>
              <p className="text-sm text-gray-500">Redirecting to home...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "resolved":
        return { color: "bg-green-100 text-green-700", icon: CheckCircle2 };
      case "in-progress":
        return { color: "bg-blue-100 text-blue-700", icon: Clock };
      case "pending":
        return { color: "bg-orange-100 text-orange-700", icon: AlertCircle };
      default:
        return { color: "bg-gray-100 text-gray-700", icon: AlertCircle };
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
          <h1 className="text-2xl text-gray-900">Report Issue</h1>
          <p className="text-sm text-gray-600">Help us keep the city clean</p>
        </div>
      </div>

      {/* Report Form */}
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="space-y-5">
              {/* Issue Type Selection */}
              <div>
                <Label className="mb-3 block">What's the issue?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {issueTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedIssue(type)}
                      className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        selectedIssue === type
                          ? "border-green-600 bg-green-50 text-green-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about the issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Photo Upload */}
              <div>
                <Label className="mb-2 block">Upload Photo (Optional)</Label>
                <div
                  onClick={handlePhotoUpload}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    photoUploaded
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {photoUploaded ? (
                    <div>
                      <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-green-700">Photo uploaded</p>
                    </div>
                  ) : (
                    <div>
                      <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Tap to upload photo</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-700" />
                  <div>
                    <p className="text-sm text-gray-900">Location</p>
                    <p className="text-xs text-gray-600">321 Lake View, Sector 5</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-6 mb-6 text-lg"
          disabled={!selectedIssue || !description}
        >
          <Upload className="w-5 h-5 mr-2" />
          Submit Report
        </Button>
      </form>

      {/* Previous Reports */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm text-gray-900 mb-4">Previous Reports</h3>
          
          {previousReports.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No previous reports</p>
          ) : (
            <div className="space-y-3">
              {previousReports.map((report) => {
                const statusInfo = getStatusInfo(report.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={report.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-900">{report.type}</p>
                        <p className="text-xs text-gray-500">ID: {report.id}</p>
                      </div>
                      <Badge className={`${statusInfo.color} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Text */}
      <Card className="mt-4 bg-green-50 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm text-gray-900 mb-1">💡 Quick Tip</p>
          <p className="text-xs text-gray-600">
            Adding photos helps our team resolve issues faster. We typically respond within 24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
