function convertBigIntToString(obj: { [x: string]: any; usuario_id?: bigint; usuario?: string; nombre?: string; email?: string; fechaalt?: Date | null; fechaact?: Date | null; usuarioalt?: string | null; usuarioact?: string | null; } | null) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    for (const key in obj) {
        if (typeof obj[key] === 'bigint') {
            obj[key] = obj[key].toString();
        } else if (typeof obj[key] === 'object') {
            obj[key] = convertBigIntToString(obj[key]);
        }
    }

    return obj;
}

export default convertBigIntToString;