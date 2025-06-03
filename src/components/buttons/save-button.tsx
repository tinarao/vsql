"use client";

import { saveToLocalStorage } from "@/lib/store/projects";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

export function SaveButton() {
  return (
    <Button onClick={saveToLocalStorage}>
      <Save /> Сохранить
    </Button>
  );
}
