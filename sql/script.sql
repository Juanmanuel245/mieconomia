CREATE TABLE usuarios (
    usuario_id BIGSERIAL PRIMARY KEY,
    usuario VARCHAR (100) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    fechaalt TIMESTAMP DEFAULT now(),
    fechaact TIMESTAMP,
    usuarioalt VARCHAR (100),
    usuarioact VARCHAR (100)
);

CREATE TABLE tipo_movimientos (
    tipo_id BIGSERIAL PRIMARY KEY,
    tipo VARCHAR (100) NOT NULL
);

CREATE TABLE categoria_movimientos (
    categoria_id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR (100) NOT NULL
);

CREATE TABLE proveedores (
    proveedor_id BIGSERIAL PRIMARY KEY,
    proveedor VARCHAR (100) NOT NULL,
    observaciones VARCHAR (300)
);

CREATE TABLE movimientos (
    movimiento_id BIGSERIAL PRIMARY KEY,
    tipo_id BIGINT REFERENCES tipo_movimientos(tipo_id),
    categoria_id BIGINT REFERENCES categoria_movimientos(categoria_id),
    monto DECIMAL,
    cedear VARCHAR (50),
    monto_unidad_cedear DECIMAL,
    crypto VARCHAR (10),
    monto_unidad_crypto DECIMAL,
    observaciones  VARCHAR (500),
    fechaalt TIMESTAMP DEFAULT now(),
    fechaact TIMESTAMP,
    usuarioalt VARCHAR,
    usuarioact VARCHAR
);

CREATE TABLE facturas (
    factura_id BIGSERIAL PRIMARY KEY,
    proveedor_id BIGINT REFERENCES proveedores(proveedor_id),
    link VARCHAR,
    monto DECIMAL,
    vencimiento TIMESTAMP,
    pagado BOOLEAN DEFAULT false,
    fechaalt TIMESTAMP DEFAULT now(),
    fechaact TIMESTAMP,
    usuarioalt VARCHAR (100),
    usuarioact VARCHAR (100)
);

CREATE TABLE checklist (
    checklist_id BIGSERIAL PRIMARY KEY,
    mensaje VARCHAR NOT NULL,
    completado BOOLEAN DEFAULT false,
    vencimiento TIMESTAMP,
    fechaalt TIMESTAMP DEFAULT now(),
    fechaact TIMESTAMP,
    usuarioalt VARCHAR (100),
    usuarioact VARCHAR (500)
);
