import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* HANDLE INPUT CHANGE */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* HANDLE FORM SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name: form.name,
          user_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };
  return (
    <section
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-[#02020a] text-white"
    >
      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18), rgba(6,182,212,0.12), rgba(168,85,247,0.08), transparent 70%)",
          }}
        />
      </div>

      {/* TOP FADE */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-[#030305] to-transparent" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-32">
        {/* HEADER */}
        <div className="max-w-3xl mb-20">
          <p className="text-[11px] tracking-[0.35em] uppercase text-indigo-300/60 mb-5">
            Contact
          </p>

          <h1
            className="font-syne font-bold leading-[1.05]"
            style={{ fontSize: "clamp(3rem, 6vw, 3rem)" }}
          >
            Let’s build
            <br />
            something alive.
          </h1>

          <div className="mt-8 h-px w-44 bg-gradient-to-r from-indigo-500/60 via-cyan-400/60 to-transparent" />

          <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl">
            Have an idea, project, or collaboration in mind? Let’s turn it into
            something intentional, immersive, and meaningful.
          </p>
        </div>

        {/* FORM */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-lg rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 overflow-hidden"
        >
          {/* FORM GLOW */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(99,102,241,0.15), transparent 50%), radial-gradient(circle at bottom right, rgba(6,182,212,0.12), transparent 55%)",
            }}
          />

          <form onSubmit={handleSubmit} className="relative z-10 grid gap-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full bg-transparent border-b border-white/10 py-3 outline-none text-white/80 placeholder:text-white/30 focus:border-indigo-400/50"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full bg-transparent border-b border-white/10 py-3 outline-none text-white/80 placeholder:text-white/30 focus:border-cyan-400/50"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              required
              className="w-full bg-transparent border-b border-white/10 py-3 outline-none text-white/80 placeholder:text-white/30 focus:border-purple-400/50 resize-none"
            />

            <button
              type="submit"
              className="mt-6 self-start px-8 py-4 rounded-full border border-white/10 text-sm tracking-[0.25em] uppercase hover:border-indigo-400/40 hover:text-white transition relative overflow-hidden"
            >
              <span className="relative z-10">Send Message</span>

              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.2), rgba(6,182,212,0.15))",
                }}
              />
            </button>
          </form>
        </motion.div>

        {/* STATUS */}
        <div className="mt-16 flex items-center justify-center gap-3 text-white/40 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for freelance & collaborations
        </div>

        {/* FOOTER */}
        <div className="mt-24 border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white/40 text-sm">
          {/* COPYRIGHT */}
          <p className="tracking-wide hover:text-white/60 transition">
            © {new Date().getFullYear()} Oghenevwegba Okiti. All rights
            reserved.
          </p>

          {/* EMAIL */}
          <a
            href="mailto:Ovwegbaokiti@gmail.com"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Mail size={16} />
            <span>Ovwegbaokiti@gmail.com</span>
          </a>

          {/* WHATSAPP ONLY */}
          <a
            href="https://wa.me/2349052193656"
            target="_blank"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
