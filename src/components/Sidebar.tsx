import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Menu, BarChart2, TableProperties, Wrench, Settings, CircleGauge } from 'lucide-react'
import { Link } from 'react-router-dom';

const SIDEBAR_ITEMS =  [
	{
		name: "Dashboard",
		icon: CircleGauge,
		color: "#6366f1",
		href: "/",
	},
	{ name: "Applications", icon: TableProperties, color: "#8B5CF6", href: "/applications" },
	{ name: "Resume Workshop", icon: Wrench, color: "#EC4899", href: "/resumeworkshop" },
	{ name: "Statistics", icon: BarChart2, color: "#10B981", href: "/statistics" },
	{ name: "Settings", icon: Settings, color: "#F59E0B", href: "/settings" }
];

const Sidebar: React.FC = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  return (
    <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSideBarOpen ? 'w-64' : 'w-16'}`}
        animate={{ width: isSideBarOpen ? 256 : 80}} 
    >
        <div className="h-full bg-zinc-100 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-zinc-200">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="p-2 rounded-full hover:bg-zinc-200 transition-colors max-w-fit"
            >
                <Menu size={24} />
            </motion.button>

            <nav className="mt-8 flex-grow">
                {SIDEBAR_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                    >
                        <motion.div
                            className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors mb-2'
                        >
                            <item.icon size={20} style={{ color: item.color, minWidth: "20px"}} />

                            <AnimatePresence>
                                {isSideBarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2, delay: 0.3 }}
                                        className="ml-4 whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Link>
                ))}

            </nav>
        </div>
    </motion.div>
  )
}

export default Sidebar