import MoodTracker from '../components/MoodTracker';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import BreathingGuide from '../components/BreathingGuide';
import FoodTracker from '../components/FoodTracker';

export default function Dashboard({ guest }) {
    return (
        <div className="m-5">
            <h1 className="text-center m-3">Welcome to Your Health Dashboard</h1>
            <div className="row m-3">
                <div className="col-5">
                    <MoodTracker guest={guest} />
                </div>
                <div className="col-5">
                    <FoodTracker guest={guest} />
                </div>
                <div className="col-3">
                    <WaterIntakeTracker guest={guest} />
                </div>
                <div className="col-3">
                    <BreathingGuide />
                </div>
            </div>
        </div>
    );
}
