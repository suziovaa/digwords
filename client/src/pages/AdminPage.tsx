import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || `Успешно загружено ${data.count} терминов`,
        });
        toast({
          title: "Успешно!",
          description: data.message || `Загружено ${data.count} терминов`,
        });
        setFile(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setResult({
          success: false,
          message: data.error || "Не удалось загрузить файл",
        });
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось загрузить файл",
          variant: "destructive",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Ошибка при загрузке файла",
      });
      toast({
        title: "Ошибка",
        description: "Ошибка при загрузке файла",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Административная панель
          </h1>
          <p className="text-muted-foreground">
            Загрузка данных словаря из Excel файла
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Загрузка Excel файла
            </CardTitle>
            <CardDescription>
              Выберите файл Excel с терминами для загрузки в базу данных.
              <br />
              <strong className="text-destructive">Внимание:</strong> Это удалит все существующие термины и заменит их новыми.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="excel-file" className="text-sm font-medium">
                Выберите файл
              </label>
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                disabled={uploading}
                data-testid="input-excel-file"
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  Выбран файл: <span className="font-medium">{file.name}</span>
                </p>
              )}
            </div>

            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
              size="lg"
              data-testid="button-upload-excel"
            >
              {uploading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить файл
                </>
              )}
            </Button>

            {result && (
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  result.success
                    ? "bg-green-500/10 text-green-700 dark:text-green-400"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">
                    {result.success ? "Успешно!" : "Ошибка"}
                  </p>
                  <p className="text-sm opacity-90">{result.message}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Формат файла</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Excel файл должен содержать следующие столбцы:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Раздел</strong> или <strong>Section</strong></li>
              <li><strong>Термин</strong> или <strong>Term</strong></li>
              <li><strong>Определение</strong> или <strong>Definition</strong></li>
              <li><strong>Пример употребления</strong> или <strong>Usage Example</strong> (необязательно)</li>
              <li><strong>Английский эквивалент</strong> или <strong>English Equivalent</strong> (необязательно)</li>
              <li><strong>Смежные термины</strong> или <strong>Related Terms</strong> (необязательно, через запятую)</li>
              <li><strong>Источник</strong> или <strong>Source</strong> (необязательно)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
