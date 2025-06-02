import { Table } from '@/lib/types/sql';
import { cn } from '@/lib/utils';
import { TableIcon } from 'lucide-react';
import { Handle, Position } from 'reactflow';

interface TableNodeProps {
    data: {
        table: Table;
        isSelected: boolean;
    };
}

export function TableNode({ data }: TableNodeProps) {
    const { table, isSelected } = data;

    return (
        <div className={cn(
            "rounded-lg border",
            isSelected ? 'border-primary shadow-lg' : 'border-border'
        )}>
            <p className="flex items-center gap-x-2 px-4 py-2 border-b">
                <TableIcon size={16} /> {table.name}
            </p>
            <div className="space-y-1">
                {table.columns && table.columns.map(c => (
                    <div key={c.uuid}>{c.name}</div>
                ))}
            </div>
        </div>
    );
} 
