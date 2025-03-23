import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    
    // Animation variants
    const fadeIn = {
        visible: { opacity: 1 },
    };
    
    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Video Background Section */}
            <div className="relative h-screen w-full overflow-hidden">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    className="absolute inset-0 w-full h-full object-fill "
                >
                    <source src="/assets/tech-background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900/50" />


                {/* Hero Content */}
                <motion.div 
                    animate="visible"
                    variants={stagger}
                    className="relative h-full flex flex-col justify-center items-center text-center px-4"
                >
                    <motion.h1 
                        variants={fadeIn}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                    >
                        Welcome to 
                        <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent block mt-2">
                            TechNova
                        </span>
                    </motion.h1>

                    <motion.p 
                        variants={fadeIn}
                        className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                    >
                        Innovate, Elevate, and Dominate with the Future of Technology
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2"
                    >
                        Explore Now
                    </motion.button>
                </motion.div>
            </div>

            {/* Rest of your existing content */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-3 gap-8 container mx-auto px-4 py-20"
            >
                {["AI-Powered", "Ultra Secure", "Limitless Scaling"].map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-10"
                    >
                        <div className="text-green-400 text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature}</h3>
                        <p className="text-gray-300">
                            Experience cutting-edge innovation with next-gen technology tailored for success.
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-black bg-opacity-50 text-center py-20"
            >
                <h2 className="text-4xl font-bold text-white mb-6">
                    Step Into the Future
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate('/dashboard')}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-semibold"
                >
                    Get Started Today
                </motion.button>
            </motion.div>
        </div>
    );
};