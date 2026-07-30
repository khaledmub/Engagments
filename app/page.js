"use client";

import RsvpForm from "@/components/RsvpForm";

export default function Home() {
  return (
    <>
      <section className="hero">
        {/* Illustrated harbor scene: sky, sea, citadel & sailboats */}
        <div className="scene">
          <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cfe1ec"/>
                <stop offset="55%" stopColor="#e6d7c0"/>
                <stop offset="100%" stopColor="#f3ddb9"/>
              </linearGradient>
              <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b8ca3"/>
                <stop offset="45%" stopColor="#2c5871"/>
                <stop offset="100%" stopColor="#0c2438"/>
              </linearGradient>
              <radialGradient id="sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff3da" stopOpacity="0.95"/>
                <stop offset="100%" stopColor="#fff3da" stopOpacity="0"/>
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1400" height="520" fill="url(#sky)"/>
            <circle cx="1030" cy="330" r="180" fill="url(#sun)"/>
            <rect x="0" y="480" width="1400" height="420" fill="url(#sea)"/>

            {/* water shimmer lines */}
            <g stroke="#f3ddb9" strokeOpacity="0.25" strokeWidth="2">
              <line x1="880" y1="520" x2="1180" y2="520"/>
              <line x1="900" y1="545" x2="1150" y2="545"/>
              <line x1="930" y1="572" x2="1120" y2="572"/>
              <line x1="860" y1="600" x2="1200" y2="600"/>
            </g>

            {/* citadel silhouette, right */}
            <g fill="#5b7183" fillOpacity="0.55">
              <rect x="1150" y="330" width="140" height="150" />
              <rect x="1170" y="270" width="34" height="70" />
              <rect x="1230" y="250" width="30" height="90" />
              <circle cx="1245" cy="240" r="12"/>
              <rect x="1140" y="470" width="160" height="16"/>
              <polygon points="1245,205 1252,240 1238,240" />
            </g>
            <line x1="1245" y1="205" x2="1245" y2="175" stroke="#5b7183" strokeOpacity="0.55" strokeWidth="2"/>
            <polygon points="1245,178 1245,190 1266,184" fill="#5b7183" fillOpacity="0.5"/>

            {/* boats, left */}
            <g fill="#26445a" fillOpacity="0.6">
              <path d="M60 560 L150 560 L135 580 L75 580 Z"/>
              <line x1="100" y1="560" x2="100" y2="500" stroke="#26445a" strokeOpacity="0.6" strokeWidth="3"/>
              <path d="M102 505 L102 555 L150 545 Z" fillOpacity="0.45"/>
              <path d="M98 505 L98 550 L60 542 Z" fillOpacity="0.45"/>
            </g>
            <g fill="#26445a" fillOpacity="0.45">
              <path d="M250 600 L330 600 L318 617 L262 617 Z"/>
              <line x1="290" y1="600" x2="290" y2="550" stroke="#26445a" strokeOpacity="0.45" strokeWidth="2.5"/>
              <path d="M291 553 L291 597 L330 588 Z"/>
            </g>

            {/* gentle cloud strokes */}
            <g fill="#ffffff" fillOpacity="0.35">
              <ellipse cx="260" cy="150" rx="90" ry="16"/>
              <ellipse cx="340" cy="140" rx="60" ry="12"/>
              <ellipse cx="700" cy="110" rx="100" ry="14"/>
            </g>
          </svg>
        </div>
        <div className="grain"></div>

        {/* floral corner illustration */}
        <svg className="floral-corner" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#3f5a3f" strokeWidth="3" strokeLinecap="round" opacity="0.85">
            <path d="M10 10 C 90 40, 140 90, 170 190 C 190 260, 230 300, 300 320"/>
            <path d="M40 30 C 60 70, 60 110, 40 150"/>
            <path d="M70 55 C 100 80, 110 115, 95 150"/>
            <path d="M130 110 C 160 130, 175 160, 165 195"/>
          </g>
          <g fill="#3f5a3f" opacity="0.8">
            <ellipse cx="45" cy="35" rx="14" ry="6" transform="rotate(-30 45 35)"/>
            <ellipse cx="75" cy="60" rx="13" ry="6" transform="rotate(10 75 60)"/>
            <ellipse cx="100" cy="120" rx="14" ry="6" transform="rotate(60 100 120)"/>
            <ellipse cx="150" cy="150" rx="13" ry="6" transform="rotate(-10 150 150)"/>
          </g>
          <g>
            <g transform="translate(30,20)">
              <circle cx="0" cy="-9" r="8" fill="#fff" opacity="0.95"/>
              <circle cx="8" cy="-3" r="8" fill="#fff" opacity="0.95"/>
              <circle cx="8" cy="6" r="8" fill="#fff" opacity="0.95"/>
              <circle cx="0" cy="11" r="8" fill="#fff" opacity="0.95"/>
              <circle cx="-8" cy="6" r="8" fill="#fff" opacity="0.95"/>
              <circle cx="-8" cy="-3" r="8" fill="#fff" opacity="0.95"/>
              <circle cx="0" cy="1" r="5" fill="#e8c98f"/>
            </g>
            <g transform="translate(95,150) scale(1.3)">
              <circle cx="0" cy="-9" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="7" cy="-3" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="7" cy="6" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="0" cy="10" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="-7" cy="6" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="-7" cy="-3" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="0" cy="1" r="4.5" fill="#e8c98f"/>
            </g>
            <g transform="translate(165,192) scale(0.9)">
              <circle cx="0" cy="-9" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="7" cy="-3" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="7" cy="6" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="0" cy="10" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="-7" cy="6" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="-7" cy="-3" r="7" fill="#fff" opacity="0.9"/>
              <circle cx="0" cy="1" r="4.5" fill="#e8c98f"/>
            </g>
          </g>
        </svg>

        <div className="hero-content">
          <div className="invite-text">
            <div className="eyebrow-line"><span className="rule"></span><span>Save the date</span></div>
            <h1>You&apos;re<br/>Invited</h1>
            <p>Join us in celebrating this special milestone. We look forward to sharing our joy with you.</p>
          </div>

          <div className="plaque-wrap">
            <div className="plaque">
              <svg className="flourish" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15 C 25 0, 40 25, 50 12 C 60 25, 75 0, 95 15" fill="none" stroke="#c6a15b" strokeWidth="1.5"/>
                <circle cx="50" cy="12" r="2.4" fill="#c6a15b"/>
              </svg>
              <p className="eyebrow">Engagement Ceremony</p>
              <h2 className="names">Amr<span className="amp">&amp;</span>Yasmine</h2>

              <svg className="sprig" viewBox="0 0 200 46" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 23 C 60 10, 30 25, 5 15 M100 23 C 140 10, 170 25, 195 15" fill="none" stroke="#3f5a3f" strokeWidth="1.6" opacity="0.7"/>
                <g fill="#fff" stroke="#e3e3e3" strokeWidth="0.4">
                  <circle cx="35" cy="18" r="6"/><circle cx="55" cy="10" r="6"/><circle cx="70" cy="22" r="6"/>
                  <circle cx="130" cy="22" r="6"/><circle cx="145" cy="10" r="6"/><circle cx="165" cy="18" r="6"/>
                </g>
                <g fill="#e8c98f"><circle cx="35" cy="18" r="2.4"/><circle cx="55" cy="10" r="2.4"/><circle cx="70" cy="22" r="2.4"/>
                <circle cx="130" cy="22" r="2.4"/><circle cx="145" cy="10" r="2.4"/><circle cx="165" cy="18" r="2.4"/></g>
              </svg>

              <div className="loc-block">
                <svg className="pin" viewBox="0 0 24 24" fill="none" stroke="#1c2c42" strokeWidth="1.6"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>
                <span className="hotel">Hotel El Anfoushi</span>
                <span className="hall"> Al Fayrouz Hall</span><br/>
                <span className="city">Bahary, Alexandria</span>
              </div>

              <div className="dt-row">
                <div className="item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1c2c42" strokeWidth="1.5"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
                  11 / 09 / 2026<br/>Friday
                </div>
                <div className="divider"></div>
                <div className="item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1c2c42" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  8:00 PM
                </div>
              </div>

              <p className="note">No one be late</p>
            </div>
          </div>

          <RsvpForm />

        </div>

        <div className="scroll-cue">Location<span>&darr;</span></div>
      </section>

      <section className="map-section" id="location">
        <div className="map-inner">
          <div className="map-copy">
            <div className="eyebrow-line"><span className="rule"></span><span>Getting there</span></div>
            <h3>Find Us</h3>
            <p>The ceremony takes place on the Bahary waterfront, moments from the Citadel of Qaitbay.</p>
            <div className="addr">
              <strong>Hotel El Anfoushi — Al Fayrouz Hall</strong>
              Bahary, Alexandria, Egypt
            </div>
            <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Hotel+El+Anfoushi+Bahary+Alexandria+Egypt" target="_blank" rel="noopener noreferrer">Open in Google Maps →</a>
          </div>
          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps?q=Hotel%20El%20Anfoushi%2C%20Bahary%2C%20Alexandria%2C%20Egypt&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map to Hotel El Anfoushi, Bahary, Alexandria">
            </iframe>
          </div>
        </div>
      </section>

      <footer>Amr &amp; Yasmine · 11.09.2026 · Alexandria</footer>
    </>
  );
}
