import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactView from "./ContactDesktop";

const emptyForm = { name: "", email: "", projectType: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const selectService = (event) => {
      const projectType = event.detail?.projectType;
      if (!["A website", "An interface", "A web application", "Something else"].includes(projectType)) return;
      setForm((previous) => ({ ...previous, projectType }));
      setStatus({ type: "", message: "" });
    };
    window.addEventListener("portfolio:service-inquiry", selectService);
    return () => window.removeEventListener("portfolio:service-inquiry", selectService);
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSending) return;
    setIsSending(true);
    setStatus({ type: "", message: "" });
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name: form.name,
          user_email: form.email,
          message: `Project type: ${form.projectType}\n\n${form.message}`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setForm(emptyForm);
      setStatus({ type: "success", message: "Message sent successfully. Thanks for getting in touch." });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Your message could not be sent. Please try again or use the email link below." });
    } finally {
      setIsSending(false);
    }
  };

  return <ContactView form={form} handleChange={handleChange} handleSubmit={handleSubmit} status={status} isSending={isSending} />;
}
