import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma';
import { facturas } from '@prisma/client';
import { NextResponse } from 'next/server'

interface Segments {
    params: {
        id: string;
    }
}

const getFactura = async (id: string): Promise<facturas | null> => {
    return await prisma.facturas.findFirst({ where: { factura_id: Number(id) } });
}

export async function GET(request: Request, { params }: Segments) {

    const factura = await getFactura(params.id)

    if (!factura) return NextResponse.json({ 'message': 'No existe la factura buscado' }, { status: 404 })
    convertBigIntToString(factura)
    return NextResponse.json({ 'factura': factura })


}
