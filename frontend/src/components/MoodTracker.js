import { useState } from 'react';

export default function MoodTracker() {
    const [mood, setMood] = useState('');

    const handleMoodChange = (event) => {
        setMood(event.target.value);
    };

    return (
        <div>
            <label htmlFor="mood">How are you feeling today?</label>
            <select id="mood" value={mood} onChange={handleMoodChange}>
                <option value="">Select</option>
                <option value="happy">😊 Happy</option>
                <option value="okay">😐 Okay</option>
                <option value="sad">😢 Sad</option>
                <option value="stressed">😣 Stressed</option>
            </select>
            {mood && <p>You selected: {mood}</p>}
        </div>
    );
}
