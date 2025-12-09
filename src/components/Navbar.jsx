import {motion, AnimatePresence} from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Intro", href: "#hero" },
  { label: "Illusion", href: "#illusion" },
  { label: "How It Works", href: "#pipeline" },
  { label: "Timeline", href: "#timeline" },
  { label: "Actors", href: "#actors" },
  { label: "Rules", href: "#rules" },
  { label: "Impacts", href: "#impacts" },
  { label: "Change", href: "#change" },
  { label: "Sources", href: "#sources" },
];

function Navbar() {

// Toggle the Menu open/close
const [isOpen, setIsOpen] = useState(false);
const toggleMenu = () => setIsOpen(!isOpen)


  return (
    <header className="sticky top-0 z-50 bg-night/80 backdrop-blur border-b border-card-border">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Title */}
        <motion.div
         initial={{opacity:0, x:-100}}
         animate={{opacity:1, x:0}}
         transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
         }}
         className="font-display text-sm tracking-[0.2em] uppercase">
          Misleading Creativity
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-4 text-xs font-medium text-ink-muted">
            {NAV_ITEMS.map((item, index) => (
                <motion.a
                key = {item.href}
                href={item.href}
                initial={{opacity:0, y:-20}}
                animate={{opacity:1, y:0}}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.7 + index * 0.12,
                }}
                className="relative group text-ink-muted hover:text-ink transition-colors duration-300"
            >
                {item.label}
                <span
                    className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 
                            bg-gradient-to-r from-grad-blue via-grad-purple to-grad-orange
                            group-hover:w-full transition-all duration-300"
                />
            </motion.a>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
            <motion.button
                whileTap={{scale: 0.7}}
                onClick={toggleMenu} 
                className="text-gray-300">
                    {isOpen ? <FiX className="h-6 w-6"/> : <FiMenu className="h-6 w-6"/>}
                </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
        <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-nightSoft border-t border-card-border px-4 py-5 space-y-4"
        >
        <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
            <a
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="text-sm font-medium text-ink-muted hover:text-ink py-2 transition-colors duration-200"
            >
                {item.label}
            </a>
            ))}
        </nav>
        </motion.div>
    </header>
  );
}

export default Navbar;