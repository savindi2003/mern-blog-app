import React, { useState } from 'react'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    



    return (
        <div>
            <form

                className="flex items-center w-full max-w-lg p-2 space-x-2 bg-white rounded-full shadow-md"
            >
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-purple-500 rounded-full hover:bg-purple-600"
                >
                    🔍
                </button>
            </form>
        </div>
    )
}

export default SearchBar
