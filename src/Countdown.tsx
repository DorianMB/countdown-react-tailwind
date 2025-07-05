import React, { useEffect, useState } from "react";

interface CountdownProps {
    /** Date cible du compte à rebours (format ISO ou Date JS) */
    targetDate: string | Date;
    countdownColor?: string;
    textColor?: string;
    /** Classe(s) personnalisée(s) pour le conteneur principal */
    className?: string;
    /** Classe(s) personnalisée(s) pour chaque fragment (carré) */
    fragmentClassName?: string;
}

const Countdown: React.FC<CountdownProps> = ({
    targetDate,
    countdownColor = "#000",
    textColor = "#fff",
    className = "",
    fragmentClassName = "",
}) => {
    const calculateTimeLeft = () => {
        const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
        const now = new Date();
        const difference = target.getTime() - now.getTime();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number) => String(num).padStart(2, "0");

    const timeUnits = [
        { label: "Jours", value: timeLeft.days },
        { label: "Heures", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Secondes", value: timeLeft.seconds },
    ];

    return (

        <div
            id="countdown-component"
            className={`flex items-center gap-2 md:gap-4 ${className}`.trim()}
            style={{ color: textColor }}
        >
            {timeUnits.map((unit, index) => (
                <React.Fragment key={unit.label}>
                    <div
                        className={`flex flex-col items-center rounded-xl text-white p-4 md:p-6 w-[100px] sm:w-[150px] ${fragmentClassName}`.trim()}
                        style={{ backgroundColor: countdownColor }}
                    >
                        <div className="text-3xl md:text-5xl font-bold">
                            {formatNumber(unit.value)}
                        </div>
                        <div className="text-xs md:text-sm uppercase tracking-wide mt-2 text-white">
                            {unit.label}
                        </div>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <span
                            className="text-3xl md:text-5xl font-bold"
                            style={{ color: countdownColor }}
                        >
                            :
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Countdown;
