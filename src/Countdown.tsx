import React, { useEffect, useState } from "react";


interface CountdownLabelStrings {
    years?: string;
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
}


type CountdownUnit = "years" | "days" | "hours" | "minutes" | "seconds";

interface CountdownProps {
    /** Date cible du compte à rebours (format ISO ou Date JS) */
    targetDate: string | Date;
    countdownColor?: string;
    textColor?: string;
    /** Classe(s) personnalisée(s) pour le conteneur principal */
    className?: string;
    /** Classe(s) personnalisée(s) pour chaque fragment (carré) */
    fragmentClassName?: string;
    /** Labels personnalisés pour les unités de temps */
    labels?: CountdownLabelStrings;
    /** Plus grande unité à afficher (ex: "years", "days", "hours", "minutes", "seconds") */
    maxUnit?: CountdownUnit;
}


const Countdown: React.FC<CountdownProps> = ({
    targetDate,
    countdownColor = "#000",
    textColor = "#fff",
    className = "",
    fragmentClassName = "",
    labels = {},
    maxUnit = "days",
}) => {
    // Helper to get the list of units to display based on maxUnit
    const getUnits = (max: CountdownUnit): CountdownUnit[] => {
        const all: CountdownUnit[] = ["years", "days", "hours", "minutes", "seconds"];
        const idx = all.indexOf(max);
        return idx >= 0 ? all.slice(idx) : all.slice(1); // fallback to days if not found
    };

    const unitsToDisplay = getUnits(maxUnit);

    const calculateTimeLeft = () => {
        const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
        const now = new Date();
        let difference = target.getTime() - now.getTime();

        if (difference <= 0) {
            return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        let years = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
        let remaining = difference;

        if (unitsToDisplay.includes("years")) {
            // Calculate years (approximate, not accounting for leap years)
            const yearMs = 1000 * 60 * 60 * 24 * 365.25;
            years = Math.floor(remaining / yearMs);
            remaining -= years * yearMs;
        }
        if (unitsToDisplay.includes("days")) {
            const dayMs = 1000 * 60 * 60 * 24;
            days = Math.floor(remaining / dayMs);
            remaining -= days * dayMs;
        }
        if (unitsToDisplay.includes("hours")) {
            const hourMs = 1000 * 60 * 60;
            hours = Math.floor(remaining / hourMs);
            remaining -= hours * hourMs;
        }
        if (unitsToDisplay.includes("minutes")) {
            const minMs = 1000 * 60;
            minutes = Math.floor(remaining / minMs);
            remaining -= minutes * minMs;
        }
        if (unitsToDisplay.includes("seconds")) {
            seconds = Math.floor(remaining / 1000);
        }

        return { years, days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetDate, maxUnit]);

    const formatNumber = (num: number) => String(num).padStart(2, "0");

    const timeUnits = unitsToDisplay.map((unit) => {
        let label = labels[unit] || unit.charAt(0).toUpperCase() + unit.slice(1);
        return { label, value: timeLeft[unit] };
    });

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
