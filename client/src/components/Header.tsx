import { Scale } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <Scale className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Legality</h1>
            <p className="text-sm text-gray-600">Know what you're signing</p>
          </div>
        </div>
      </div>
    </header>
  );
}
