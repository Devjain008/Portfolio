import { useState } from "react";
import { getKey, setKey } from "./adminHelpers";
import { useTheme } from "../hooks/useTheme";

function Field({ label, id, ...props }) {
  const { isDark } = useTheme();
  return (
    <div>
      <label htmlFor={id} className="block mono text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      {props.as === "textarea" ? (
        <textarea id={id} {...{ ...props, as: undefined }} className="field resize-none" rows={3} />
      ) : (
        <input id={id} {...props} className="field" />
      )}
    </div>
  );
}

export default function AdminPersonal({ showToast }) {
  const def = getKey("personal");
  const [form, setForm] = useState({
    name:    def.name,
    title:   def.title,
    pitch:   def.pitch,
    email:   def.email,
    phone:   def.phone,
    resume:  def.resume,
    avatar:  def.avatar,
    github:     def.socials.github,
    leetcode:   def.socials.leetcode,
    codeforces: def.socials.codeforces || "",
    linkedin:   def.socials.linkedin,
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    setKey("personal", {
      ...def,
      name: form.name, title: form.title, pitch: form.pitch,
      email: form.email, phone: form.phone, resume: form.resume, avatar: form.avatar,
      socials: {
        github:     form.github,
        leetcode:   form.leetcode,
        codeforces: form.codeforces,
        linkedin:   form.linkedin,
        email:      `mailto:${form.email}`,
      },
    });
    showToast("Personal info saved to localStorage.");
  };

  return (
    <section aria-label="Edit personal info">
      <h2 className="font-bold text-lg mb-6" style={{ color: "var(--text)" }}>Personal Information</h2>
      <form onSubmit={save} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" id="p-name" type="text" value={form.name} onChange={set("name")} />
          <Field label="Email" id="p-email" type="email" value={form.email} onChange={set("email")} />
          <Field label="Phone" id="p-phone" type="tel" value={form.phone} onChange={set("phone")} />
          <Field label="Resume path (e.g. /resume.pdf)" id="p-resume" type="text" value={form.resume} onChange={set("resume")} />
          <Field label="Avatar path (e.g. /avatar.jpg)" id="p-avatar" type="text" value={form.avatar} onChange={set("avatar")} />
        </div>
        <Field label="Professional Title" id="p-title" type="text" value={form.title} onChange={set("title")} />
        <Field label="One-line Pitch" id="p-pitch" as="textarea" value={form.pitch} onChange={set("pitch")} />
        <hr style={{ borderColor: "var(--border)" }} />
        <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>Social Links</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="GitHub URL" id="p-github" type="url" value={form.github} onChange={set("github")} />
          <Field label="LeetCode URL" id="p-leetcode" type="url" value={form.leetcode} onChange={set("leetcode")} />
          <Field label="Codeforces URL" id="p-codeforces" type="url" value={form.codeforces} onChange={set("codeforces")} />
          <Field label="LinkedIn URL" id="p-linkedin" type="url" value={form.linkedin} onChange={set("linkedin")} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn btn-primary">Save Personal Info</button>
        </div>
      </form>
    </section>
  );
}
