import { useState, useEffect } from 'react';
import './BreathingGuide.css'; // External CSS for animation

export default function BreathingGuide() {
    const [isBreathing, setIsBreathing] = useState(false);
    const [phase, setPhase] = useState(''); // inhale, hold, exhale

    useEffect(() => {
        if (!isBreathing) return;

        let phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
        let index = 0;

        setPhase(phases[index]);

        const interval = setInterval(() => {
            index = (index + 1) % phases.length;
            setPhase(phases[index]);
        }, 4000); // 4 seconds per phase

        return () => clearInterval(interval);
    }, [isBreathing]);

    return (
        <div className="container mt-5">
            <div className="card p-4 text-center shadow-sm">
                <h3 className="mb-3">Breathing Guide</h3>
                <p className="mb-4">Take a moment to breathe and relax.</p>
                {isBreathing ? (
                    <>
                        <div className="breathing-circle mx-auto mb-3"></div>
                        <h4 className="mb-3">{phase}...</h4>
                        <button className="btn btn-outline-danger" onClick={() => setIsBreathing(false)}>
                            Stop
                        </button>
                    </>
                ) : (
                    <button className="btn btn-primary" onClick={() => setIsBreathing(true)}>
                        Start Breathing
                    </button>
                )}
            </div>
        </div>
    );
}
