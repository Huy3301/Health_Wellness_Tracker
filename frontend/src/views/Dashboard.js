import MoodTracker from '../components/MoodTracker';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import BreathingGuide from '../components/BreathingGuide';

export default function Dashboard() {
    return (
        <div>
            <h1>Welcome to Your Health Dashboard</h1>
            <div className="row">
                <div className="col-5">
                    <MoodTracker />
                </div>
                <div className="col-3">
                    <WaterIntakeTracker />
                </div>
                <div className="col-3">
                    <BreathingGuide />
                </div>
            </div>
        </div>
    );
}
