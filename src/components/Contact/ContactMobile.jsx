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

export default function ContactMobile({
  form,
  handleChange,
  handleSubmit,
  status,
  isSending,
}) {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#000000] text-white"
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* AMBIENT GLOW */}
      <div
        className="absolute left-1/2 top-[-100px] h-[450px] w-[450px] -translate-x-1/2 blur-3xl opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18), rgba(6,182,212,0.08), transparent 70%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-24 sm:px-8 sm:py-28">
        {/* HEADER */}
        <div className="mb-14">
          <p className="mb-5 text-[10px] uppercase tracking-[0.32em] text-indigo-300/60">
            Contact
          </p>

          <h1 className="font-syne text-[clamp(2.6rem,11vw,4rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            Let’s build
            <br />
            <span className="text-white/45">something that works.</span>
          </h1>

          <div className="mt-7 h-px w-32 bg-gradient-to-r from-indigo-500/70 via-cyan-400/50 to-transparent" />

          <p className="mt-7 max-w-md text-[15px] leading-[1.75] text-white/50">
            Have an idea, project, or collaboration in mind? Send a message and
            let’s start a conversation.
          </p>
        </div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl sm:p-7"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(99,102,241,0.08), transparent 50%)",
            }}
          />

          <form onSubmit={handleSubmit} className="relative z-10 grid gap-6">
            {/* NAME */}
            <div className="grid gap-2.5">
              <Label
                htmlFor="mobile-name"
                className="text-[10px] uppercase tracking-[0.22em] text-white/35"
              >
                Name
              </Label>

              <Input
                id="mobile-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="h-11 rounded-lg border-white/10 bg-white/[0.02] text-sm text-white placeholder:text-white/25 focus-visible:border-indigo-400/50 focus-visible:ring-indigo-400/10"
              />
            </div>

            {/* EMAIL */}
            <div className="grid gap-2.5">
              <Label
                htmlFor="mobile-email"
                className="text-[10px] uppercase tracking-[0.22em] text-white/35"
              >
                Email
              </Label>

              <Input
                id="mobile-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="h-11 rounded-lg border-white/10 bg-white/[0.02] text-sm text-white placeholder:text-white/25 focus-visible:border-cyan-400/50 focus-visible:ring-cyan-400/10"
              />
            </div>

            {/* MESSAGE */}
            <div className="grid gap-2.5">
              <Label
                htmlFor="mobile-message"
                className="text-[10px] uppercase tracking-[0.22em] text-white/35"
              >
                Message
              </Label>

              <Textarea
                id="mobile-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your idea..."
                rows={6}
                required
                className="resize-none rounded-lg border-white/10 bg-white/[0.02] text-sm leading-6 text-white placeholder:text-white/25 focus-visible:border-purple-400/50 focus-visible:ring-purple-400/10"
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

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isSending}
              className="h-12 w-full rounded-lg border border-white/10 bg-white/[0.05] text-[10px] uppercase tracking-[0.25em] text-white hover:border-indigo-400/30 hover:bg-indigo-500/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}

              {!isSending && <ArrowUpRight size={15} />}
            </Button>
          </form>
        </motion.div>

        {/* CONTACT DETAILS */}
        <div className="mt-16">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/25">
            Direct contact
          </p>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {/* EMAIL */}
            <a
              href="mailto:Ovwegbaokiti@gmail.com"
              className="flex items-center justify-between py-5 text-white/50 transition active:text-white"
            >
              <div className="flex items-center gap-3">
                <Mail size={15} />
                <span className="text-sm">Ovwegbaokiti@gmail.com</span>
              </div>

              <ArrowUpRight size={14} />
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/2349052193656"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 text-white/50 transition active:text-green-400"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={15} />
                <span className="text-sm">WhatsApp</span>
              </div>

              <ArrowUpRight size={14} />
            </a>

            {/* PHONE */}
            <div className="flex items-center gap-3 py-5 text-white/50">
              <Phone size={15} />
              <span className="text-sm">+234 906 370 3235</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 border-t border-white/10 pt-7">
          <p className="text-[11px] leading-6 tracking-wide text-white/25">
            © {new Date().getFullYear()} AchimOkiti.dev
            <br />
            All rights reserved.
          </p>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
