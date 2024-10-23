'use client';

import { useState } from 'react';

import emailjs from '@emailjs/browser';

export default function InquireForm({ subject }: { subject: string | null }) {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(false);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      from_name: { value: string };
      reply_to: { value: string };
      message: { value: string };
    };

    emailjs
      .send(
        'service_ej6gfo9',
        'template_v1ulh7q',
        {
          subject: subject, // not functional
          from_name: target.from_name.value,
          reply_to: target.reply_to.value,
          message: target.message.value,
          // to_email: data.email, ??
        },
        'user_kDFY4AFTuoji3GQqaGDsn',
      )
      .then(
        (result) => {
          (e.target as HTMLFormElement).reset();
          setEmailSent(true);
          console.log(result.text);
        },
        (error) => {
          console.log(error);
        },
      );
  };

  return (
    <form className="flex w-full flex-1 flex-col gap-2" onSubmit={sendEmail}>
      <input
        required
        className="m-1 border border-gray-300 p-2 text-sm"
        type="text"
        name="from_name"
        placeholder="Your Name"
      />
      <input
        required
        className="m-1 border border-gray-300 p-2 text-sm"
        type="email"
        name="reply_to"
        placeholder="Your Email"
      />
      <textarea
        required
        className="m-1 min-h-[150px] border border-gray-300 p-2 text-sm"
        name="message"
        placeholder="Your Message"
      />
      <div className="flex flex-row items-center gap-4">
        <button
          className="w-28 bg-darkGray p-2 text-sm text-white"
          type="submit"
        >
          Send
        </button>
        {emailSent && <p className="text-sm text-darkGray">Email sent.</p>}
        {error && (
          <p className="text-sm text-destructive">Error sending email</p>
        )}
      </div>
    </form>
  );
}
