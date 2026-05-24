"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function LeadForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    projectName: "",
    units: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      // Generic webhook endpoint — replace with your actual webhook URL
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({
          fullName: "",
          company: "",
          phone: "",
          email: "",
          projectName: "",
          units: "",
          message: "",
        });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(44,106,251,0.12)_0%,transparent_60%)]" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4">
            בואו נדבר
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            מוכנים <span className="text-gradient-blue">למכור אחרת?</span>
          </h2>
          <p className="text-white text-lg max-w-xl mx-auto">
            השאירו פרטים לתיאום פגישה אישית בה נציג בפניכם הדגמה של חווית ה-VR שלנו. השירות הוא ללא עלות וללא התחייבות.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-12 glow-blue"
        >
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">הפניה נשלחה בהצלחה!</h3>
              <p className="text-white">נחזור אליכם בהקדם עם הדגמה מותאמת.</p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">שם מלא *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                    placeholder="ישראל ישראלי"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">חברה / יזם *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                    placeholder="שם החברה"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">טלפון *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all text-left"
                    placeholder="050-0000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">אימייל *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all text-left"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">שם הפרויקט</label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                    placeholder="שם הפרויקט / הבניין"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">מספר יחידות</label>
                  <select
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                  >
                    <option value="" className="bg-brand-dark">בחרו טווח</option>
                    <option value="1-20" className="bg-brand-dark">1-20 יחידות</option>
                    <option value="21-50" className="bg-brand-dark">21-50 יחידות</option>
                    <option value="51-100" className="bg-brand-dark">51-100 יחידות</option>
                    <option value="100+" className="bg-brand-dark">100+ יחידות</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-white mb-2">הערות נוספות</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all resize-none"
                  placeholder="ספרו לנו קצת על הפרויקט ומה הציפיות שלכם..."
                />
              </div>

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full py-4 bg-brand-blue hover:bg-brand-blue-light text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? (
                  <span className="flex items-center justify-center gap-2 font-bold text-lg">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    שולח...
                  </span>
                ) : (
                  <span className="flex flex-col items-center leading-tight">
                    <span className="font-bold text-lg">שלחו פרטים →</span>
                    <span className="text-sm text-white/80 font-normal mt-1">נציג יחזור אליכם בהקדם לתיאום פגישה</span>
                  </span>
                )}
              </button>

              {formState === "error" && (
                <p className="mt-4 text-center text-red-400 text-sm">
                  אירעה שגיאה. נסו שוב או צרו קשר ישירות.
                </p>
              )}

              <p className="mt-4 text-center text-white/30 text-xs">
                * המידע שלכם מאובטח ולא יועבר לשום גורם שלישי
              </p>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
