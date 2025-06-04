import type { Project } from "@/lib/types/sql"

export function exportSqlMigrationCode(project: Project): string {
    const migrationCode: string[] = []
    
    migrationCode.push(`-- ${project.name}`)
    migrationCode.push(`-- Generated at: ${new Date().toISOString()}`)
    migrationCode.push('')
    
    project.tables.forEach(table => {
        migrationCode.push(`-- Table: ${table.name}`)
        if (table.desc) {
            migrationCode.push(`-- Description: ${table.desc}`)
        }
        
        const columns = table.columns.map(column => {
            const constraints: string[] = []
            let columnDef = `${column.name} ${column.sqlType}`
            
            if (column.isPK) constraints.push('PRIMARY KEY')
            if (column.isUnique) constraints.push('UNIQUE')
            if (!column.isNullable) constraints.push('NOT NULL')
            
            if (constraints.length > 0) {
                columnDef += ` ${constraints.join(' ')}`
            }
            
            return columnDef
        })
        
        migrationCode.push(`CREATE TABLE ${table.name} (`)
        migrationCode.push('\t' + columns.join(',\n\t'))
        migrationCode.push(');')
        migrationCode.push('')
    })

    project.relations.forEach(relation => {
        const sourceTable = project.tables.find(t => t.uuid === relation.sourceTableId)
        const targetTable = project.tables.find(t => t.uuid === relation.targetTableId)
        const sourceColumn = sourceTable?.columns.find(c => c.uuid === relation.sourceColumnId)
        const targetColumn = targetTable?.columns.find(c => c.uuid === relation.targetColumnId)

        if (sourceTable && targetTable && sourceColumn && targetColumn) {
            migrationCode.push(`-- Relation: ${sourceTable.name}.${sourceColumn.name} -> ${targetTable.name}.${targetColumn.name}`)
            migrationCode.push(`ALTER TABLE ${sourceTable.name}`)
            migrationCode.push(`\tADD CONSTRAINT fk_${sourceTable.name}_${sourceColumn.name}`)
            migrationCode.push(`\tFOREIGN KEY (${sourceColumn.name})`)
            migrationCode.push(`\tREFERENCES ${targetTable.name}(${targetColumn.name});`)
            migrationCode.push('')
        }
    })
    
    return migrationCode.join('\n')
} 
