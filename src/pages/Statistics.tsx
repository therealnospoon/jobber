//packages
import React from 'react'
import { motion } from 'framer-motion'

//components
import Header from '../components/common/Header'
import StatCard from '../components/common/StatCard'

//icons
import { BarChart2 } from 'lucide-react'
import CompanyDistributionChart from '../components/dashboard/CompanyDistributionChart'
import SalesChannelChart from '../components/dashboard/SalesChannelChart'
import SalesOverviewChart from '../components/dashboard/SalesOverviewChart'

//Datapoints to display here:
// 1. Names of companies I've applied to
// 2. Locations of companies I've applied to
// 3. Sizes of companies I've applied to
// 4. Companies that have responded to my applications
// 5. Companies that have rejected my applications
// 6. Companies that have given me an interview
// 7. Companies that have given me an offer
// 8. Companies that have ghosted me
// 9. Companies that have given me feedback
// 10. Companies that have not given me feedback
// 11. Speed of responses from companies (in days)
// 12. Average time taken to get an interview after applying (in days)
// 13. Average time taken to get an offer after applying (in days)
// 14. Average time taken to get rejected after applying (in days)
// 15. Most type of rejections (e.g. no response, generic rejection, etc.)
// 16. Most common rejection reasons (e.g. lack of experience, skills, etc.)
// 17. Most common interview feedback (e.g. good communication, lack of skills, etc.)

//Stat Cards for statistics page:
// 1. Total jobs applied to
// 2. Application rate (per day)
// 3. Rejection rate (per 5 application)
// 4. Interview rate (per 5 application)
// 5. Application to Offer rate (per application)
// 6. Ghosted rate (per application)

const Statistics:React.FC = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
        <Header title="Statistics" />

        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

            <motion.div
                className='grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >

                <StatCard name="Total Jobs Applied" icon={BarChart2} value="50" color='#6366F1' />
                <StatCard name="Application Rate" icon={BarChart2} value="2.5/day" color='#6366F1'/>
                <StatCard name="Rejection Rate" icon={BarChart2} value="1/5" color='#6366F1'/>
                <StatCard name="Interview Rate" icon={BarChart2} value="1/5" color='#6366F1'/>
                <StatCard name="Application to Offer Rate" icon={BarChart2} value="1/10" color='#6366F1' />
                <StatCard name="Ghosted Rate" icon={BarChart2} value="2/10" color='#6366F1'/>

            </motion.div>

            <CompanyDistributionChart />
            <SalesChannelChart />
            <SalesOverviewChart />

        <ol>
            <li>1. See relevant statics related to job search</li>
        </ol>
        </main>
    </div>
  )
}

export default Statistics;