import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
  Check,
  AlertCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactDesktop({
  form,
  handleChange,
  handleSubmit,
  status,
  isSending,
}) {
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-white"
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-1/2 h-[650px] w-[1000px] -translate-x-1/2 blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18), rgba(6,182,212,0.10), rgba(168,85,247,0.07), transparent 70%)",
          }}
        />
      </div>

      {/* TOP FADE */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-[#030305] to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl px-10 py-32">
        {/* HEADER */}
        <div className="mb-20 max-w-4xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-indigo-300/60">
            Contact
          </p>

          <h1 className="font-syne text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Let’s build
            <br />
            <span className="text-white/45">something that works.</span>
          </h1>

          <div className="mt-9 h-px w-48 bg-gradient-to-r from-indigo-500/70 via-cyan-400/60 to-transparent" />

          <p className="mt-8 max-w-2xl text-[17px] leading-[1.8] text-white/55">
            Have an idea, project, or collaboration in mind? Let’s turn it into
            something intentional, immersive, and meaningful.
          </p>
        </div>

        {/* CONTACT GRID */}
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-20">
          {/* LEFT INFORMATION */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-white/30">
                Start a conversation
              </p>

              <p className="max-w-sm text-[15px] leading-[1.8] text-white/45">
                Whether you have a project in mind or simply want to talk
                through an idea, send a message and I’ll get back to you.
              </p>
            </div>

            {/* CONTACT DETAILS */}
            <div className="mt-16 space-y-7">
              <a
                href="mailto:Ovwegbaokiti@gmail.com"
                className="group flex items-center gap-4 text-white/50 transition hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-indigo-400/30 group-hover:bg-indigo-400/[0.05]">
                  <Mail size={15} />
                </span>

                <span className="text-sm">Ovwegbaokiti@gmail.com</span>
              </a>

              <a
                href="https://wa.me/2349052193656"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-white/50 transition hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-green-400/30 group-hover:bg-green-400/[0.05]">
                  <MessageCircle size={15} />
                </span>

                <span className="text-sm">WhatsApp</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </a>
              <a
                href="https://github.com/OkitiAchim"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-white/50 transition hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-white/20 group-hover:bg-white/[0.05]">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    aria-hidden="true"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.153-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
                  </svg>
                </span>

                <span className="text-sm">GitHub</span>

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </a>

              <div className="flex items-center gap-4 text-white/50">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                  <Phone size={15} />
                </span>

                <span className="text-sm">+234 906 370 3235</span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-10 backdrop-blur-xl"
          >
            {/* FORM GLOW */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(99,102,241,0.08), transparent 45%), radial-gradient(circle at bottom right, rgba(6,182,212,0.06), transparent 50%)",
              }}
            />

            <form onSubmit={handleSubmit} className="relative z-10 grid gap-7">
              {/* NAME */}
              <div className="grid gap-2.5">
                <Label
                  htmlFor="desktop-name"
                  className="text-[10px] uppercase tracking-[0.25em] text-white/40"
                >
                  Name
                </Label>

                <Input
                  id="desktop-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="h-12 rounded-xl border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-white/25 focus-visible:border-indigo-400/50 focus-visible:ring-indigo-400/10"
                />
              </div>

              {/* EMAIL */}
              <div className="grid gap-2.5">
                <Label
                  htmlFor="desktop-email"
                  className="text-[10px] uppercase tracking-[0.25em] text-white/40"
                >
                  Email
                </Label>

                <Input
                  id="desktop-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="h-12 rounded-xl border-white/10 bg-white/[0.025] px-4 text-sm text-white placeholder:text-white/25 focus-visible:border-cyan-400/50 focus-visible:ring-cyan-400/10"
                />
              </div>

              {/* MESSAGE */}
              <div className="grid gap-2.5">
                <Label
                  htmlFor="desktop-message"
                  className="text-[10px] uppercase tracking-[0.25em] text-white/40"
                >
                  Message
                </Label>

                <Textarea
                  id="desktop-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your idea..."
                  rows={7}
                  required
                  className="resize-none rounded-xl border-white/10 bg-white/[0.025] px-4 py-3 text-sm leading-7 text-white placeholder:text-white/25 focus-visible:border-purple-400/50 focus-visible:ring-purple-400/10"
                />
              </div>

              {/* STATUS */}
              {status.message && (
                <div
                  className={`flex items-center gap-2 text-xs ${
                    status.type === "success"
                      ? "text-emerald-400/80"
                      : "text-red-400/80"
                  }`}
                >
                  {status.type === "success" ? (
                    <Check size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}

                  <span>{status.message}</span>
                </div>
              )}

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={isSending}
                className="mt-2 h-12 rounded-xl border border-white/10 bg-white/[0.05] px-6 text-[11px] uppercase tracking-[0.25em] text-white transition hover:border-indigo-400/30 hover:bg-indigo-500/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send Message"}

                {!isSending && <ArrowUpRight size={15} />}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* FOOTER */}
        <div className="mt-28 flex items-center justify-between border-t border-white/10 pt-8 text-xs text-white/30">
          <p className="tracking-wide">
            © {new Date().getFullYear()} AchimOkiti.dev All rights reserved.
          </p>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
