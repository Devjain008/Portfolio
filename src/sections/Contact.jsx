import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useData }  from "../hooks/useData";
import { GithubIcon, LinkedinIcon, MailIcon, LeetcodeIcon, CodeforcesIcon } from "../components/Icons";
import { ScrollReveal } from "../components/ScrollReveal";

function validate({ name, email, message }) {
  const e = {};
  if (!name.trim())             e.name    = "Name is required.";
  if (!email.trim())            e.email   = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                e.email   = "Enter a valid email.";
  if (!message.trim())          e.message = "Message is required.";
  else if (message.trim().length < 10)
                                e.message = "At least 10 characters.";
  return e;
}

export default function Contact() {
  const { personal, emailjsConfig } = useData();

  const formRef = useRef(null);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("loading");
    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        { publicKey: emailjsConfig.publicKey }
      );
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS:", err);
      setStatus("error");
    }
  };

  const socials = [
    { href: personal.socials.github,      Icon: GithubIcon,      label: "GitHub"      },
    { href: personal.socials.leetcode,    Icon: LeetcodeIcon,    label: "LeetCode"    },
    { href: personal.socials.codeforces,  Icon: CodeforcesIcon,  label: "Codeforces"  },
    { href: personal.socials.linkedin,    Icon: LinkedinIcon,    label: "LinkedIn"    },
    { href: personal.socials.email,       Icon: MailIcon,        label: "Email"       },
  ];

  return (
    <section
      id="contact"
      aria-label="Contact Dev Jain"
      className="section"
    >
      <div className="container">
        <ScrollReveal preset="fadeUp" className="flex items-center gap-5 mb-12">
          <div>
            <span className="section-label">07. contact</span>
            <h2 className="section-title">Get in Touch</h2>
          </div>
          <div className="divider" aria-hidden="true" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info */}
          <ScrollReveal preset="fadeLeft">
            <p className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8" style={{ color: "var(--text-muted)" }}>
              I'm open to internship opportunities, freelance collaborations, and good conversations about software engineering and DSA. Feel free to reach out!
            </p>

            <div className="space-y-4 mb-6 sm:mb-8">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 text-sm w-fit transition-colors hover:text-[--accent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] rounded break-all"
                style={{ color: "var(--text-muted)" }}
              >
                <MailIcon size={15} className="text-[--accent] shrink-0" />
                {personal.email}
              </a>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" className="shrink-0" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {personal.phone}
              </div>
            </div>

            <p className="mono text-xs mb-3" style={{ color: "var(--text-dimmed)" }}>find me on</p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3" role="list" aria-label="Social links">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  role="listitem"
                  className="p-2.5 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent] border-[--border] text-slate-400 hover:text-[--accent] hover:border-[rgba(34,211,238,0.35)] hover:bg-[rgba(34,211,238,0.05)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Mailto fallback */}
            <p className="mt-6 sm:mt-8 text-sm" style={{ color: "var(--text-dimmed)" }}>
              Prefer email directly?{" "}
              <a
                href={`mailto:${personal.email}`}
                className="text-[--accent] underline hover:no-underline break-all"
              >
                {personal.email}
              </a>
            </p>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal preset="fadeRight" delay={0.1}>
            <div className="card p-5 sm:p-6">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(34,211,238,0.1)] border border-[rgba(34,211,238,0.3)]">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" style={{ color: "var(--text)" }}>Message Sent!</h3>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Thanks for reaching out. I'll get back to you soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn btn-outline text-sm mt-2"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact form" className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="c-name" className="block mono text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                      Name <span className="text-[--accent]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="c-name" type="text" name="name"
                      value={fields.name} onChange={onChange}
                      placeholder="Your name"
                      className={`field ${errors.name ? "error" : ""}`}
                      aria-required="true" aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "e-name" : undefined}
                      autoComplete="name"
                    />
                    {errors.name && <p id="e-name" role="alert" className="mt-1 mono text-xs text-red-400">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="c-email" className="block mono text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                      Email <span className="text-[--accent]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="c-email" type="email" name="email"
                      value={fields.email} onChange={onChange}
                      placeholder="you@example.com"
                      className={`field ${errors.email ? "error" : ""}`}
                      aria-required="true" aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "e-email" : undefined}
                      autoComplete="email"
                    />
                    {errors.email && <p id="e-email" role="alert" className="mono text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="c-message" className="block mono text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>
                      Message <span className="text-[--accent]" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="c-message" name="message"
                      value={fields.message} onChange={onChange}
                      placeholder="Tell me about your project, opportunity, or just say hi…"
                      rows={5} className={`field resize-none ${errors.message ? "error" : ""}`}
                      aria-required="true" aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "e-message" : undefined}
                    />
                    {errors.message && <p id="e-message" role="alert" className="mono text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  {status === "error" && (
                    <div role="alert" className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Failed to send. Email me directly:{" "}
                      <a href={`mailto:${personal.email}`} className="underline">{personal.email}</a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn btn-primary w-full justify-center"
                    aria-busy={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-[#0a0f1e] border-t-transparent animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
