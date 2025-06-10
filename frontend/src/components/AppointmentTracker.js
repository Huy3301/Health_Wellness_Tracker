import { useState, useEffect } from 'react';

export default function AppointmentTracker({ guest }) {
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => {
        const d = new Date();
        d.setDate(1);
        return d;
    });
    const [newAppt, setNewAppt] = useState({ datetime: '', desc: '' });

    // Load saved appointments
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
        setAppointments(saved);
    }, []);

    // Persist appointments
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    const addAppointment = () => {
        if (!newAppt.datetime) return;
        setAppointments(prev => [...prev, newAppt]);
        setNewAppt({ datetime: '', desc: '' });
    };

    const upcoming = appointments
        .map(a => ({ ...a, dateObj: new Date(a.datetime) }))
        .filter(a => a.dateObj >= new Date())
        .sort((a, b) => a.dateObj - b.dateObj)[0];

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const monthLabel = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const changeMonth = (offset) => {
        const d = new Date(currentMonth);
        d.setMonth(d.getMonth() + offset);
        setCurrentMonth(d);
    };

    const getAppointmentsForDay = (day) => {
        const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
        return appointments.filter(a => a.datetime.startsWith(dateStr));
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm text-center">
                <h3>Appointments</h3>
                {upcoming ? (
                    <p>Next: {new Date(upcoming.datetime).toLocaleString()} - {upcoming.desc}</p>
                ) : (
                    <p>No upcoming appointments</p>
                )}
                <button className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
                    View Calendar
                </button>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Appointments</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <button className="btn btn-sm btn-secondary" onClick={() => changeMonth(-1)}>&lt;</button>
                                    <h5 className="mb-0">{monthLabel}</h5>
                                    <button className="btn btn-sm btn-secondary" onClick={() => changeMonth(1)}>&gt;</button>
                                </div>
                                <table className="table table-bordered text-center">
                                    <thead>
                                        <tr>
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <th key={d}>{d}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: Math.ceil((firstDay + daysInMonth) / 7) }).map((_, weekIdx) => (
                                            <tr key={weekIdx}>
                                                {Array.from({ length: 7 }).map((_, dayIdx) => {
                                                    const dayNum = weekIdx * 7 + dayIdx - firstDay + 1;
                                                    if (dayNum < 1 || dayNum > daysInMonth) return <td key={dayIdx}></td>;
                                                    const dayAppts = getAppointmentsForDay(dayNum);
                                                    return (
                                                        <td key={dayIdx} className="position-relative" style={{ height: '80px' }}>
                                                            <div>{dayNum}</div>
                                                            {dayAppts.map((a, i) => (
                                                                <div key={i} className="small text-primary text-truncate">
                                                                    {new Date(a.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </div>
                                                            ))}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-3">
                                    <label className="form-label">Date &amp; Time</label>
                                    <input type="datetime-local" className="form-control mb-2" value={newAppt.datetime} onChange={e => setNewAppt({ ...newAppt, datetime: e.target.value })} />
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" value={newAppt.desc} onChange={e => setNewAppt({ ...newAppt, desc: e.target.value })} />
                                    <button className="btn btn-primary mt-3" onClick={addAppointment}>Add Appointment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}