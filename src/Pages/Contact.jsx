import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Linkedin, Instagram, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Use FormSubmit (make sure the email is correctly registered on formsubmit.co)
      // Replace the email below with the exact destination email (must be registered on formsubmit.co)
      const destinationEmail = 'myuselessbin@gmail.com';
      const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(destinationEmail)}`;

      // Prepare form data
      const submitData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: 'New Message from Portfolio Website',
        _replyto: formData.email,
        _captcha: 'false',
        _template: 'table',
      };

      // Debug
      console.debug('Submitting to FormSubmit', formSubmitUrl, submitData);

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

     
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully! If you do not receive an email, ensure the destination email is registered at formsubmit.co.',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 3000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      // If CORS/preflight blocked the request or network error, give a helpful message
      console.error('Form submit error', error);
      Swal.fire({
        title: 'Failed to send',
        html: `There was a problem sending your message. Possible reasons: <ul style="text-align:left"><li>Destination email not registered on formsubmit.co</li><li>Network/CORS blocked the request</li></ul><br/>You can also send directly to <b>myuselessbin@gmail.com</b>`,
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#030014] py-8 px-[5%] sm:px-[5%] lg:px-[10%]" id="Contact">
      <div className="text-center mb-16">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg mt-6"
        >
          Like what you see? Reach out VIA EMAIL to collaborate!
        </p>
      </div>
      <div
        className="container mx-auto flex items-center justify-center"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12" >
          <div
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-500 hover:shadow-[#6366f1]/10"
          >
            <div className="mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Contact
                </h2>
                <p className="text-gray-400">
                  Got a question? Drop me a message and I'll get back to you as soon as possible.
                </p>
              </div>
            </div>

            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group min-w-0"
              >
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group min-w-0"
              >
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email or Number"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group min-w-0"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-500 hover:shadow-[#6366f1]/10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Connect with Me
                </h2>
                <p className="text-gray-400">
                </p>
              </div>
            </div>
            
            {/* Main Container Box */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-16 border border-white/20">
              {/* Email Section - Bigger Rectangle */}
              <div className="mb-8">
                <a 
                  href="mailto:krishmaheshwari111@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white/10 rounded-xl px-4 py-8 hover:bg-white/15 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/30 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Mail className="w-8 h-8 text-white transition-colors" />
                        <div>
                          <h3 className="text-white font-bold text-xl transition-colors">Email</h3>
                          <p className="text-white/80 text-sm transition-colors">krishmaheshwari111@gmail.com</p>
                        </div>
                      </div>
                      <ExternalLink className="w-6 h-6 text-white transition-colors" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Social Links Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/krish-maheshwari-2980a5319/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white/10 rounded-xl px-3 py-4 hover:bg-[#0077b5]/30 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#0077b5]/50 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#0077b5]/20 rounded-lg p-2 group-hover:bg-[#0077b5]/30 transition-all">
                        <Linkedin className="w-5 h-5 text-[#0077b5] group-hover:text-[#0077b5] transition-colors" />
                      </div>
                      <span className="text-white font-medium text-base group-hover:text-[#0077b5] transition-colors">LinkedIn</span>
                    </div>
                  </div>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/krishmaheshwari07?igsh=MThrYWl1aGtsNXE4Nw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white/10 rounded-xl px-3 py-4 hover:bg-[#E4405F]/30 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#E4405F]/50 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#E4405F]/20 rounded-lg p-2 group-hover:bg-[#E4405F]/30 transition-all">
                        <Instagram className="w-5 h-5 text-[#E4405F] group-hover:text-[#E4405F] transition-colors" />
                      </div>
                      <span className="text-white font-medium text-base group-hover:text-[#E4405F] transition-colors">Instagram</span>
                    </div>
                  </div>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/KrishMaheshwari-pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white/10 rounded-xl px-3 py-4 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#333]/50 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-300/20 rounded-lg p-2 group-hover:bg-[#333]/30 transition-all">
                        <Github className="w-5 h-5 text-[#333] group-hover:text-[#333] transition-colors" />
                      </div>
                      <span className="text-white font-medium text-base group-hover:text-[#333] transition-colors">GitHub</span>
                    </div>
                  </div>
                </a>

                {/* LeetCode */}
                <a 
                  href="https://leetcode.com/u/G1eiynMb2m/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-white/10 rounded-xl px-3 py-4 hover:bg-[#FFA116]/30 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#FFA116]/50 group">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FFA116]/20 rounded-lg p-2 group-hover:bg-[#FFA116]/30 transition-all">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" 
                          alt="LeetCode" 
                          className="w-5 h-5 object-contain group-hover:brightness-110 transition-all"
                        />
                      </div>
                      <span className="text-white font-medium text-base group-hover:text-[#FFA116] transition-colors">LeetCode</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;