"use client";
import {ReactElement, useEffect, useState} from "react";

export default function NotLunchTime (): ReactElement {
    const [timeUntilLunch, setTimeUntilLunch] = useState<string>("");

    useEffect(() => {
        const calculateTimeUntilLunch = (): void => {
            const currentTime: Date = new Date();
            const nextLunchTime: Date = new Date();
            const currentDay: number = currentTime.getDay();
            const currentHour: number = currentTime.getHours();
            const currentMinute: number = currentTime.getMinutes();

            nextLunchTime.setHours(10, 30, 0, 0);

            const isWeekend: boolean = currentDay === 0 || currentDay === 6;
            const isAfterLunchWindow: boolean =
                currentHour > 11 || (currentHour === 11 && currentMinute >= 30);

            if (isWeekend) {
                const daysUntilMonday: number = (8 - currentDay) % 7;
                nextLunchTime.setDate(currentTime.getDate() + daysUntilMonday);
            } else if (currentDay === 5 && isAfterLunchWindow) {
                nextLunchTime.setDate(currentTime.getDate() + 3);
            } else if (isAfterLunchWindow) {
                nextLunchTime.setDate(currentTime.getDate() + 1);
            }

            const timeDifference: number = nextLunchTime.getTime() - currentTime.getTime();
            const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours: number = Math.floor(timeDifference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            const minutes: number = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);
            if (days > 0) {
                setTimeUntilLunch(`${days}d ${hours}t ${minutes}m ${seconds}s`);
            } else {
                setTimeUntilLunch(`${hours}t ${minutes}m ${seconds}s`);
            }
        };
        calculateTimeUntilLunch();
        const intervalId: NodeJS.Timeout = setInterval(calculateTimeUntilLunch, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <main className="flex flex-col items-center pt-32 text-center">
            <h1 className="text-5xl font-extrabold z-20">Det er ikke lunsj :´(</h1>
            <h2 className="text-3xl font-medium mt-40 z-20 pt-32">Men neste lunsj er om:</h2>
            <p className="text-3xl font-mono mt-5 z-20">{timeUntilLunch}</p>
        </main>
    );
}
