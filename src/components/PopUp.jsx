export default function PopUp(props) {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-70 z-50">
            <div className="bg-zinc-800 max-w-screen sm:min-w-96 min-w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow shadow-black p-2">
                <div className="w-full flex flex-row p-5 justify-between"> 
                    <h1 className="text-xl mr-5">{props.title}</h1>
                    <button onClick={props.onClose} type="button">Close</button>
                </div>
                <div className="relative p-2 min-h-96 max-h-[720px] max-w-screen overflow-x-scroll overflow-y-scroll bg-zinc-800">
                    { props.children }
                </div>
            </div>
        </div>
    )
}