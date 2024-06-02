import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma';
import { tipo_movimientos } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getTipoMovimiento = async (id: string): Promise<tipo_movimientos | null> => {
    return await prisma.tipo_movimientos.findFirst({ where: { tipo_id: Number(id) } });
}

export async function GET(request: Request, { params }: Segments) {

    const tipoMovimiento = await getTipoMovimiento(params.id)
    convertBigIntToString(tipoMovimiento);

    if (!tipoMovimiento) return NextResponse.json({ 'message': 'No existe el tipo de movimiento buscado' }, { status: 404 })
    return NextResponse.json({ 'todos': tipoMovimiento })

}

const putSchema = yup.object({
    tipo: yup.string().required()
})

export async function PUT(request: Request, { params }: Segments) {

    const tipoMovimiento = getTipoMovimiento(params.id)
    if (!tipoMovimiento) return NextResponse.json({ 'message': 'No existe el todo buscado' }, { status: 404 })
        
    try {
        const { tipo } = await putSchema.validate( await request.json());

        const updateTipoMovimiento = await prisma.tipo_movimientos.update({
            where: { tipo_id: Number(params.id) },
            data: { tipo }
        })

        convertBigIntToString(updateTipoMovimiento);
        
        return NextResponse.json(updateTipoMovimiento)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }







}
