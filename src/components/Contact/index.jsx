import { useState } from "react";
import ContactDesktop from "./ContactDesktop";
import ContactMobile from "./ContactMobile";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  /* HANDLE INPUT CHANGE */
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  /* HANDLE FORM SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSending(true);
    setStatus({
      type: "",
      message: "",
    });

    try {
      const emailjs = await import("@emailjs/browser");

      await emailjs.default.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          user_name: form.name,
          user_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setStatus({
        type: "success",
        message: "Message sent successfully.",
      });
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const contactProps = {
    form,
    handleChange,
    handleSubmit,
    status,
    isSending,
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:block">
        <ContactDesktop {...contactProps} />
      </div>

      {/* MOBILE + TABLET */}
      <div className="block lg:hidden">
        <ContactMobile {...contactProps} />
      </div>
    </>
  );
}
