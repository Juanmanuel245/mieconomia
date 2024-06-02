import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma';
import { categoria_movimientos } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getCategoria = async (id: string): Promise<categoria_movimientos | null> => {
    return await prisma.categoria_movimientos.findFirst({ where: { categoria_id: Number(id) } });
}

export async function GET(request: Request, { params }: Segments) {

    const movimiento = await getCategoria(params.id)
    convertBigIntToString(movimiento)

    if (!movimiento) return NextResponse.json({ 'message': 'No existe el todo buscado' }, { status: 404 })
    return NextResponse.json({ 'movimiento': movimiento })


}

const putSchema = yup.object({
    nombre: yup.string().required()
})

export async function PUT(request: Request, { params }: Segments) {

    const todo = getCategoria(params.id)
    if (!todo) return NextResponse.json({ 'message': 'No existe el todo buscado' }, { status: 404 })
        
    try {
        const { nombre } = await putSchema.validate( await request.json());

        const updateCategoria = await prisma.categoria_movimientos.update({
            where: { categoria_id: Number(params.id) },
            data: { nombre }
        })

        convertBigIntToString(updateCategoria)

        return NextResponse.json(updateCategoria)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
