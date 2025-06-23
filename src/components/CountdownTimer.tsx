import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const nowUTC = new Date();
      const targetUTC = new Date(targetDate);

      const difference = targetUTC.getTime() - nowUTC.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="flex items-center justify-center space-x-2 text-red-600">
        <Clock className="h-5 w-5" />
        <span className="font-semibold">Contest Started!</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex items-center space-x-1 text-xs text-slate-500">
        <Clock className="h-4 w-4" />
        <span>End in</span>
      </div>
      <div className="flex space-x-2">
        {timeLeft.days > 0 && (
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">{timeLeft.days.toString().padStart(2, '0')}</div>
            <div className="text-xs text-slate-500">Days</div>
          </div>
        )}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-xs text-slate-500">Hours</div>
        </div>
        <div className="text-center text-blue-400 text-2xl font-bold self-center">:</div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs text-slate-500">Min</div>
        </div>
        <div className="text-center text-slate-400 text-2xl font-bold self-center">:</div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-xs text-slate-500">Sec</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
