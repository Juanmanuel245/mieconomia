import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma';
import { movimientos } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getMovimiento = async (id: string): Promise<movimientos | null> => {
    return await prisma.movimientos.findFirst({ where: { movimiento_id: Number(id) } });
}

export async function GET(request: Request, { params }: Segments) {

    const movimiento = await getMovimiento(params.id)

    if (!movimiento) return NextResponse.json({ 'message': 'No existe el movimiento buscado' }, { status: 404 })

    convertBigIntToString(movimiento)
    return NextResponse.json({ 'movimiento': movimiento })


}