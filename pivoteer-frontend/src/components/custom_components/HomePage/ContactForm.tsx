const ContactForm = () => {
  return (
    <div className="flex flex-col items-center gap-8 mt-20 mb-20 w-full">
      <h2 className="text-4xl font-bold">Contact Us</h2>
      <form className="flex flex-col gap-5 w-[80%] md:w-[60%] lg:w-[40%]">
        <input type="text" placeholder="Your Name" className="p-4 rounded bg-deepIndigo text-white" />
        <input type="email" placeholder="Your Email" className="p-4 rounded bg-deepIndigo text-white" />
        <textarea placeholder="Your Message" className="p-4 rounded bg-deepIndigo text-white" rows={6} />
        <button type="submit" className="px-8 py-3 bg-neonPink text-white rounded-lg">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
