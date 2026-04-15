import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Leaf, Recycle } from "lucide-react";
import { motion } from "motion/react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-500 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-8 mb-6">
          <div className="relative">
            <Recycle className="w-24 h-24 text-white" strokeWidth={2} />
            <Leaf className="w-10 h-10 text-green-300 absolute -bottom-2 -right-2" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl text-white mb-2">Eco-Cycle</h1>
        <p className="text-lg text-white/90">Building a Sustainable Future</p>
        <p className="text-sm text-white/80 mt-2">Smart Waste Management Ecosystem</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8"
      >
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse [animation-delay:0.4s]" />
        </div>
      </motion.div>
    </div>
  );
}
