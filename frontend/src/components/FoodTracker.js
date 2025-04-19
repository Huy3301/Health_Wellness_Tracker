import { useState } from 'react';
import './FoodTracker.css';

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
                            <div className="progress"><div className="progress-bar bg-danger" style={{ width: `${(protein / proteinGoal) * 100}%` }} /></div>
                        </div>
                        <div className="mb-2">
                            <label>Fat: {fat}g</label>
                            <div className="progress"><div className="progress-bar bg-warning" style={{ width: `${(fat / fatGoal) * 100}%` }} /></div>
                        </div>
                        <div className="mb-2">
                            <label>Carbs: {carbs}g</label>
                            <div className="progress"><div className="progress-bar bg-primary" style={{ width: `${(carbs / carbsGoal) * 100}%` }} /></div>
                        </div>
                    </div>

                    {/* Add Food Button */}
                    <div>
                        <button className="btn btn-outline-success fs-1 px-4" onClick={() => setShowModal(true)}>+</button>
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
                                <label>Calories (kcal)</label>
                                <input id="add-calories" type="number" placeholder="0" className="form-control mb-2" />
                                <label>Protein (g)</label>
                                <input id="add-protein" type="number" placeholder="0" className="form-control mb-2" />
                                <label>Fat (g)</label>
                                <input id="add-fat" type="number" placeholder="0" className="form-control mb-2" />
                                <label>Carbs (g)</label>
                                <input id="add-carbs" type="number" placeholder="0" className="form-control mb-2" />
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        const safeParse = (id) => Math.max(parseInt(document.getElementById(id).value) || 0, 0);
                                        const cals = safeParse('add-calories');
                                        const p = safeParse('add-protein');
                                        const f = safeParse('add-fat');
                                        const ca = safeParse('add-carbs');
                                        handleAdd(cals, p, f, ca);
                                    }}
                                >
                                    Add
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
