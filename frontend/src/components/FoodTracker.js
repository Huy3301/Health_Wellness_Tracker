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

    const handleAdd = (c, p, f, ca) => {
        setCalories(prev => prev + c);
        setProtein(prev => prev + p);
        setFat(prev => prev + f);
        setCarbs(prev => prev + ca);
        setMacros(prev => prev + c + p + f);
        setShowModal(false);
    };

    // Macro ratios based on total macro input
    const totalMacros = protein + fat + carbs;
    const fillRatio = Math.min(calories / calorieGoal, 1);

    const proteinPercent = totalMacros > 0 ? fillRatio * (protein / totalMacros) * 100 : 0;
    const fatPercent = totalMacros > 0 ? fillRatio * (fat / totalMacros) * 100 : 0;
    const carbPercent = totalMacros > 0 ? fillRatio * (carbs / totalMacros) * 100 : 0;

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
                            {totalMacros > 0 && (
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
                                        strokeDashoffset={`-${carbPercent}`}
                                    />
                                    {/* Protein on top */}
                                    <circle
                                        className="circle-protein"
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        strokeDasharray={`${proteinPercent} ${100 - proteinPercent}`}
                                        strokeDashoffset={`-${carbPercent + fatPercent}`}
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
                                <input id="add-calories" type="number" className="form-control mb-2" />
                                <label>Protein (g)</label>
                                <input id="add-protein" type="number" className="form-control mb-2" />
                                <label>Fat (g)</label>
                                <input id="add-fat" type="number" className="form-control mb-2" />
                                <label>Carbs (g)</label>
                                <input id="add-carbs" type="number" className="form-control mb-2" />
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        const cals = parseInt(document.getElementById('add-calories').value) || 0;
                                        const p = parseInt(document.getElementById('add-protein').value) || 0;
                                        const f = parseInt(document.getElementById('add-fat').value) || 0;
                                        const ca = parseInt(document.getElementById('add-carbs').value) || 0;
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
