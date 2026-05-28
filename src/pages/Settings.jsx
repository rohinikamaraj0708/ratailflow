import React, { useState, useEffect } from 'react';
import { UploadCloud, Save, Sun, Moon } from 'lucide-react';
import './Settings.css';

export default function Settings() {
  // 📝 Main State Configurations matching your screenshots exactly
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    phoneNumber: '',
    email: '',
    shopAddress: '',
    gstNumber: '',
    defaultGst: '5%',
    invoicePrefix: 'INV',
    invoiceTemplate: 'Classic', // Classic or Modern
    enableVoiceBilling: true,
    autoSaveInvoices: true,
    appearance: 'Light' // Light or Dark
  });

  // Load existing configuration from localStorage on init
  useEffect(() => {
    const savedConfig = localStorage.getItem('retailflow_settings');
    if (savedConfig) {
      setFormData(JSON.parse(savedConfig));
    }
  }, []);

  // Form input changes handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Direct state toggle for Custom template cards and Appearance toggles
  const setDirectValue = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  /* 💾 CRITICAL FUNCTIONALITY: Save Event Trigger */
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.shopName || !formData.ownerName || !formData.phoneNumber) {
      alert('❌ Please fill out all required fields (*)');
      return;
    }
    
    // Save stringified state to browser native local storage framework
    localStorage.setItem('retailflow_settings', JSON.stringify(formData));
    alert('✅ Settings Saved Successfully!');
  };

  return (
    <div className="settings-page-wrapper">
      {/* Top Banner Branding Text */}
      <header className="settings-header-section">
        <h1>Settings</h1>
        <p>Manage your shop settings and preferences</p>
      </header>

      <form onSubmit={handleSave} className="settings-form-flow">
        
        {/* BLOCK 1: Shop Information (Screenshot 1) */}
        <div className="settings-card-panel">
          <h2>Shop Information</h2>
          <div className="fields-grid-2x2">
            <div className="input-field-group">
              <label>Shop Name *</label>
              <input 
                type="text" name="shopName" placeholder="Enter your Shop name"
                value={formData.shopName} onChange={handleChange} required
              />
            </div>
            <div className="input-field-group">
              <label>Owner Name *</label>
              <input 
                type="text" name="ownerName" placeholder="Enter your owner name"
                value={formData.ownerName} onChange={handleChange} required
              />
            </div>
            <div className="input-field-group">
              <label>Phone Number *</label>
              <input 
                type="text" name="phoneNumber" placeholder="+91 6756489302"
                value={formData.phoneNumber} onChange={handleChange} required
              />
            </div>
            <div className="input-field-group">
              <label>Email</label>
              <input 
                type="email" name="email" placeholder="shop@example.com"
                value={formData.email} onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-field-group full-width-field">
            <label>Shop Address</label>
            <textarea 
              name="shopAddress" rows="4" placeholder="Enter your Shop address"
              value={formData.shopAddress} onChange={handleChange}
            ></textarea>
          </div>

          <div className="fields-grid-2x2 inline-logo-block">
            <div className="input-field-group">
              <label>GST Number (Optional)</label>
              <input 
                type="text" name="gstNumber" placeholder="22AAAAA0000A1Z5"
                value={formData.gstNumber} onChange={handleChange}
              />
            </div>
            <div className="input-field-group">
              <label>Upload Logo (Optional)</label>
              <div className="logo-upload-dash-box">
                <UploadCloud size={28} className="upload-icon-svg" />
                <p>Click to upload or drag and drop</p>
                <span>PNG, JPG up to 2MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* BLOCK 2: Tax Settings & Invoice Templates (Screenshot 2) */}
        <div className="settings-card-panel">
          <h2>Tax Settings</h2>
          <div className="fields-grid-2x2">
            <div className="input-field-group">
              <label>Default GST %</label>
              <input 
                type="text" name="defaultGst" placeholder="5%"
                value={formData.defaultGst} onChange={handleChange}
              />
            </div>
            <div className="input-field-group">
              <label>Invoice Prefix</label>
              <input 
                type="text" name="invoicePrefix" placeholder="INV"
                value={formData.invoicePrefix} onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="settings-card-panel">
          <h2>Invoice Template</h2>
          <div className="template-cards-stack">
            {/* Classic Design Component Option */}
            <div 
              className={`template-select-row ${formData.invoiceTemplate === 'Classic' ? 'active-border' : ''}`}
              onClick={() => setDirectValue('invoiceTemplate', 'Classic')}
            >
              <div className="template-meta-info">
                <h3>Classic Template</h3>
                <p>Simple and professional invoice layout</p>
              </div>
              <button 
                type="button" 
                className={`template-status-pill ${formData.invoiceTemplate === 'Classic' ? 'pill-active' : 'pill-available'}`}
              >
                {formData.invoiceTemplate === 'Classic' ? 'Active' : 'Available'}
              </button>
            </div>

            {/* Modern Design Component Option */}
            <div 
              className={`template-select-row ${formData.invoiceTemplate === 'Modern' ? 'active-border' : ''}`}
              onClick={() => setDirectValue('invoiceTemplate', 'Modern')}
            >
              <div className="template-meta-info">
                <h3>Modern Template</h3>
                <p>Contemporary design with vibrant colors</p>
              </div>
              <button 
                type="button" 
                className={`template-status-pill ${formData.invoiceTemplate === 'Modern' ? 'pill-active' : 'pill-available'}`}
              >
                {formData.invoiceTemplate === 'Modern' ? 'Active' : 'Available'}
              </button>
            </div>
          </div>
        </div>

        {/* BLOCK 3: Voice Controls & Appearance Preferences (Screenshot 3) */}
        <div className="settings-card-panel">
          <h2>Voice Command Settings</h2>
          <div className="toggle-preference-row">
            <div className="preference-meta">
              <h3>Enable Voice Billing</h3>
              <p>Use microphone for quick product entry</p>
            </div>
            <label className="switch-input-toggle">
              <input 
                type="checkbox" name="enableVoiceBilling"
                checked={formData.enableVoiceBilling} onChange={handleChange}
              />
              <span className="slider-round-rail"></span>
            </label>
          </div>

          <div className="toggle-preference-row">
            <div className="preference-meta">
              <h3>Auto-save Invoices</h3>
              <p>Automatically save invoices as drafts</p>
            </div>
            <label className="switch-input-toggle">
              <input 
                type="checkbox" name="autoSaveInvoices"
                checked={formData.autoSaveInvoices} onChange={handleChange}
              />
              <span className="slider-round-rail"></span>
            </label>
          </div>
        </div>

        {/* Appearance Interface Panel */}
        <div className="settings-card-panel">
          <h2>Appearance</h2>
          <div className="appearance-grid-selection">
            <div 
              className={`theme-card-option ${formData.appearance === 'Light' ? 'theme-active-card' : ''}`}
              onClick={() => setDirectValue('appearance', 'Light')}
            >
              <div className="theme-left-combo">
                <Sun size={20} className="sun-icon-svg" />
                <div className="theme-text-info">
                  <h3>Light Mode</h3>
                  <p>Clean and bright interface</p>
                </div>
              </div>
              <div className={`radio-dot-indicator ${formData.appearance === 'Light' ? 'radio-checked' : ''}`}></div>
            </div>

            <div 
              className={`theme-card-option ${formData.appearance === 'Dark' ? 'theme-active-card' : ''}`}
              onClick={() => setDirectValue('appearance', 'Dark')}
            >
              <div className="theme-left-combo">
                <Moon size={20} className="moon-icon-svg" />
                <div className="theme-text-info">
                  <h3>Dark Mode</h3>
                  <p>Easy on the eyes</p>
                </div>
              </div>
              <div className={`radio-dot-indicator ${formData.appearance === 'Dark' ? 'radio-checked' : ''}`}></div>
            </div>
          </div>
        </div>

        {/* Bottom Absolute Position Submission Button Row */}
        <div className="submission-action-bar">
          <button type="submit" className="save-settings-cta-btn">
            <Save size={20} />
            <span>Save Settings</span>
          </button>
        </div>

      </form>
    </div>
  );
}