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

    const facturas = await prisma.facturas.findMany({take, skip});
    facturas.map(factura => convertBigIntToString(factura));

    return NextResponse.json({ 'facturas': facturas })
}

const postSchema = yup.object({
    proveedor_id: yup.number().required(),
    link: yup.string(),
    monto: yup.number().required(),
    vencimiento: yup.date().required(),
    pagado: yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 

    try {
        const { proveedor_id, link, monto, vencimiento, pagado } = await postSchema.validate(await request.json());
        const factura = await prisma.facturas.create({ data: { proveedor_id, link, monto, vencimiento, pagado } })
        convertBigIntToString(factura)
        return NextResponse.json(factura)
        
    } catch (error) {
        return NextResponse.json( error, {status: 400} )
        
    }

}