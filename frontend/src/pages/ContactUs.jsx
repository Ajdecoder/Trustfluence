import { motion } from "framer-motion";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 sm:text-4xl"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg leading-6 text-gray-300"
          >
            Have a question or want to work together? Fill out the form below or use our contact information.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-400/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <MapPinIcon className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Our Office</h3>
                  <p className="mt-1 text-gray-400">123 Innovation Street</p>
                  <p className="text-gray-400">Tech Valley, CA 94016</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <PhoneIcon className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Phone</h3>
                  <p className="mt-1 text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-400">Mon-Fri: 9am - 5pm PST</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="p-6 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-green-400/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <EnvelopeIcon className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100">Email</h3>
                  <p className="mt-1 text-gray-400">contact@company.com</p>
                  <p className="text-gray-400">Support: help@company.com</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-lg bg-gray-700/50 border border-gray-600/50 px-4 py-3 text-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-lg bg-gray-700/50 border border-gray-600/50 px-4 py-3 text-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full rounded-lg bg-gray-700/50 border border-gray-600/50 px-4 py-3 text-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/50"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center space-x-8"
        >
          {[
            { name: 'Twitter', href: '#', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
            { name: 'GitHub', href: '#', icon: 'M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' },
            { name: 'LinkedIn', href: '#', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <span className="sr-only">{social.name}</span>
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}