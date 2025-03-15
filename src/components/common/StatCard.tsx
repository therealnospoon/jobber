import { motion } from 'framer-motion'

const StatCard = ({ name, icon:Icon, value, color }) => {
  return (
    <motion.div
        className='bg-zinc-50 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-zinc-100'
        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
        <div className='px-4 py-5 sm:p-6'>
            <span
                className='flex items-center text-sm font-medium text-gray-600'
            >
                <Icon 
                    size={20} 
                    className="mr-2" 
                    style={{ color }}
                />
                {name}
            </span>
            <p
                className='text-3xl font-semibold mt-1 text-gray-600'
            >
                {value}
            </p>
        </div>
    </motion.div>
  )
}

export default StatCard