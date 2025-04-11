import MoodTracker from '../components/MoodTracker';
import WaterIntakeTracker from '../components/WaterIntakeTracker';

export default function Dashboard() {
    return (
        <div>
            <h1>Welcome to Your Health Dashboard</h1>
            <MoodTracker />
            <WaterIntakeTracker />
        </div>
    );
}
