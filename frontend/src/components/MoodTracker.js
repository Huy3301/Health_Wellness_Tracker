import { useState, useEffect } from 'react';

const moods = [
    { label: 'Excited', value: 'excited', emoji: '🤩' },
    { label: 'Happy', value: 'happy', emoji: '😊' },
    { label: 'Okay', value: 'okay', emoji: '😐' },
    { label: 'Sad', value: 'sad', emoji: '😢' },
    { label: 'Stressed', value: 'stressed', emoji: '😣' }
];

export default function MoodTracker() {
    const [mood, setMood] = useState('');
    const [note, setNote] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleMoodClick = (value) => {
        setMood(value);
        const modal = new window.bootstrap.Modal(document.getElementById('moodModal'));
        modal.show();
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const modal = window.bootstrap.Modal.getInstance(document.getElementById('moodModal'));
        modal.hide();
    };

    if (submitted) {
        const moodEmoji = moods.find((m) => m.value === mood)?.emoji;
        return (
            <div className="text-center p-4 border rounded shadow-sm bg-light mt-4">
                <h4>You’re feeling {moodEmoji} today</h4>
            </div>
        );
    }

    return (
        <div className="mt-5">
            <div className="card p-4 shadow-sm text-center">
                <h3 className="mb-3">How are you feeling today?</h3>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                    {moods.map(({ label, value, emoji }) => (
                        <div>
                            <button
                                key={value}
                                onClick={() => handleMoodClick(value)}
                                className="border-0 bg-transparent fs-1"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    lineHeight: '80px',
                                    textAlign: 'center',
                                    outline: 'none',
                                    boxShadow: 'none',
                                }}
                                aria-label={label}
                            >
                                {emoji}
                            </button>
                            <p>{label}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div
                className="modal fade"
                id="moodModal"
                tabIndex="-1"
                aria-labelledby="moodModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="moodModalLabel">
                                You’re feeling {moods.find((m) => m.value === mood)?.emoji}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="moodNote" className="form-label">
                                Want to add more about how you're feeling?
                            </label>
                            <textarea
                                id="moodNote"
                                className="form-control"
                                rows="3"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Write your thoughts here..."
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
