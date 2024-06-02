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

    const itemsChecklist = await prisma.checklist.findMany({take, skip});
    itemsChecklist.map(item => convertBigIntToString(item));

    return NextResponse.json({ 'itemsChecklist': itemsChecklist })
}

const postSchema = yup.object({
    mensaje: yup.string().required(),
    vencimiento: yup.date(),
    completado: yup.boolean().default(false),
})

export async function POST(request: Request) { 

    try {
        const { mensaje, vencimiento } = await postSchema.validate(await request.json());
        const itemList = await prisma.checklist.create({ data: { mensaje, vencimiento } })
        convertBigIntToString(itemList)
        return NextResponse.json(itemList)
        
    } catch (error) {
        return NextResponse.json( error, {status: 400} )
        
    }

}