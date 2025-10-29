
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./ui/button";
import { Sun, Moon, Monitor, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme, actualTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const toggleTheme = () => {
    // Cycle through: light -> dark -> system -> light
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getCurrentIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-4 w-4" />;
    }
    return actualTheme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Moon className="h-4 w-4" />
    );
  };

  const getNextIcon = () => {
    if (theme === "light") {
      return <Moon className="h-4 w-4" />;
    } else if (theme === "dark") {
      return <Monitor className="h-4 w-4" />;
    } else {
      return <Sun className="h-4 w-4" />;
    }
  };

  const getCurrentLabel = () => {
    if (theme === "system") {
      return "System";
    }
    return actualTheme === "light" ? "Light" : "Dark";
  };



  return (
    <Button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="outline"
      size="sm"
      className="relative overflow-hidden bg-background/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 hover:bg-accent/80 transition-all duration-300 group min-w-[140px] h-10 cursor-pointer"
    >
      <div className="flex items-center justify-between w-full">
        {/* Current Theme Display */}
        <div className="flex items-center gap-2">
          <motion.div
            key={`current-${theme}-${actualTheme}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut",
              type: "spring",
              stiffness: 200
            }}
            className="flex items-center"
          >
            {getCurrentIcon()}
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.span
              key={`current-label-${theme}-${actualTheme}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium"
            >
              {getCurrentLabel()}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Arrow and Next Theme Preview */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1"
            >
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <motion.div
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center"
              >
                {getNextIcon()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced background effect */}
      <motion.div
        className="absolute inset-0 rounded-md"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          background: actualTheme === "dark" 
            ? "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)"
            : "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Click ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-md"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: [0, 1.2, 0], 
          opacity: [0, 0.3, 0],
          transition: { duration: 0.5 }
        }}
        style={{
          background: actualTheme === "dark" 
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)"
        }}
      />
    </Button>
  );
};
