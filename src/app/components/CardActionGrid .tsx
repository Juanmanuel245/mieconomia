import React from 'react'
import { GiReceiveMoney } from 'react-icons/gi'
import { CardAction } from './CardAction'

export const CardActionGrid = () => {
    return (
        <div className="grid grid-cols-1 mt-20">
            <CardAction title={"Nuevo ingreso"} colorClasses={"bg-gradient-to-r from-emerald-400 to-cyan-400"} />
            <CardAction title={"Nuevo egreso"} colorClasses={"bg-gradient-to-r from-rose-400 to-red-500"} />
        </div>
    )
}
