"use client";

import BrandLogo from "./BrandLogo";

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BrandLogo size={32} />
              <span className="text-lg font-bold tracking-tight">
                Base<span className="text-brand-blue font-extrabold">VR</span>
              </span>
            </div>
            <p className="text-white text-sm leading-relaxed max-w-xs">
              חוויית המכירה החדשה בעולם הנדל״ן. טכנולוגיית VR מתקדמת שמחברת רגשית את הרוכש לנכס.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">ניווט מהיר</h4>
            <ul className="space-y-2 text-sm text-white">
              <li><a href="#problem" className="hover:text-brand-blue transition-colors">הבעיה</a></li>
              <li><a href="#solution" className="hover:text-brand-blue transition-colors">הפתרון</a></li>
              <li><a href="#stats" className="hover:text-brand-blue transition-colors">מספרים</a></li>
              <li><a href="#demo" className="hover:text-brand-blue transition-colors">דמו חי</a></li>
              <li><a href="#features" className="hover:text-brand-blue transition-colors">למה אנחנו</a></li>
              <li><a href="#contact" className="hover:text-brand-blue transition-colors">יצירת קשר</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white">צרו קשר</h4>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                תל אביב, ישראל
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@basevr.co.il
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span dir="ltr">+972-XX-XXX-XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} BaseVR. כל הזכויות שמורות.
          </p>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span>IMMERSIVE</span>
            <span className="text-brand-blue">·</span>
            <span>REAL</span>
            <span className="text-brand-blue">·</span>
            <span>EFFECTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
