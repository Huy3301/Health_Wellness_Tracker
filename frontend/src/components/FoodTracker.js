import React, { useEffect, useState } from 'react';
import './FoodTracker.css';
import { fetchMeals } from './api';
import { getSession } from '../utils/auth';

export default function FoodTracker() {
    const [calories, setCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [macros, setMacros] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const calorieGoal = 2000;
    const proteinGoal = 100;
    const fatGoal = 70;
    const carbsGoal = 250;

    const handleAdd = (cals, p, f, ca) => {
        setCalories(prev => prev + cals);
        setProtein(prev => prev + p);
        setFat(prev => prev + f);
        setCarbs(prev => prev + ca);
        setMacros(prev => prev + ca + p + f);
        setShowModal(false);
    };

    // Macro ratios based on total macro input
    const proteinPercent = macros > 0 ? (protein / macros) * 100 : 0;
    const fatPercent = macros > 0 ? (fat / macros) * 100 : 0;
    const carbPercent = macros > 0 ? (carbs / macros) * 100 : 0;

    const fatOffset = carbPercent;
    const proteinOffset = carbPercent + fatPercent;

    // Fetch all meals and search
    const [meals, setMeals] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [manualEntry, setManualEntry] = useState(false);

    useEffect(() => {
        const loadMeals = async () => {
            try {
                let token = null;

                // Check if logged in
                try {
                    const session = await getSession();
                    token = session.getIdToken().getJwtToken();
                } catch (err) {
                    console.log("No session found, assuming guest mode.");
                }

                // Fetch meals (with or without token)
                const mealsData = await fetchMeals(token);
                setMeals(mealsData);
            } catch (err) {
                console.error("Failed to load meals:", err);
            }
        };

        loadMeals();
    }, []);

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h3 className="text-center">Food Tracker</h3>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">

                    {/* Calorie Circle */}
                    <div className="donut-chart-wrapper">
                        <svg viewBox="0 0 36 36" className="donut-chart">
                            <circle className="circle-bg" cx="18" cy="18" r="16" />
                            {/* Macro Ring Stack */}
                            {macros > 0 && (
                                <>
                                    {/* Carbs at bottom */}
                                    <circle
                                        className="circle-carb"
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        strokeDasharray={`${carbPercent} ${100 - carbPercent}`}
                                        strokeDashoffset="0"
                                    />
                                    {/* Fat in middle */}
                                    <circle
                                        className="circle-fat"
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        strokeDasharray={`${fatPercent} ${100 - fatPercent}`}
                                        strokeDashoffset={-fatOffset}
                                    />
                                    {/* Protein on top */}
                                    <circle
                                        className="circle-protein"
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        strokeDasharray={`${proteinPercent} ${100 - proteinPercent}`}
                                        strokeDashoffset={-proteinOffset}
                                    />
                                </>
                            )}
                            <text x="18" y="-16" className="calorie-text" textAnchor="middle">
                                {calories} kcal
                            </text>
                        </svg>
                    </div>

                    {/* Macro Bars */}
                    <div className="flex-grow-1">
                        <div className="mb-2">
                            <label>Protein: {protein}g</label>
                            <div className="progress"><div className="progress-bar" style={{ backgroundColor: `#5158BB`, width: `${(protein / proteinGoal) * 100}%` }} /></div>
                        </div>
                        <div className="mb-2">
                            <label>Fat: {fat}g</label>
                            <div className="progress"><div className="progress-bar" style={{ backgroundColor: `#594899`, width: `${(fat / fatGoal) * 100}%` }} /></div>
                        </div>
                        <div className="mb-2">
                            <label>Carbs: {carbs}g</label>
                            <div className="progress"><div className="progress-bar" style={{ backgroundColor: `#AEB8FE`, width: `${(carbs / carbsGoal) * 100}%` }} /></div>
                        </div>
                    </div>

                    {/* Add Food Button */}
                    <div>
                        <button className="btn btn-outline-success fs-1 px-4" onClick={() => {
                            fetchMeals();
                            setShowModal(true);
                        }}>+</button>
                    </div>
                </div>
            </div>

            {/* Modal for Manual Food Entry */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Food</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {!manualEntry && (
                                    <>
                                        <input
                                    type="text"
                                    placeholder="Search food..."
                                    className="form-control mb-3"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />

                                {/* Meal list */}
                                        <div className="list-group mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {meals
                                                .filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map((meal) => (
                                                    <button
                                                        key={meal.id}
                                                        className="list-group-item list-group-item-action"
                                                        onClick={() => {
                                                            setSelectedMeal(meal);
                                                            // Autofill input fields
                                                            document.getElementById('add-calories').value = meal.calories;
                                                            document.getElementById('add-protein').value = meal.protein;
                                                            document.getElementById('add-fat').value = meal.fat;
                                                            document.getElementById('add-carbs').value = meal.carbs;
                                                        }}
                                                    >
                                                        {meal.name}
                                                    </button>
                                                ))}
                                        </div>

                                        <div className="text-center">
                                            <button className="btn btn-outline-secondary" onClick={() => setManualEntry(true)}>
                                                Add Food Manually
                                            </button>
                                        </div>
                                    </>
                                )}
                                {/* Input fields - show when meal is selected OR manual add */}
                                {(selectedMeal || manualEntry) && (
                                    <div className="mt-3">
                                        <label>Calories (kcal)</label>
                                        <input id="add-calories" type="number" placeholder="0" className="form-control mb-2" defaultValue={selectedMeal?.calories || ''} />

                                        <label>Protein (g)</label>
                                        <input id="add-protein" type="number" placeholder="0" className="form-control mb-2" defaultValue={selectedMeal?.protein || ''} />

                                        <label>Fat (g)</label>
                                        <input id="add-fat" type="number" placeholder="0" className="form-control mb-2" defaultValue={selectedMeal?.fat || ''} />

                                        <label>Carbs (g)</label>
                                        <input id="add-carbs" type="number" placeholder="0" className="form-control mb-2" defaultValue={selectedMeal?.carbs || ''} />
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    disabled={!selectedMeal && !manualEntry}
                                    onClick={() => {
                                        const safeParse = (id) => Math.max(parseInt(document.getElementById(id).value) || 0, 0);
                                        const cals = safeParse('add-calories');
                                        const p = safeParse('add-protein');
                                        const f = safeParse('add-fat');
                                        const ca = safeParse('add-carbs');
                                        handleAdd(cals, p, f, ca);

                                        // Reset everything
                                        setSelectedMeal(null);
                                        setSearchTerm('');
                                        setManualEntry(false);
                                    }}
                                >
                                    Log Food
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
