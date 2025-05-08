import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // adjust path as needed

interface EnterpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnterprisePricingModal: React.FC<EnterpriseModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    website: "",
    contactName: "",
    email: "",
    users: "",
    loginType: "",
    addons: [] as string[],
    addonUserCount: "",
    storage: "",
    automation: "",
    sla: "",
    onboarding: "",
    billing: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (addon: string) => {
    setForm(prev => {
      const addons = prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon];
      return { ...prev, addons };
    });
  };

  const handleSubmit = () => {
    console.log("Enterprise Inquiry Submitted:", form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-deepIndigo text-brightWhite rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 border border-purple-800">
        <h2 className="text-3xl font-bold text-neonPink mb-6 text-center">Enterprise Inquiry Form</h2>

        {/* Grouped Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            name="companyName"
            placeholder="Company Name"
            className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
            value={form.companyName}
            onChange={handleChange}
          />
          <input
            name="contactName"
            placeholder="Primary Contact Name"
            className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
            value={form.contactName}
            onChange={handleChange}
          />
          <input
            name="website"
            placeholder="Company Website"
            className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
            value={form.website}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Contact Email"
            className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
            value={form.email}
            onChange={handleChange}
          />
          <select
            name="industry"
            className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
            value={form.industry}
            onChange={handleChange}
          >
            <option value="">Select Industry</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="eCommerce">eCommerce</option>
            <option value="Legal">Legal</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="users"
            className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
            value={form.users}
            onChange={handleChange}
          >
            <option value="">User Range</option>
            <option value="1–10">1–10</option>
            <option value="11–50">11–50</option>
            <option value="51–100">51–100</option>
            <option value="100+">100+</option>
          </select>
        </div>

        {/* Add-ons */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Interested Add-ons</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Translation Services", "Extended File History", "HIPAA Compliance", "Enhanced Security & Logs"].map(addon => (
              <label key={addon} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.addons.includes(addon)}
                  onChange={() => handleCheckbox(addon)}
                />
                {addon}
              </label>
            ))}
          </div>
          {form.addons.length > 0 && (
            <input
              name="addonUserCount"
              placeholder="Number of users needing these add-ons"
              className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
              value={form.addonUserCount}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select name="loginType" className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black" value={form.loginType} onChange={handleChange}>
            <option value="">Login Access Type</option>
            <option value="Individual">Individual</option>
            <option value="Shared">Shared</option>
            <option value="Both">Both</option>
          </select>

          <select name="storage" className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black" value={form.storage} onChange={handleChange}>
            <option value="">Estimated Storage</option>
            <option value="<10GB">Under 10GB</option>
            <option value="10–100GB">10–100GB</option>
            <option value="100GB–1TB">100GB–1TB</option>
            <option value="1TB+">1TB+</option>
          </select>

          <select name="automation" className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black" value={form.automation} onChange={handleChange}>
            <option value="">Need Automation?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Not Sure">Not Sure</option>
          </select>

          <select name="sla" className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black" value={form.sla} onChange={handleChange}>
            <option value="">SLA Required?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Maybe">Maybe</option>
          </select>

          <select name="onboarding" className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black" value={form.onboarding} onChange={handleChange}>
            <option value="">Onboarding?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select name="billing" className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black" value={form.billing} onChange={handleChange}>
            <option value="">Billing Preference</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annually">Annually</option>
          </select>
        </div>

        {/* Notes */}
        <textarea
          name="notes"
          className="bg-background border border-purple-600 rounded px-4 py-2 w-full text-black"
          placeholder="Additional requirements, integrations, or questions"
          value={form.notes}
          onChange={handleChange}
        />

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="default" onClick={handleSubmit}>Submit Inquiry</Button>
        </div>
      </div>
    </div>
  );
};

export default EnterprisePricingModal;
