
interface Props {
    title: string;
    monto: number;
    icon: React.ReactNode;
    colorClasses: string;
}

export const CardInfo = ({ title, monto, icon, colorClasses }: Props) => {
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-100">
            <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden ${colorClasses} text-white shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`}>
                {icon}
            </div>
            <div className="p-4 text-right mt-4">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{title}</p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$ {monto}</h4>
            </div>
        </div>
    )
}
