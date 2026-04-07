import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Mail, MapPin, Phone, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        event: 'Networking Gala 2026',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            setStatus({ type: 'success', message: response.data.message });
            setFormData({ name: '', email: '', phone: '', event: 'Networking Gala 2026', message: '' });
        } catch (error) {
            setStatus({ 
                type: 'error', 
                message: error.response?.data?.message || 'Something went wrong. Is the server running?' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="nav-logo">Eventify<span>.</span></div>
                <div className="nav-links">
                    <a href="#">Events</a>
                    <a href="#">About</a>
                    <a href="#" className="nav-cta">Register</a>
                </div>
            </nav>

            <main className="hero">
                <div className="hero-content">
                    <div className="badge">Limited Seats Available</div>
                    <h1>Register for the Next <span>Big Event</span></h1>
                    <p>Join world-class leaders, innovators, and creators for an unforgettable experience. Secure your spot today.</p>
                </div>

                <section className="form-section">
                    <div className="form-card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-header">
                                <h2>Event Registration</h2>
                                <p>Fill in the details below to join <strong>{formData.event}</strong></p>
                            </div>

                            <div className="input-group">
                                <label><User size={16} /> Full Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="John Doe" 
                                    required 
                                />
                            </div>

                            <div className="input-row">
                                <div className="input-group">
                                    <label><Mail size={16} /> Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="john@example.com" 
                                        required 
                                    />
                                </div>
                                <div className="input-group">
                                    <label><Phone size={16} /> Phone Number</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        placeholder="+1 234 567 890" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label><Calendar size={16} /> Select Event</label>
                                <select name="event" value={formData.event} onChange={handleChange}>
                                    <option>Networking Gala 2026</option>
                                    <option>Tech Innovation Summit</option>
                                    <option>Creative Design Workshop</option>
                                    <option>AI Future Expo</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label><MapPin size={16} /> Message / Notes</label>
                                <textarea 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="Any special requirements?"
                                />
                            </div>

                            {status.message && (
                                <div className={`status-msg ${status.type}`}>
                                    {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                    {status.message}
                                </div>
                            )}

                            <button type="submit" disabled={loading}>
                                {loading ? 'Processing...' : (
                                    <>
                                        Register Now <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>&copy; 2026 Eventify. All rights reserved. Designed for Excellence.</p>
            </footer>
        </div>
    );
};

export default App;
