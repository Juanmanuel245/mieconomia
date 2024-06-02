import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
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

    const categorias = await prisma.categoria_movimientos.findMany({take, skip});

    categorias.map(categoria => convertBigIntToString(categoria));

    return NextResponse.json({ 'categorias': categorias })
}

const postSchema = yup.object({
    nombre: yup.string().required(),
})

export async function POST(request: Request) { 

    try {
        const { nombre } = await postSchema.validate(await request.json());
        const categoria = await prisma.categoria_movimientos.create({ data: { nombre } })
        convertBigIntToString(categoria)
        return NextResponse.json(categoria)
        
    } catch (error) {
        return NextResponse.json( error, {status: 400} )
        
    }

}