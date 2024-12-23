import SearchButton from "components/Button/SearchButton"
import Dropdown from "components/Input/Dropdown"
import { useState } from "react"
import { EmptyString } from "utils/Constant"

export default function Room(){
    const [roomNumber, setRoomNumber] = useState(EmptyString)
    const [floorLevel, setFloorLevel] = useState(EmptyString)
    const [roomType, setRoomType] = useState(EmptyString)
    const [status, setStatus] = useState(EmptyString)

    // Dropdown Options
    const [floorLevelOptions, setFloorLevelOptions] = useState([])
    const [roomTypeOptions, setRoomTypeOptions] = useState([])
    const [statusOptions, setStatusOptions] = useState([])

    // Function
    function fSearchBtnClick(){

    }

    function fEnterKeyDown(){

    }

    return(
        <div className="flex flex-col gap-2">
            <div>
                <div>
                    <span className="font-semibold text-2xl">Room</span>
                </div>
                <hr />
            </div>

            <div className="flex gap-5 justify-between mt-5">
                <div className="flex gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <span>Room Number</span>
                        <input className="input" value={ roomNumber } onChange={(e) => { setRoomNumber(e.target.value) }} onKeyDown={(e) => { fEnterKeyDown(e) }} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span>Floor Level</span>
                        <input className="input" value={ floorLevel } onChange={(e) => { setFloorLevel(e.target.value) }} onKeyDown={(e) => { fEnterKeyDown(e) }} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span>Room Type</span>
                        <Dropdown options={ roomTypeOptions } value={ roomType } onChange={(e) => { setRoomType(e.value) }} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <span>Status</span>
                        <Dropdown options={ statusOptions } value={ status } onChange={(e) => { setStatus(e.value) }} />
                    </div>
                </div>
                <div>
                    <div className="flex items-end h-full">
                        <SearchButton onClick={() => { fSearchBtnClick() }} />
                    </div>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-5">
                <button className="border hover:border-4 transition-all rounded-md p-4 w-72">
                    <div className="">
                        <span className="font-semibold">101</span>
                    </div>
                    <hr className="py-2" />

                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center">
                            <div className="w-24 text-left">
                                <span>Tenant Name</span>
                            </div>
                            <div className="px-2">
                                <span>:</span>
                            </div>
                            <div>
                                <span>John</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-24 text-left">
                                <span>Room Type</span>
                            </div>
                            <div className="px-2">
                                <span>:</span>
                            </div>
                            <div>
                                <span>Type A</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-24 text-left">
                                <span>Status</span>
                            </div>
                            <div className="px-2">
                                <span>:</span>
                            </div>
                            <div>
                                <span>Occupied</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-24 text-left">
                                <span>Check In</span>
                            </div>
                            <div className="px-2">
                                <span>:</span>
                            </div>
                            <div>
                                <span>12 Dec 2024</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-24 text-left">
                                <span>Check out</span>
                            </div>
                            <div className="px-2">
                                <span>:</span>
                            </div>
                            <div>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
            
        </div>
    )
}