import React from 'react'
import { motion } from 'framer-motion';

interface HeaderProps {
    title: string;
    actions?: string;
    actionFunction?: () => void;
}

const Header: React.FC<HeaderProps> = props => {
    return (
        <header
            className="bg-zinc-100 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-zinc-300"
        >
            <div className="max-w-7x1 mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-xl font-semibold">{props.title}</h1>
                {props.actions && (
                    <motion.button
                        whileHover={{ scale: 1.025}}
                        whileTap={{ scale: 0.975 }}
                        onClick={props.actionFunction}
                        className="p-2 rounded-md bg-blue-400 text-white transition-all will-change-transform max-w-fit"
                    >
                        {props.actions}
                    </motion.button>
           
                )}
            </div>
        </header>
      )
}

export default Header