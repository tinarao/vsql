export type Relation = {
    uuid: string;
    sourceTableId: string;
    sourceColumnId: string;
    targetTableId: string;
    targetColumnId: string;
    type: 'ONE_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_MANY';
}

export type Project = {
    uuid: string
    name: string
    tables: Table[]
    relations: Relation[]
    createdAt: string
}

export type Table = {
    uuid: string
    name: string
    desc?: string
    columns: Column[]
    createdAt: string
    lastUpdatedAt: string
    position?: { x: number; y: number }
}

export type Column = {
    uuid: string
    name: string
    sqlType: SQLType
    isUnique: boolean
    isNullable: boolean
    isPK: boolean
    isFK: boolean
}


// llm generated, looks gucci for now
// triple attention to it
export type SQLType =
    // Числовые типы
    | 'SMALLINT'
    | 'INTEGER'
    | 'BIGINT'
    | 'DECIMAL'
    | 'NUMERIC'
    | 'REAL'
    | 'DOUBLE PRECISION'
    | 'SERIAL'
    | 'BIGSERIAL'

    // Символьные типы
    | 'CHARACTER VARYING'
    | 'VARCHAR'
    | 'CHARACTER'
    | 'CHAR'
    | 'TEXT'

    // Бинарные типы
    | 'BYTEA'

    // Дата и время
    | 'TIMESTAMP'
    | 'TIMESTAMP WITH TIME ZONE'
    | 'DATE'
    | 'TIME'
    | 'TIME WITH TIME ZONE'
    | 'INTERVAL'

    // Булев тип
    | 'BOOLEAN'

    // Геометрические типы
    | 'POINT'
    | 'LINE'
    | 'LSEG'
    | 'BOX'
    | 'PATH'
    | 'POLYGON'
    | 'CIRCLE'

    // Сетевые типы
    | 'CIDR'
    | 'INET'
    | 'MACADDR'
    | 'MACADDR8'

    // Массивы
    | 'ARRAY'

    // JSON типы
    | 'JSON'
    | 'JSONB'

    // UUID
    | 'UUID'

    // Денежный тип
    | 'MONEY'

    // XML
    | 'XML'

    // Перечисления
    | 'ENUM';

export const SQL_TYPES: { label: string; value: SQLType }[] = [
    // Числовые типы
    { label: 'SMALLINT', value: 'SMALLINT' },
    { label: 'INTEGER', value: 'INTEGER' },
    { label: 'BIGINT', value: 'BIGINT' },
    { label: 'DECIMAL', value: 'DECIMAL' },
    { label: 'NUMERIC', value: 'NUMERIC' },
    { label: 'REAL', value: 'REAL' },
    { label: 'DOUBLE PRECISION', value: 'DOUBLE PRECISION' },
    { label: 'SERIAL', value: 'SERIAL' },
    { label: 'BIGSERIAL', value: 'BIGSERIAL' },

    // Символьные типы
    { label: 'VARCHAR', value: 'VARCHAR' },
    { label: 'CHAR', value: 'CHAR' },
    { label: 'TEXT', value: 'TEXT' },

    // Дата и время
    { label: 'TIMESTAMP', value: 'TIMESTAMP' },
    { label: 'DATE', value: 'DATE' },
    { label: 'TIME', value: 'TIME' },

    // Булев тип
    { label: 'BOOLEAN', value: 'BOOLEAN' },

    // JSON типы
    { label: 'JSON', value: 'JSON' },
    { label: 'JSONB', value: 'JSONB' },

    // UUID
    { label: 'UUID', value: 'UUID' },
];
