export type Table = {
    uuid: string
    name: string
    desc?: string
    rows: Row[]
    createdAt: string
    lastUpdatedAt: string
}

export type Row = {
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
