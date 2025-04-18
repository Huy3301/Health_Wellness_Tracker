import MoodTracker from '../components/MoodTracker';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import BreathingGuide from '../components/BreathingGuide';
import FoodTracker from '../components/FoodTracker';

export default function Dashboard() {
    return (
        <div className="m-5">
            <h1 className="text-center m-3">Welcome to Your Health Dashboard</h1>
            <div className="row m-3">
                <div className="col-5">
                    <MoodTracker />
                </div>
                <div className="col-5">
                    <FoodTracker />
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
