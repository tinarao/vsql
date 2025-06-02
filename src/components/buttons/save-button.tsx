"use client";

import { Button } from "../ui/button";
import { saveToLocalStorage } from "@/lib/store";
import { Save } from "lucide-react";

export function SaveButton() {
  return (
    <Button onClick={saveToLocalStorage}>
      <Save /> Сохранить
    </Button>
  );
}
