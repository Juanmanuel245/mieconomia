import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma';
import { proveedores } from '@prisma/client';
import { NextResponse } from 'next/server'

interface Segments {
    params: {
        id: string;
    }
}

const getProveedor = async (id: string): Promise<proveedores | null> => {
    return await prisma.proveedores.findFirst({ where: { proveedor_id: Number(id) } });
}

export async function GET(request: Request, { params }: Segments) {

    const proveedor = await getProveedor(params.id)

    if (!proveedor) return NextResponse.json({ 'message': 'No existe el proveedor buscado' }, { status: 404 })
    convertBigIntToString(proveedor)
    return NextResponse.json({ 'proveedor': proveedor })


}
