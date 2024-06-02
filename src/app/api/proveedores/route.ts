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

    const proveedores = await prisma.proveedores.findMany({take, skip});
    proveedores.map(proveedor => convertBigIntToString(proveedor));

    return NextResponse.json({ 'proveedores': proveedores })
}

const postSchema = yup.object({
    proveedor: yup.string().required(),
    observaciones: yup.string(),
})

export async function POST(request: Request) { 

    try {
        const { proveedor, observaciones } = await postSchema.validate(await request.json());
        const newProveedor = await prisma.proveedores.create({ data: { proveedor, observaciones } })
        convertBigIntToString(newProveedor)
        return NextResponse.json(newProveedor)
        
    } catch (error) {
        return NextResponse.json( error, {status: 400} )
        
    }

}