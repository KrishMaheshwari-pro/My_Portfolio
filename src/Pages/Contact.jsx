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
      // Ganti dengan email Anda di FormSubmit
      const formSubmitUrl = 'https://formsubmit.co/myuselessbin@gmail.com';
      
      // Siapkan data form untuk FormSubmit
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'New Message from Portfolio Website');
      submitData.append('_captcha', 'false'); // Nonaktifkan captcha
      submitData.append('_template', 'table'); // Format email sebagai tabel

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully!',
          icon: 'success',
          confirmButtonColor: '#6366f1',
          timer: 2000,
          timerProgressBar: true
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#6366f1'
        });
      }
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
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
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
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
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
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
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
                className="relative group"
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
            {/* Email Section - Bigger Rectangle */}
            <div className="mb-8">
              <a 
                href="mailto:krishmaheshwari111@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Mail className="w-8 h-8 text-white" />
                      <div>
                        <h3 className="text-white font-bold text-xl">Email</h3>
                        <p className="text-white/80 text-sm">krishmaheshwari111@gmail.com</p>
                      </div>
                    </div>
                    <ExternalLink className="w-6 h-6 text-white" />
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
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#6366f1]/30">
                  <div className="flex items-center gap-4">
                    <Linkedin className="w-8 h-8 text-[#0077b5]" />
                    <span className="text-white font-medium text-lg">LinkedIn</span>
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
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#6366f1]/30">
                  <div className="flex items-center gap-4">
                    <Instagram className="w-8 h-8 text-[#E4405F]" />
                    <span className="text-white font-medium text-lg">Instagram</span>
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
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#6366f1]/30">
                  <div className="flex items-center gap-4">
                    <Github className="w-8 h-8 text-white" />
                    <span className="text-white font-medium text-lg">GitHub</span>
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
                <div className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-[#6366f1]/30">
                  <div className="flex items-center gap-4">
                                         {/* LeetCode Logo */}
                     <img 
                       src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" 
                       alt="LeetCode" 
                       className="w-8 h-8 object-contain"
                     />
                    <span className="text-white font-medium text-lg">LeetCode</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;