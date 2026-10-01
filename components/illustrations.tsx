import { useId } from "react";
import type { ArtworkKind } from "@/lib/beamhub";
import { BeamMark } from "./brand";

export function LinacIllustration({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 640 480" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-gantry`} x1="275" y1="100" x2="500" y2="355" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#e6ebe1" />
          <stop offset="1" stopColor="#b5c5b4" />
        </linearGradient>
        <linearGradient id={`${id}-head`} x1="252" y1="119" x2="383" y2="224" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#d0d9cb" />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="270" y1="210" x2="250" y2="333" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e77845" stopOpacity="0.46" />
          <stop offset="1" stopColor="#e77845" stopOpacity="0.04" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <ellipse cx="330" cy="405" rx="219" ry="25" fill="#657f65" opacity="0.15" filter={`url(#${id}-shadow)`} />
      <g stroke="#718770" strokeOpacity="0.13">
        <path d="M54 374L333 459L594 349M111 350L389 434M168 326L447 410M227 302L503 386" />
        <path d="M111 390L368 280M174 409L431 299M237 428L494 318M300 447L557 337" />
      </g>
      <path d="M374 306L476 302L481 361L381 385L330 363V342L374 330V306Z" fill="#bfcebd" />
      <path d="M330 342L381 364L481 340V361L381 386L330 364V342Z" fill="#a8bea7" />
      <path d="M395 205L464 185V326L395 346V205Z" fill="#c9d4c3" />
      <path d="M464 185L487 199V338L464 326V185Z" fill="#91ab93" />
      <ellipse cx="409" cy="205" rx="104" ry="132" transform="rotate(-17 409 205)" fill="#8ca78f" />
      <ellipse cx="394" cy="202" rx="104" ry="132" transform="rotate(-17 394 202)" fill={`url(#${id}-gantry)`} />
      <ellipse cx="392" cy="201" rx="72" ry="99" transform="rotate(-17 392 201)" fill="#7e9981" />
      <ellipse cx="397" cy="201" rx="66" ry="93" transform="rotate(-17 397 201)" fill="#b9ccb9" />
      <ellipse cx="393" cy="201" rx="85" ry="113" transform="rotate(-17 393 201)" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" />
      <path d="M283 115L353 93L418 139L348 163L283 115Z" fill="#fcfdf9" />
      <path d="M348 163L418 139V185L348 209V163Z" fill="#c8d5c5" />
      <path d="M283 115L348 163V209L283 161V115Z" fill={`url(#${id}-head)`} />
      <path d="M245 158L283 146L335 184L298 197L245 158Z" fill="#f9faf5" />
      <path d="M245 158L298 197V230L245 192V158Z" fill="#e0e6d9" />
      <path d="M298 197L335 184V217L298 230V197Z" fill="#a7bda7" />
      <path d="M258 198L290 220L315 212L282 190L258 198Z" fill="#355b43" />
      <path d="M273 210L301 222L320 339L182 306L273 210Z" fill={`url(#${id}-beam)`} />
      <path d="M286 220L253 320" stroke="#e87745" strokeWidth="1.5" strokeDasharray="4 7" />
      <path d="M126 311L187 294L188 363L127 382L126 311Z" fill="#cbd6c6" />
      <path d="M127 382L188 363L219 377L157 397L127 382Z" fill="#afc2ac" />
      <path d="M109 317L414 279L446 300L142 340L109 317Z" fill="#f7f8f1" />
      <path d="M142 340L446 300V311L142 351V340Z" fill="#9bae96" />
      <path d="M109 317L142 340V351L109 328V317Z" fill="#c8d3c1" />
      <path d="M128 313L408 278L426 290L147 326L128 313Z" fill="#476e58" />
      <path d="M151 313L388 283" stroke="#aec6ac" strokeWidth="1.5" />
      <circle cx="408" cy="117" r="4" fill="#d2784d" />
      <path d="M459 174L463 196" stroke="#f5f8ef" strokeWidth="3" strokeLinecap="round" />
      <path d="M333 273L354 288" stroke="#f8faf3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function OrbitSeal() {
  const id = useId();
  return (
    <span className="orbit-seal" aria-hidden="true">
      <svg viewBox="0 0 140 140">
        <defs>
          <path id={`${id}-seal`} d="M70 70m-51 0a51 51 0 1 1 102 0a51 51 0 1 1-102 0" />
        </defs>
        <circle cx="70" cy="70" r="68" fill="#f6f5ef" />
        <circle cx="70" cy="70" r="66" fill="none" stroke="#d9d9cd" />
        <text fill="#354338" fontSize="10.4" letterSpacing="3.4">
          <textPath href={`#${id}-seal`} textLength="319">
            LEARN / CONNECT / ADVANCE /
          </textPath>
        </text>
      </svg>
      <BeamMark className="seal-mark" />
    </span>
  );
}

export function CourseArtwork({ kind }: { kind: ArtworkKind }) {
  const id = useId();
  if (kind === "linac") {
    return <LinacIllustration className="course-linac-art" />;
  }
  return (
    <svg viewBox="0 0 420 240" fill="none" aria-hidden="true" className={`course-art course-art--${kind}`}>
      {kind === "shielding" && (
        <>
          <g stroke="#74917a" strokeOpacity="0.2">
            <path d="M35 200L212 234L387 175M72 173L249 207M109 145L286 179M146 118L323 152" />
            <path d="M70 207L246 90M116 216L292 99M163 225L339 108" />
          </g>
          <path d="M134 93L244 54L314 96L205 135L134 93Z" fill="#f8faf3" />
          <path d="M134 93L205 135V206L134 164V93Z" fill="#b5c9af" />
          <path d="M205 135L314 96V168L205 206V135Z" fill="#8faa8f" />
          <path d="M152 99L243 67L287 94L197 127L152 99Z" fill="#7f9c80" />
          <path d="M174 111L241 87L271 105L205 129L174 111Z" fill="#d5e0cd" />
          <path d="M205 129V183L271 160V105" fill="#d5e0cd" />
          <path d="M184 121L205 135V184L184 170V121Z" fill="#afc4a7" />
          <circle cx="218" cy="142" r="8" fill="#405f49" />
          <path d="M220 142L308 107L305 174L220 142Z" fill="#e97943" fillOpacity="0.3" />
          <path d="M218 142L308 143" stroke="#e17742" strokeWidth="2" strokeDasharray="4 5" />
          <path d="M77 84H113M95 66V102M326 190H349M337 178V201" stroke="#5c7c60" strokeOpacity="0.5" />
          <circle cx="92" cy="171" r="19" stroke="#86a48a" strokeDasharray="3 5" />
        </>
      )}
      {kind === "eclipse" && (
        <>
          <defs>
            <radialGradient id={`${id}-dose`}>
              <stop stopColor="#ed965f" stopOpacity="0.6" />
              <stop offset="1" stopColor="#e2c8ce" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <rect x="78" y="27" width="264" height="183" rx="15" fill="#f9f7fb" fillOpacity="0.7" />
          <g stroke="#b6a9c8" strokeOpacity="0.24">
            <path d="M108 47V190M138 47V190M168 47V190M198 47V190M228 47V190M258 47V190M288 47V190M318 47V190" />
            <path d="M97 70H323M97 100H323M97 130H323M97 160H323" />
          </g>
          <path d="M193 48C225 48 267 76 277 106C295 153 259 188 214 188C165 188 132 168 133 126C134 90 157 48 193 48Z" fill={`url(#${id}-dose)`} />
          <path d="M193 48C225 48 267 76 277 106C295 153 259 188 214 188C165 188 132 168 133 126C134 90 157 48 193 48Z" stroke="#a69bb8" strokeWidth="1.5" />
          <path d="M194 68C222 64 255 88 257 115C261 149 243 169 212 169C177 172 152 152 155 122C158 91 169 70 194 68Z" stroke="#a38fb8" strokeWidth="1.5" />
          <path d="M202 86C225 79 245 101 239 122C235 146 229 154 207 152C185 151 175 139 176 121C179 104 183 91 202 86Z" stroke="#d58e68" strokeWidth="2" />
          <path d="M202 104C221 92 231 109 223 124C217 139 193 133 194 120C194 112 197 109 202 104Z" stroke="#ce754e" strokeWidth="2" />
          <path d="M207 31V206M92 122H328" stroke="#7b728b" strokeDasharray="4 6" strokeOpacity="0.4" />
          <circle cx="207" cy="122" r="4" fill="#d07044" />
          <rect x="288" y="163" width="37" height="26" rx="5" fill="#d3cce2" />
          <path d="M294 182L301 177L308 179L319 169" stroke="#71667f" strokeWidth="1.5" />
        </>
      )}
      {kind === "anatomy" && (
        <>
          <circle cx="210" cy="124" r="97" fill="#f6f3e8" stroke="#d7cfb8" />
          <circle cx="210" cy="124" r="77" stroke="#d7cfb8" strokeDasharray="2 6" />
          <path d="M195 47C177 65 174 79 187 92L174 103L158 113L150 145L163 179L178 186L183 202M225 47C243 65 246 79 233 92L246 103L262 113L270 145L257 179L242 186L237 202" stroke="#887e60" strokeWidth="2" strokeLinecap="round" />
          <path d="M195 47C195 39 225 39 225 47M193 58C199 53 221 53 227 58M195 92L210 100L225 92M210 102V190" stroke="#887e60" strokeWidth="2" strokeLinecap="round" />
          {[117, 131, 145, 159].map((y) => (
            <path key={y} d={`M210 ${y}C193 ${y - 9} 174 ${y - 3} 172 ${y + 6}M210 ${y}C227 ${y - 9} 246 ${y - 3} 248 ${y + 6}`} stroke="#b3a381" strokeWidth="1.5" strokeLinecap="round" />
          ))}
          <path d="M180 177L210 190L240 177" stroke="#b3a381" strokeWidth="2" />
          <circle cx="226" cy="123" r="7" fill="#d5784c" fillOpacity="0.55" />
          <path d="M240 123H302L316 110M167 148H114L97 161" stroke="#ac9976" />
          <circle cx="316" cy="110" r="3" fill="#d5784c" />
          <circle cx="97" cy="161" r="3" fill="#d5784c" />
        </>
      )}
      {kind === "physics" && (
        <>
          <circle cx="210" cy="122" r="94" stroke="#91a9b2" strokeOpacity="0.35" strokeDasharray="3 7" />
          <ellipse cx="210" cy="122" rx="106" ry="35" stroke="#718e9b" strokeWidth="1.5" transform="rotate(-30 210 122)" />
          <ellipse cx="210" cy="122" rx="106" ry="35" stroke="#718e9b" strokeWidth="1.5" transform="rotate(30 210 122)" />
          <ellipse cx="210" cy="122" rx="106" ry="35" stroke="#718e9b" strokeWidth="1.5" transform="rotate(90 210 122)" />
          <circle cx="210" cy="122" r="24" fill="#f7f7f0" />
          <circle cx="204" cy="118" r="10" fill="#d3764e" />
          <circle cx="217" cy="119" r="9" fill="#78969f" />
          <circle cx="211" cy="132" r="8" fill="#aebfc0" />
          <circle cx="301" cy="80" r="8" fill="#d3764e" />
          <circle cx="210" cy="224" r="7" fill="#658694" />
          <circle cx="124" cy="80" r="7" fill="#658694" />
          <path d="M62 139H82M72 129V149M339 177H356M347 169V186" stroke="#839da4" />
        </>
      )}
      {kind === "gamper" && (
        <>
          <circle cx="210" cy="122" r="95" stroke="#6d8c74" strokeOpacity="0.5" />
          <circle cx="210" cy="122" r="67" stroke="#6d8c74" strokeOpacity="0.5" strokeDasharray="3 7" />
          <circle cx="210" cy="122" r="39" stroke="#93ae91" strokeOpacity="0.7" />
          <path d="M80 53L214 122L107 199" fill="#de9c6e" fillOpacity="0.08" />
          <path d="M80 53L214 122M107 199L214 122M338 94L214 122" stroke="#e99262" strokeWidth="1.5" />
          <path d="M198 100L225 109L225 135L198 144L185 121L198 100Z" fill="#e49160" fillOpacity="0.8" />
          <path d="M210 70V174M158 122H262" stroke="#dce5d4" strokeOpacity="0.45" strokeDasharray="2 5" />
          <rect x="66" y="38" width="30" height="18" rx="5" transform="rotate(27 66 38)" fill="#cbd8c5" />
          <rect x="93" y="204" width="30" height="18" rx="5" transform="rotate(-40 93 204)" fill="#cbd8c5" />
          <rect x="333" y="83" width="30" height="18" rx="5" transform="rotate(-11 333 83)" fill="#cbd8c5" />
          <circle cx="210" cy="122" r="5" fill="#f2f4e9" />
        </>
      )}
    </svg>
  );
}

export function GlobeIllustration() {
  const id = useId();
  return (
    <svg viewBox="0 0 660 470" fill="none" className="globe-art" aria-hidden="true">
      <defs>
        <clipPath id={`${id}-globe`}>
          <circle cx="331" cy="242" r="174" />
        </clipPath>
      </defs>
      <circle cx="331" cy="242" r="217" stroke="#a8b7a4" strokeOpacity="0.35" strokeDasharray="2 8" />
      <circle cx="331" cy="242" r="196" stroke="#a8b7a4" strokeOpacity="0.5" />
      <circle cx="331" cy="242" r="174" fill="#e7ebdd" stroke="#a8b7a4" />
      <g clipPath={`url(#${id}-globe)`}>
        <g stroke="#a8b7a4" strokeOpacity="0.75">
          <ellipse cx="331" cy="242" rx="126" ry="174" />
          <ellipse cx="331" cy="242" rx="58" ry="174" />
          <ellipse cx="331" cy="242" rx="174" ry="116" />
          <ellipse cx="331" cy="242" rx="174" ry="57" />
          <path d="M157 242H505M331 68V416" />
        </g>
        <g fill="#a8b7a4" fillOpacity="0.55">
          <path d="M184 124L216 113L252 137L264 153L250 173L234 177L233 197L253 211L238 224L219 213L204 187L181 180L170 152L184 124Z" />
          <path d="M244 231L266 227L284 251L282 273L266 297L259 328L240 344L231 326L240 296L230 269L232 246L244 231Z" />
          <path d="M301 139L329 120L358 127L369 148L392 151L408 135L442 145L465 172L450 196L422 186L407 202L384 190L369 178L350 193L338 180L313 184L299 166L301 139Z" />
          <path d="M319 199L350 195L374 219L371 248L353 274L336 284L321 258L310 228L319 199Z" />
          <path d="M402 226L421 213L444 230L458 251L443 265L429 247L402 226Z" />
          <path d="M427 293L457 284L474 310L459 329L430 321L427 293Z" />
        </g>
        <g stroke="#c26e43" strokeOpacity="0.65">
          <path d="M218 184Q313 82 415 174M218 184Q302 161 345 236M345 236Q394 256 452 305M260 275Q322 317 415 174" />
        </g>
        {[[218, 184], [260, 275], [345, 236], [415, 174], [452, 305], [331, 161]].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="11" fill="#f7f6ed" />
            <circle cx={x} cy={y} r="5" fill="#c26e43" />
          </g>
        ))}
      </g>
      <path d="M58 268Q86 155 171 108M510 377Q572 328 592 226" stroke="#b7c2ad" strokeWidth="1.5" />
      <circle cx="92" cy="162" r="7" fill="#c26e43" fillOpacity="0.65" />
      <circle cx="562" cy="327" r="5" fill="#c26e43" fillOpacity="0.65" />
    </svg>
  );
}
