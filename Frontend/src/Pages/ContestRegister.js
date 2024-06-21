import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnglesRight,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
const ContestRegister = () => {
    const [formData, setFromData] = React.useState(
        {
            state: "",
            team: ""
        }
    )
    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setFromData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    return (
        <div className='text-white flex justify-center'>
            <div >
                <div className='mb-4 flex justify-center'>
                    Registeration for
                    "Contest Name"
                </div>
                <div className='grid grid-cols-4 gap-6 mb-4'>
                    <div className='col-span-2 ml-auto'>Notice: </div>
                    <div className='col-span-2'>Official contest</div>
                </div>
                <form>
                    <div className='grid grid-cols-4 gap-6 mb-4'>
                        <div className='col-span-2 ml-auto'>Take part:</div>
                        <div className='col-span-2'>
                            <div>
                                <input
                                    type="radio"
                                    id="individual"
                                    name="state"
                                    value="individual"
                                    checked={FormData.state === "individual"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="individual"> as individual participant</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="team"
                                    name="state"
                                    value="team"
                                    checked={FormData.state === "team"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="team"> as a team member</label>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-6 mb-4'>
                        <div className='col-span-2 ml-auto'>
                            <label htmlFor='team' >Choose team:</label>
                        </div>
                        <div
                            className='col-span-2'
                        >
                            <select
                                id="team"
                                value={formData.team}
                                onChange={handleChange}
                                name="team"
                            >
                                <option value="team1">team 1</option>
                                <option value="team2">team 2</option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-[#B02A24] font-semibold mx-auto h-8 w-48 px-3 py-1.5 rounded-md text-sm flex justify-center items-center">
                        <p className="mr-1.5 -mt-0.5">Register Now</p>
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContestRegister
