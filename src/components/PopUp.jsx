export default function PopUp(props) {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50">
            <div className="bg-zinc-800 w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow shadow-black">
                <div className="p-2">
                    Title
                    {/* Close */}
                </div>
                <div className="p-2">

                </div>
            </div>
        </div>
    )
}