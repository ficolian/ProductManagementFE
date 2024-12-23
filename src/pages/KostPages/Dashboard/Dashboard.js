

export default function Dashboard(){
    return(
        <div className="flex flex-col gap-2">
            <div>
                <span className="font-semibold text-2xl">Dashboard</span>
            </div>
            <hr />

            <div className="border rounded p-4">
                <div>
                    <span className="font-semibold">Summary</span>
                </div>
                <hr />

                <div className="flex flex-wrap mt-4 gap-4">
                    <div className="border rounded p-2 w-56 h-12 bg-white flex items-center justify-between">
                        <span>Total Room</span>
                        <span>32</span>
                    </div>

                    <div className="border rounded p-2 w-56 h-12 bg-white flex items-center justify-between">
                        <span>Room Available</span>
                    </div>

                    <div className="border rounded p-2 w-56 h-12 bg-white flex items-center justify-between">
                        <span>Room Occupied</span>
                    </div>

                    <div className="border rounded p-2 w-56 h-12 bg-white flex items-center justify-between">
                        <span>Room Booked</span>
                    </div>
                </div>

            </div>
        </div>
    )
}