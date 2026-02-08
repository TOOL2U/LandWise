'use client';

import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-forest text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-3xl sm:text-4xl font-bold tracking-tight font-montserrat">LandWise</span>
            </div>
            <p className="text-sand/80 text-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2 text-sm text-sand/80">
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  {t.packages.snapshot.name}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  {t.packages.visibility.name}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  {t.packages.ready.name}
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.location}</h4>
            <div className="flex items-start gap-2 text-sm text-sand/80">
              <MapPin size={18} className="flex-shrink-0 mt-1" />
              <div>
                <p>Ko Pha Ngan</p>
                <p>Surat Thani, Thailand</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sand/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sand/60">
            <p>© {currentYear} LandWise. {t.footer.rights}</p>
            <p>{t.footer.description}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
