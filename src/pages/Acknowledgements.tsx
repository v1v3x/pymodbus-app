import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Acknowledgements() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden py-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl font-bold mb-4">Special Thanks</h1>
        <p className="text-xl text-gray-400">To those who made this project possible</p>
      </motion.div>

      <div className="space-y-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 2 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-bold text-primary">Project Mentor</h2>
          <p className="text-2xl">Prof. Pramod Kanjalkar</p>
          <p className="text-xl text-gray-400">For their continuous support and guidance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 4 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-bold text-primary">Technologies Used</h2>
          <div className="space-y-2">
            <p className="text-xl">PyModbus</p>
            <p className="text-xl">React</p>
            <p className="text-xl">Tailwind CSS</p>
            <p className="text-xl">Flask</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl font-bold text-primary">Development Team</h2>
          <p className="text-xl">BATCH 3 - 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 8 }}
          className="text-center mt-20 space-y-4"
        >
          <p className="text-2xl">Made with</p>
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Heart className="h-12 w-12 text-red-500 mx-auto" />
          </motion.div>
          <p className="text-xl text-gray-400">© 2024 Modbus Connector Portal</p>
        </motion.div>
      </div>
    </div>
  );
} 