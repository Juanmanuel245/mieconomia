import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if( isNaN(take) ){
        return NextResponse.json({ message: 'Tiene que ser un número'}, {status: 400})
    } 

    if( isNaN(skip) ){
        return NextResponse.json({ message: 'Tiene que ser un número'}, {status: 400})
    } 

    const movimientos = await prisma.movimientos.findMany({take, skip});

    movimientos.map(movimiento => convertBigIntToString(movimiento));


    return NextResponse.json({ 'movimientos': movimientos })
}

const postSchema = yup.object({
    tipo_id: yup.number().required(),
    categoria_id: yup.number().required(),
    monto: yup.number().required(),
    cedear: yup.string(),
    monto_unidad_cedear: yup.number(),
    crypto: yup.string(),
    monto_unidad_crypto: yup.number(),
    observaciones: yup.string()
})

export async function POST(request: Request) { 

    try {
        const { tipo_id, categoria_id, monto, cedear, monto_unidad_cedear, crypto, monto_unidad_crypto, observaciones  } = await postSchema.validate(await request.json());
        const movimiento = await prisma.movimientos.create({ data: { tipo_id, categoria_id, monto, cedear, monto_unidad_cedear, crypto, monto_unidad_crypto, observaciones } })
        convertBigIntToString(movimiento)
        return NextResponse.json(movimiento)
        
    } catch (error) {
        return NextResponse.json( error, {status: 400} )
        
    }

}