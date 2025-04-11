import { useState } from 'react';

export default function WaterIntakeTracker() {
    const [glasses, setGlasses] = useState(0);

    return (
        <div>
            <h3>Water Intake</h3>
            <p>Glasses of water: {glasses}</p>
            <button onClick={() => setGlasses(glasses + 1)}>Add Glass</button>
        </div>
    );
}
