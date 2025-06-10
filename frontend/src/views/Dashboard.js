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
            <div className="row m-3">
                    <WaterIntakeTracker guest={guest} />
                <div className="col-md-6 col-lg-4 mb-4">
                    <MoodTracker guest={guest} />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <FoodTracker guest={guest} />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <WaterIntakeTracker guest={guest} />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <StepTracker guest={guest} />
                </div>
                <div className="col-md-6 col-lg-4 mb-4">
                    <BreathingGuide />
                </div>
                <div className="col-6">
                    <AppointmentTracker guest={guest} />
                </div>
            </div>
        </div>
    );
}
