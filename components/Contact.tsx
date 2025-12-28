import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Settings, Github, Linkedin, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
   const [sent, setSent] = useState(false);
   const [sending, setSending] = useState(false);
   const form = useRef<HTMLFormElement>(null);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSending(true);

      if (form.current) {
         emailjs
            .sendForm(
               import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
               import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
               form.current,
               import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            )
            .then(
               () => {
                  setSent(true);
                  setSending(false);
                  setTimeout(() => setSent(false), 5000);
                  form.current?.reset();
               },
               (error) => {
                  setSending(false);
                  console.error('FAILED...', error.text);
                  alert('Failed to send message, please try again.');
               }
            );
      }
   };

   return (
      <div className="max-w-4xl mx-auto px-6 md:px-0">
         <div className="text-center mb-20 relative">
            <h3 className="text-3xl font-display mb-6">Ready to build something together?</h3>
            <p className="mb-8 text-blue-200">I'm always curious to learn about new challenges.</p>


         </div>
         <div className="max-w-xl mx-auto">
            <div className="text-center mb-12 border-b border-double border-white/30 pb-4">
               <h2 className="text-3xl font-display uppercase tracking-widest">Contact</h2>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="relative space-y-8">
               <input type="hidden" name="title" value="Portfolio" />
               <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-blueprint-bg px-2 text-sm font-mono text-cyan-300 z-10">Name</label>
                  <input
                     type="text"
                     name="name"
                     required
                     className="w-full bg-transparent border-2 border-white/40 rounded-lg p-4 outline-none focus:border-cyan-300 transition-colors font-hand text-xl text-white placeholder-white/20"
                     style={{
                        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', // Organic shape
                     }}
                  />
                  <svg className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 stroke-white fill-white/20" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="10" strokeWidth="0.5" />
                  </svg>
               </div>

               <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-blueprint-bg px-2 text-sm font-mono text-cyan-300 z-10">Email</label>
                  <input
                     type="email"
                     name="email"
                     required
                     className="w-full bg-transparent border-2 border-white/40 rounded-lg p-4 outline-none focus:border-cyan-300 transition-colors font-hand text-xl text-white placeholder-white/20"
                     style={{
                        borderRadius: '225px 15px 225px 15px / 15px 225px 15px 255px', // Organic shape
                     }}
                  />
                  <svg className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 stroke-white fill-white/20" viewBox="0 0 24 24">
                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="0.5" />
                     <path d="M22 6l-10 7L2 6" strokeWidth="0.5" />
                  </svg>
               </div>

               <div className="relative group">
                  <label className="absolute -top-3 left-4 bg-blueprint-bg px-2 text-sm font-mono text-cyan-300 z-10">Message</label>
                  <textarea
                     rows={5}
                     name="message"
                     required
                     className="w-full bg-transparent border-2 border-white/40 rounded-lg p-4 outline-none focus:border-cyan-300 transition-colors font-hand text-xl text-white placeholder-white/20"
                     style={{
                        borderRadius: '15px 225px 15px 255px / 255px 15px 225px 15px', // Organic shape
                     }}
                  />
                  {/* Decorative coil */}
                  <svg className="absolute top-4 right-10 w-12 h-8 stroke-white fill-none stroke-2 opacity-50" viewBox="0 0 50 20">
                     <path d="M0 10 Q 5 0 10 10 T 20 10 T 30 10" />
                  </svg>
               </div>

               <div className="flex justify-center pt-8">
                  <button
                     type="submit"
                     disabled={sent || sending}
                     className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {/* Gear background */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:rotate-180 transition-transform duration-1000">
                        <Settings className="w-24 h-24 stroke-white stroke-1" />
                     </div>

                     {/* Button actual */}
                     <div className="relative z-10 border-2 border-white bg-blueprint-bg px-8 py-3 font-display font-bold text-lg uppercase tracking-wider shadow-blueprint active:translate-y-1 active:shadow-none transition-all flex items-center gap-2">
                        <span>{sent ? 'Sent!' : sending ? 'Sending...' : 'Send'}</span>
                        {!sent && !sending && <Send className="w-4 h-4" />}
                     </div>
                  </button>
               </div>
            </form>

            {sent && (
               <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                  <div className="bg-blueprint-bg border-4 border-double border-white p-8 -rotate-6 shadow-2xl animate-[bounce_0.5s_ease-out]">
                     <h3 className="font-display text-2xl mb-2">Thanks for reaching out.</h3>
                     <p className="font-mono text-sm text-cyan-300">I'm probably excited already.</p>
                  </div>
               </div>
            )}


         </div>
      </div>

   );
};
