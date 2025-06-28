
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <div className="bg-gradient-to-br from-[#e0f7fa] to-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block px-4 py-1 text-sm font-semibold text-[#00796B] bg-[#E0F2F1] rounded-full shadow-sm">
                    Your Future Starts Here
                </span>

                <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0D47A1]">
                    Find, Apply &<br />
                    Land Your <span className="text-[#00ACC1]">Dream Job</span>
                </h1>

                <p className="mt-4 text-gray-700 text-base md:text-lg">
                    Explore thousands of listings across industries. Your next opportunity is just a search away.
                </p>

                {/* <div className="mt-8 flex items-center justify-center max-w-xl mx-auto shadow-lg border border-gray-200 rounded-full overflow-hidden bg-white">
                    <input
                        type="text"
                        placeholder="Search by job title, skill, or company..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-6 py-3 text-sm outline-none bg-transparent"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-none rounded-r-full h-full bg-[#00B8D4] hover:bg-[#0097A7]"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default HeroSection


