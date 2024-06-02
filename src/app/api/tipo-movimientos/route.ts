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

    const tipos = await prisma.tipo_movimientos.findMany({take, skip});

    // Convertir BigInt a string en los datos de los usuarios
    const serializedUsuarios = tipos.map(tipo => convertBigIntToString(tipo));

    return NextResponse.json({ 'tipos': tipos })
}

const postSchema = yup.object({
    tipo: yup.string().required()
})

export async function POST(request: Request) { 

    try {
        const { tipo } = await postSchema.validate(await request.json());
        const newTipo = await prisma.tipo_movimientos.create({ data: { tipo } })
        convertBigIntToString(newTipo);
        return NextResponse.json(newTipo)
        
    } catch (error) {
        return NextResponse.json( error, {status: 400} )
        
    }

}