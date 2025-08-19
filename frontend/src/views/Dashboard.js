import MoodTracker from '../components/MoodTracker';
import WaterIntakeTracker from '../components/WaterIntakeTracker';
import BreathingGuide from '../components/BreathingGuide';
import FoodTracker from '../components/FoodTracker';
import StepTracker from '../components/StepTracker';
import AppointmentTracker from '../components/AppointmentTracker';
import Logo from '../assets/LogoCow.png';

export default function Dashboard({ guest }) {
    return (
        <div className="m-5">
            <div className="row justify-content-center">
                <img
                    src={Logo}
                    alt="Health Wellness Tracker Logo"
                    className="img-fluid w-50 h-50"
                />
            </div>
            <div className="row m-3">
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
