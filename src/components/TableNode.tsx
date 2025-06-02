import { Table } from '@/lib/types/sql';
import { cn } from '@/lib/utils';
import { TableIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { memo } from 'react';

interface TableNodeProps {
    data: {
        table: Table;
        isSelected: boolean;
    };
}

function TableNodeComponent({ data }: TableNodeProps) {
    const { table, isSelected } = data;

    return (
        <div className={cn(
            "rounded-lg border min-w-60 w-fit bg-background",
            isSelected ? 'border-primary shadow-lg' : 'border-border'
        )}>
            <p className="flex items-center gap-x-2 px-4 py-2 border-b">
                <TableIcon size={16} /> {table.name}
            </p>
            <div className="px-4 py-2 space-y-1">
                {table.columns && table.columns.map(c => (
                    <div key={c.uuid} className="flex items-center justify-between gap-x-4">
                        <p>{c.name}</p>
                        <div className="space-x-1">
                            <Badge>{c.sqlType}</Badge>
                            {!c.isNullable && <Badge className="bg-orange-500">NOT NULL</Badge>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const TableNode = memo(TableNodeComponent)
