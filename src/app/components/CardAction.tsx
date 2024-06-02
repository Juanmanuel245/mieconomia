
interface Props {
    title: string;
    colorClasses: string;
}

export const CardAction = ({ title, colorClasses }: Props) => {
    return (
        <div className={`${colorClasses} shadow-md rounded-xl flex-col flex relative p-4 text-white text-center mb-10`}>
            {title}
        </div>
    )
}
