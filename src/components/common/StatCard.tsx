import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const StatCard = ({
  name,
  icon: Icon,
  value = 0,
  color,
  goal = 100,
  showUrgency = false,
  duration = 2000, // animation duration in ms
  delay = 300, // animation delay in ms
  valuePrefix = "",
  valueSuffix = "",
  transitionDelay = 0, // delay before the animation starts
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const delayTimeoutRef = useRef(null);

  useEffect(() => {
    // Reset animation state
    setDisplayValue(0);
    setAnimationProgress(0);
    startTimeRef.current = null;

    // Clear any existing animation frame and timeout
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min(elapsed / duration, 1);

      // Update animation progress for color transition
      setAnimationProgress(currentProgress);

      // Calculate the current display value based on progress
      const currentValue = Math.floor(value * currentProgress);
      setDisplayValue(currentValue);

      // Continue animation until complete
      if (currentProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation after delay
    delayTimeoutRef.current = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, [value, duration, delay]);

  // Calculate background color based on proximity to goal and animation progress
  const getBackgroundColor = () => {
    if (!showUrgency) return "bg-zinc-50 bg-opacity-50";

    // Use the animation progress to determine color, not the final value
    // This synchronizes color transition with counting
    const effectiveRatio = (value / goal) * animationProgress;

    if (effectiveRatio < 0.3) {
      return "bg-red-50 bg-opacity-50";
    } else if (effectiveRatio < 0.7) {
      return "bg-yellow-50 bg-opacity-50";
    } else {
      return "bg-green-50 bg-opacity-50";
    }
  };

  // Calculate border color based on proximity to goal and animation progress
  const getBorderColor = () => {
    if (!showUrgency) return "border-zinc-100";

    const effectiveRatio = (value / goal) * animationProgress;

    if (effectiveRatio < 0.3) {
      return "border-red-200";
    } else if (effectiveRatio < 0.7) {
      return "border-yellow-200";
    } else {
      return "border-green-200";
    }
  };

  // Get the completion percentage for display
  const getCompletionPercentage = () => {
    const percentage = Math.round((value / goal) * 100);
    // Show the percentage based on animation progress
    return Math.round(percentage * animationProgress);
  };

  const backgroundColorClass = getBackgroundColor();
  const borderColorClass = getBorderColor();

  return (
    <motion.div
      className={`backdrop-blur-md overflow-hidden shadow-lg rounded-xl border ${borderColorClass} ${backgroundColorClass} transition-colors duration-300`}
      //   whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: transitionDelay }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-600">
          {Icon && <Icon size={20} className="mr-2" style={{ color }} />}
          {name}
        </span>
        <p className="text-3xl font-semibold mt-1 text-gray-600">
          {valuePrefix}
          {displayValue.toLocaleString()}
          {valueSuffix}
        </p>
        {showUrgency && goal > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            {getCompletionPercentage()}% of goal
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
