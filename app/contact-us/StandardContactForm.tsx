"use client";

import { useEffect, useState, type FormEvent } from "react";

type Props = { endpoint?: string; encoding?: "json" | "form" };
type TrackerWindow = Window & { acrTracker?: { trackLead?: (payload: Record<string, unknown>) => void } };

const companySizes = ["1-5", "5-10", "11-50", "51-250", "251-1k", "1k+"];
const positions = ["Just 1 Position", "2-5 Positions", "6-10 Positions", "11-50 Positions", "51-100 Positions", "101-500 Positions", "501-1,000 Positions", "Over 1,000 Positions"];
const referrals = ["Google", "Email", "LinkedIn", "Reddit", "X / Twitter", "Referral", "ChatGPT / AI", "Outbound Outreach", "Other"];
const countryCodes = [
  ["United States", "+1"], ["Canada", "+1"], ["Indonesia", "+62"], ["Philippines", "+63"], ["United Kingdom", "+44"],
  ["Australia", "+61"], ["New Zealand", "+64"], ["Singapore", "+65"], ["India", "+91"], ["United Arab Emirates", "+971"],
  ["Mexico", "+52"], ["Brazil", "+55"], ["South Africa", "+27"], ["Germany", "+49"], ["France", "+33"],
];

export default function StandardContactForm({ endpoint = "/api/submit-lead", encoding = "json" }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [referral, setReferral] = useState("");

  useEffect(() => {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const zones: Record<string, string> = {
      "Asia/Jakarta": "+62", "Asia/Makassar": "+62", "Asia/Jayapura": "+62", "Asia/Manila": "+63",
      "Europe/London": "+44", "Australia/Sydney": "+61", "Australia/Melbourne": "+61",
      "Pacific/Auckland": "+64", "Asia/Singapore": "+65", "Asia/Kolkata": "+91", "Asia/Dubai": "+971",
    };
    if (zones[zone]) setCountryCode(zones[zone]);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website_url") || "").trim()) return;
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const phone = `${countryCode} ${String(data.get("phoneLocal") || "").trim()}`.trim();
    const payload: Record<string, string> = {
      firstName, lastName, name: `${firstName} ${lastName}`.trim(), fullName: `${firstName} ${lastName}`.trim(),
      email: String(data.get("email") || ""), businessEmail: String(data.get("email") || ""), phone,
      companyName: String(data.get("companyName") || ""), company: String(data.get("companyName") || ""),
      website: String(data.get("website") || ""), companySize: String(data.get("companySize") || ""),
      positions: String(data.get("positions") || ""), positionsToFill: String(data.get("positions") || ""),
      referral: String(data.get("referral") || ""), howTheyHeard: String(data.get("referral") || ""),
      referralSpecify: String(data.get("referralSpecify") || ""), message: String(data.get("message") || ""),
      source: "contact-form", formId: "contactPageForm",
    };
    setSubmitting(true);
    setError("");
    try {
      const request = encoding === "form"
        ? { method: "POST", body: new URLSearchParams(payload) }
        : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) };
      const response = await fetch(endpoint, request);
      if (!response.ok) throw new Error("Lead endpoint rejected the request");
      try { (window as TrackerWindow).acrTracker?.trackLead?.(payload); } catch {}
      window.location.assign("/thank-you");
    } catch {
      setError("We could not submit your request. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="sa-form-card">
      <h2>Tell us about the role.</h2>
      <form onSubmit={submit} id="contactPageForm" data-acr-handled="1">
        <input className="sa-hp" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="sa-grid">
          <label>First name *<input name="firstName" required autoComplete="given-name" /></label>
          <label>Last name *<input name="lastName" required autoComplete="family-name" /></label>
        </div>
        <label>Business email *<input name="email" type="email" required autoComplete="email" /><small>Please use your work email.</small></label>
        <label>Phone number *<span className="sa-phone"><select aria-label="Country code" value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>{countryCodes.map(([country, code], index) => <option value={code} key={`${code}-${index}`}>{code} — {country}</option>)}</select><input name="phoneLocal" type="tel" required autoComplete="tel-national" placeholder="Phone number" /></span></label>
        <div className="sa-grid">
          <label>Company name *<input name="companyName" required autoComplete="organization" /></label>
          <label>Website / URL <span className="sa-optional">Optional</span><input name="website" placeholder="example.com" autoComplete="url" /></label>
        </div>
        <div className="sa-grid">
          <label>Company size *<select name="companySize" required defaultValue=""><option value="" disabled>Select...</option>{companySizes.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Positions to fill *<select name="positions" required defaultValue=""><option value="" disabled>Select...</option>{positions.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <label>How did you hear about us? *<select name="referral" required value={referral} onChange={(event) => setReferral(event.target.value)}><option value="" disabled>Select...</option>{referrals.map((item) => <option key={item}>{item}</option>)}</select></label>
        {referral === "Other" ? <label>Please specify *<input name="referralSpecify" required /></label> : null}
        <label>Message <span className="sa-optional">Optional</span><textarea name="message" rows={3} /></label>
        <p className="sa-privacy">We use your details to respond to this inquiry. See our <a href="/privacy">Privacy Policy</a>.</p>
        {error ? <p className="sa-error" role="alert">{error}</p> : null}
        <button id="cta-contact-form-free-consultation" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Book a Free Consultation"}</button>
      </form>
      <style jsx>{`
        .sa-form-card{width:100%;max-width:876px;margin:0 auto;padding:34px 42px 42px;color:var(--ink);text-align:left;background:var(--paper);border:1px solid var(--line);border-radius:4px 36px 4px 4px;box-shadow:var(--shadow)}
        h2{max-width:700px;margin:0 0 24px;color:var(--ink);font-size:clamp(1.9rem,3vw,2.45rem);font-weight:600;line-height:1.05;letter-spacing:-.035em}
        form{display:flex;flex-direction:column;gap:16px}.sa-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        label{display:flex;flex-direction:column;gap:7px;color:var(--ink-soft);font-size:.95rem;font-weight:700;line-height:1.35}
        input,select,textarea{box-sizing:border-box;width:100%;min-height:50px;margin:0;padding:12px 14px;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:4px;outline:none;font:inherit;font-size:1rem}
        input:focus,select:focus,textarea:focus{border-color:#167c73;box-shadow:0 0 0 3px rgba(22,124,115,.16)}
        small,.sa-optional{color:var(--muted);font-size:.8rem;font-weight:400}.sa-phone{display:grid;grid-template-columns:minmax(135px,.42fr) minmax(0,1fr);overflow:hidden;border:1px solid var(--line);border-radius:4px}.sa-phone:focus-within{border-color:#167c73;box-shadow:0 0 0 3px rgba(22,124,115,.16)}
        .sa-phone select,.sa-phone input{min-width:0;margin:0;border:0;border-radius:0;box-shadow:none!important}.sa-phone select{border-right:1px solid var(--line)}
        textarea{min-height:112px;resize:vertical}.sa-privacy{margin:0;color:var(--muted);font-size:.82rem;line-height:1.5}.sa-privacy a{color:#167c73;font-weight:700;text-decoration:underline;text-underline-offset:2px}
        button{width:100%;min-height:56px;padding:15px 22px;color:var(--ink);background:var(--coral);border:0;border-radius:8px;box-shadow:0 12px 28px rgba(242,107,79,.24);cursor:pointer;font-size:1.05rem;font-weight:800;transition:transform .2s ease,filter .2s ease}
        button:hover{filter:brightness(.96);transform:translateY(-2px)}button:focus-visible{outline:3px solid #167c73;outline-offset:3px}button:disabled{cursor:wait;opacity:.65;transform:none}.sa-error{margin:0;color:#b42318;font-size:.875rem}.sa-hp{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important}
        @media(max-width:700px){.sa-form-card{padding:22px 18px 26px;border-radius:4px 24px 4px 4px}h2{margin-bottom:18px;font-size:1.85rem}form{gap:14px}.sa-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.sa-phone{grid-template-columns:120px minmax(0,1fr)}}
        @media(max-width:360px){.sa-grid{grid-template-columns:1fr}.sa-phone{grid-template-columns:105px minmax(0,1fr)}}
      `}</style>
    </div>
  );
}
