'use client';

import emailjs from '@emailjs/browser';

export default function ContactForm({ data }: { data: any }) {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      from_name: { value: string };
      reply_to: { value: string };
      message: { value: string };
    };

    emailjs
      .send(
        'service_wmtm7u2',
        'template_v1ulh7q',
        {
          from_name: target.from_name.value,
          reply_to: target.reply_to.value,
          message: target.message.value,
          to_email: data.email,
        },
        'user_kDFY4AFTuoji3GQqaGDsn',
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error);
        },
      );
    return { message: 'Email Sent!' };
  };

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={sendEmail}>
      <input
        className="m-1 rounded-sm border border-gray-300 p-2 text-sm"
        type="text"
        name="from_name"
        placeholder="Your Name"
      />
      <input
        className="m-1 rounded-sm border border-gray-300 p-2 text-sm"
        type="email"
        name="reply_to"
        placeholder="Your Email"
      />
      <textarea
        className="m-1 rounded-sm border border-gray-300 p-2 text-sm"
        name="message"
        placeholder="Your Message"
      />
      <button
        className="w-28 rounded-sm bg-darkGray p-2 text-sm text-white"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
