import { Link } from 'react-router-dom';

const Home = ({ }) => {
    return (
        <div className="row justify-content-center p-4">
            <div className="col-8">
                <h1 className="text-center p-4"><b>Health Wellness Tracker</b></h1>
                <p className="text-center">Health Wellness Tracker is a web application that helps users monitor day to day health habits. The app collects data that the user enters manually (or from wearables/APIs) and presents simple dashboards and tracking widgets. Authentication is handled with Amazon Cognito, allowing both full accounts and guest access.

                    The project currently focuses on a React based front‑end, with a serverless API used for retrieving meal information. Documentation in the "docs" directory includes diagrams of the overall architecture and database model.</p>
                <p>Features

                    - User Authentication – Registration, login and email confirmation via Amazon Cognito.
                    - Dashboard containing several trackers:
                    - Mood Tracker – record how you feel and optional notes.
                    - Food Tracker – log meals, calories and macronutrients. Data can be fetched from a serverless API or entered manually.
                    - Water Intake Tracker – visual tracker for daily glasses of water.
                    - Breathing Guide – animated breathing exercise widget.
                    - Guest Mode – users may explore the dashboard without signing in.
                    - Responsive UI built with Bootstrap and React Router.
                </p>
            </div>
            <div className="row col-8 justify-content-center">
                {localStorage.getItem('isLoggedIn') === 'true' ? (
                    <p></p>
                ) : (
                    <Link className="btn btn-primary col-2 p-2" to="/login" >
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Home