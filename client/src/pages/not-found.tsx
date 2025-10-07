import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-lg text-muted-foreground">Страница не найдена</p>
        </div>
        <Link href="/">
          <Button data-testid="button-home">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
}
