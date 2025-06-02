"use client"

import { SQLType, Column, SQL_TYPES, Table } from "@/lib/types/sql";
import React, { useCallback } from "react";
import { Dialog,  DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";

interface ColumnEditorProps {
    children: React.ReactNode
    column: Table['columns'][0];
    index: number;
    onUpdate: (index: number, column: Table['columns'][0]) => void;
    onClose?: () => void;
}

export function ColumnEditorModal({ children, column, index, onUpdate, onClose }: ColumnEditorProps) {

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(index, { ...column, name: e.target.value });
    }, [column, index, onUpdate]);

    const handleTypeChange = useCallback((value: SQLType) => {
        onUpdate(index, { ...column, sqlType: value });
    }, [column, index, onUpdate]);

    const handleBooleanChange = useCallback((field: keyof Pick<Column, 'isUnique' | 'isNullable' | 'isPK' | 'isFK'>) => (checked: boolean) => {
        onUpdate(index, { ...column, [field]: checked });
    }, [column, index, onUpdate]);

    return (
        <Dialog onOpenChange={onClose}>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Редактирование колонки</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="column-name">Название колонки</Label>
                        <Input
                            id="column-name"
                            value={column.name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="column-type">Тип данных</Label>
                        <Select
                            value={column.sqlType}
                            onValueChange={handleTypeChange}
                        >
                            <SelectTrigger id="column-type">
                                <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                                {SQL_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="is-pk">Первичный ключ</Label>
                            <Switch
                                id="is-pk"
                                checked={column.isPK}
                                onCheckedChange={handleBooleanChange('isPK')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="is-fk">Внешний ключ</Label>
                            <Switch
                                id="is-fk"
                                checked={column.isFK}
                                onCheckedChange={handleBooleanChange('isFK')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="is-unique">Unique</Label>
                            <Switch
                                id="is-unique"
                                checked={column.isUnique}
                                onCheckedChange={handleBooleanChange('isUnique')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="is-nullable">Nullable</Label>
                            <Switch
                                id="is-nullable"
                                checked={column.isNullable}
                                onCheckedChange={handleBooleanChange('isNullable')}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

}