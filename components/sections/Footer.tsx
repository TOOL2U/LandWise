'use client';

import { MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sand/20 rounded-md flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-sand rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">LANDWISE</span>
            </div>
            <p className="text-sand/80 text-sm">
              Land intelligence for confident decisions on Ko Pha Ngan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-sand/80">
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Land Snapshot
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Visibility Report
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Land Ready Package
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
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
            <p>© {currentYear} LandWise. All rights reserved.</p>
            <p>Built for Ko Pha Ngan land owners and developers.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
