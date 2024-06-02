import { Sidebar } from "../components";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <div className="p-4 xl:ml-80">
                <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
                    <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                        <div className="flex items-center">
                            <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
                                <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="3" className="h-6 w-6 text-blue-gray-500">
                                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="mt-5">
                    <div className="mb-12 grid">
                        {children}
                    </div>
                </div>

            </div>
        </div>
        // <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">

        //     <div className="flex">
        //         <Sidebar />
        //         <div className="w-full text-slate-900">
        //             {children}
        //         </div>
        //     </div>
        // </div>
    );
}

// <div className="min-h-screen bg-gray-50/50">
//   <Sidebar />
//   <div className="p-4 xl:ml-80">
//     <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
//       <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">

//         <div className="flex items-center">
//           <button className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 grid xl:hidden" type="button">
//             <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" strokeWidth="3" className="h-6 w-6 text-blue-gray-500">
//                 <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"></path>
//               </svg>
//             </span>
//           </button>
//         </div>
//       </div>
//     </nav>

//     <div className="mt-12">
//       <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
//         <CardInfo />
//       </div>
//     </div>

//   </div>
// </div>