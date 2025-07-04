import MoodTracker from '../components/MoodTracker';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import BreathingGuide from '../components/BreathingGuide';
import FoodTracker from '../components/FoodTracker';
import StepTracker from '../components/StepTracker';
import AppointmentTracker from '../components/AppointmentTracker';

export default function Dashboard({ guest }) {
    return (
        <div className="m-5">
            <h1 className="text-center m-3">Welcome to Your Health Dashboard</h1>
            <div className="row m-3 justify-content-center">
                <div className="col-5 mb-4">
                    <MoodTracker guest={guest} />
                </div>
                <div className="col-5 mb-4">
                    <FoodTracker guest={guest} />
                </div>
                <div className="col-4 mb-4">
                    <AppointmentTracker guest={guest} />
                </div>
                <div className="col-4 mb-4">
                    <StepTracker guest={guest} />
                </div>
                <div className="col-3 mb-4">
                    <BreathingGuide />
                </div>
                <div className="col-3 mb-4">
                    <WaterIntakeTracker guest={guest} />
                </div>
            </div>
        </div>
    );
}
