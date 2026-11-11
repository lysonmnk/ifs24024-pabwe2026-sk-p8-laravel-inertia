<?php

namespace App\Features\Post\Services;

use App\Features\Post\Enums\PostCategory;
use App\Features\Post\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PostExcelService
{
    public function export(Collection $posts, string $filename = 'articles.xlsx'): StreamedResponse
    {
        $spreadsheet = new Spreadsheet;
        $sheet = $spreadsheet->getActiveSheet();

        // Header row
        $headers = [
            'A1' => 'ID',
            'B1' => 'Penulis',
            'C1' => 'Judul',
            'D1' => 'Slug',
            'E1' => 'Kategori',
            'F1' => 'Excerpt',
            'G1' => 'Konten',
            'H1' => 'Status',
            'I1' => 'Waktu Terbit',
            'J1' => 'Waktu Dibuat',
            'K1' => 'Waktu Diperbarui',
        ];

        foreach ($headers as $cell => $value) {
            $sheet->setCellValue($cell, $value);
        }

        $row = 2;
        foreach ($posts as $post) {
            $sheet->setCellValue("A{$row}", $post->id);
            $sheet->setCellValue("B{$row}", $post->user ? $post->user->name : '-');
            $sheet->setCellValue("C{$row}", $post->title);
            $sheet->setCellValue("D{$row}", $post->slug);
            $sheet->setCellValue("E{$row}", $post->category instanceof PostCategory ? $post->category->value : $post->category);
            $sheet->setCellValue("F{$row}", $post->excerpt ?? '');
            $sheet->setCellValue("G{$row}", $post->content);
            $sheet->setCellValue("H{$row}", $post->is_published ? 'Published' : 'Draft');
            $sheet->setCellValue("I{$row}", $post->published_at ? $post->published_at->toDateTimeString() : '');
            $sheet->setCellValue("J{$row}", $post->created_at ? $post->created_at->toDateTimeString() : '');
            $sheet->setCellValue("K{$row}", $post->updated_at ? $post->updated_at->toDateTimeString() : '');
            $row++;
        }

        return response()->streamDownload(function () use ($spreadsheet) {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Cache-Control' => 'max-age=0',
        ]);
    }

    /**
     * @return array{imported: int, failed: int, errors: array<string>}
     */
    public function import(User $user, UploadedFile $file): array
    {
        $spreadsheet = IOFactory::load($file->getRealPath());
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $imported = 0;
        $failed = 0;
        $errors = [];

        if (count($rows) <= 1) {
            return [
                'imported' => 0,
                'failed' => 0,
                'errors' => ['File Excel kosong atau tidak memiliki baris data.'],
            ];
        }

        // Header detection: check columns (Title/Judul and Content/Konten)
        $header = array_map(fn ($col) => strtolower(trim((string) $col)), $rows[0]);
        $titleIndex = array_search('judul', $header) !== false ? array_search('judul', $header) : array_search('title', $header);
        $contentIndex = array_search('konten', $header) !== false ? array_search('konten', $header) : array_search('content', $header);
        $categoryIndex = array_search('kategori', $header) !== false ? array_search('kategori', $header) : array_search('category', $header);
        $excerptIndex = array_search('excerpt', $header) !== false ? array_search('excerpt', $header) : array_search('ringkasan', $header);

        if ($titleIndex === false || $contentIndex === false) {
            // Fallback to standard columns 0: ID, 1: Penulis, 2: Title, 4: Category, 5: Excerpt, 6: Content
            $titleIndex = 2;
            $categoryIndex = 4;
            $excerptIndex = 5;
            $contentIndex = 6;
        }

        for ($i = 1; $i < count($rows); $i++) {
            $rowNumber = $i + 1;
            $row = $rows[$i];

            $title = isset($row[$titleIndex]) ? trim((string) $row[$titleIndex]) : '';
            $content = isset($row[$contentIndex]) ? trim((string) $row[$contentIndex]) : '';
            $category = isset($row[$categoryIndex]) ? trim((string) $row[$categoryIndex]) : 'Umum';
            $excerpt = isset($row[$excerptIndex]) ? trim((string) $row[$excerptIndex]) : null;

            if (empty($title) || empty($content)) {
                $failed++;
                $errors[] = "Baris {$rowNumber}: Judul dan Konten wajib diisi.";

                continue;
            }

            // Validate category against PostCategory enum
            $validCategories = PostCategory::values();
            if (! in_array($category, $validCategories, true)) {
                $category = 'Umum';
            }

            // Generate unique slug
            $baseSlug = Str::slug($title);
            $slug = $baseSlug;
            $counter = 1;
            while (Post::where('slug', $slug)->exists()) {
                $slug = "{$baseSlug}-{$counter}";
                $counter++;
            }

            Post::create([
                'user_id' => $user->id,
                'title' => $title,
                'slug' => $slug,
                'category' => $category,
                'excerpt' => $excerpt ?: Str::limit(strip_tags($content), 150),
                'content' => $content,
                'cover_image_path' => null,
                'is_published' => false,
                'published_at' => null,
            ]);

            $imported++;
        }

        return [
            'imported' => $imported,
            'failed' => $failed,
            'errors' => $errors,
        ];
    }
}
