export default function PageLoading() {
    return (
    <>
        <div className="flex flex-row bg-black bg-opacity-90 min-h-screen">
            <aside className="fixed top-0 left-0 z-40 w-80 h-screen">
                <div className="h-full px-3 py-4 bg-zinc-800">
                    <div className="flex flex-row align-middle animate-pulse">
                        <div className="rounded-3xl w-12 h-12 my-3 bg-gray-400" />
                        <div className="flex flex-col align-middle p-2">
                            <h3 className="text-white text-xl font-bold">SDQ Bina Mulya</h3>
                            <p className="text-gray-500">Aplikasi SPP</p>
                        </div>
                    </div>
                    <ul className="space-y-4 my-5 animate-pulse">
                        <li>
                            <span class="bg-gray-600 flex py-7 rounded-lg"></span>
                        </li>
                        <li>
                            <span class="bg-gray-600 flex py-7 rounded-lg"></span>
                        </li>
                        <li>
                            <span class="bg-gray-600 flex py-7 rounded-lg"></span>
                        </li>
                        <li>
                            <span class="bg-gray-600 flex py-7 rounded-lg"></span>
                        </li>
                        <li> 
                            <span class="bg-gray-600 flex py-7 rounded-lg"></span>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-80 text-gray-200 flex flex-col w-full gap-5">
                <div className="flex h-14 my-1 bg-gray-400 rounded-md animate-pulse"/>
                <div className="flex h-12 bg-zinc-700 rounded-md animate-pulse"/>
                <div className="flex h-96 bg-zinc-700 rounded-md animate-pulse"/>
            </div>
        </div>
    </>
    )
    
}