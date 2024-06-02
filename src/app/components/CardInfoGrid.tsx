import React from 'react'
import { CardInfo } from './CardInfo'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { GrMoney } from 'react-icons/gr'

export const CardInfoGrid = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            <CardInfo title={'Ingresos'} monto={950000} icon={<GiReceiveMoney />}  colorClasses="bg-gradient-to-tr from-green-600 to-green-400 shadow-green-500/40" />
            <CardInfo title={'Egresos'} monto={185332369} icon={<GiPayMoney />}  colorClasses="bg-gradient-to-tr from-red-600 to-red-400 shadow-red-500/40" />
        </div>
    )
}
