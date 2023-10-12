export default function PopUp(props) {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50">
            <div className="bg-zinc-800 max-w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow shadow-black">
                <div className="w-full flex flex-row p-5 justify-between"> 
                    <h1 className="text-xl">{props.title}</h1>
                    <button onClick={props.onClose} type="button">Close</button>
                </div>
                <div className="relative p-2 h-96 overflow-x-scroll overflow-y-scroll">
                    { props.children }
                </div>
            </div>
        </div>
    )
}