import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma';
import { checklist } from '@prisma/client';
import { NextResponse } from 'next/server'
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getItemList = async (id: string): Promise<checklist | null> => {
    return await prisma.checklist.findFirst({ where: { checklist_id: Number(id) } });
}

const putSchema = yup.object({
    completado: yup.boolean().optional(),
})

export async function PUT(request: Request, { params }: Segments) {

    const itemChecklist = getItemList(params.id)
    if (!itemChecklist) return NextResponse.json({ 'message': 'No existe el item buscado' }, { status: 404 })
        
    try {
        const { completado } = await putSchema.validate( await request.json());

        const updateItemChecklist = await prisma.checklist.update({
            where: { checklist_id: Number(params.id) },
            data: { completado }
        })
        convertBigIntToString(updateItemChecklist)
        return NextResponse.json(updateItemChecklist)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }







}
