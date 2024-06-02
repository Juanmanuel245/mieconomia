import convertBigIntToString from '@/app/helpers/convertBigIntToString';
import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if (isNaN(take)) {
        return NextResponse.json({ message: 'Tiene que ser un número' }, { status: 400 })
    }

    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Tiene que ser un número' }, { status: 400 })
    }

    const usuarios = await prisma.usuarios.findMany({ take, skip });

    // Convertir BigInt a string en los datos de los usuarios
    const serializedUsuarios = usuarios.map(user => convertBigIntToString(user));

    return NextResponse.json({ 'usuarios': serializedUsuarios })
}

// TODO - Agregar usuario de alta
const postSchema = yup.object({
    usuario: yup.string().required(),
    nombre: yup.string().required(),
    email: yup.string().email().required(),
})

export async function POST(request: Request) {
    try {
        const { usuario, nombre, email } = await postSchema.validate(await request.json());
        const nuevoUsuario = await prisma.usuarios.create({ data: { usuario, nombre, email } })
        
        convertBigIntToString(nuevoUsuario);
        
        return NextResponse.json(nuevoUsuario)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 400 })
    }
}