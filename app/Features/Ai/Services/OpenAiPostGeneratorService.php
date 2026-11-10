<?php

namespace App\Features\Ai\Services;

use App\Features\Ai\Contracts\AiClientInterface;
use App\Features\Ai\DTO\GeneratedPostItem;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAiPostGeneratorService implements AiClientInterface
{
    /**
     * @return array<GeneratedPostItem>
     */
    public function generateArticles(string $topic, string $category, int $count = 1): array
    {
        $apiKey = config('services.openai.api_key', env('OPENAI_API_KEY'));

        if (! $apiKey || $apiKey === 'isi-dengan-kunci-api-anda') {
            // Simulated generator if API key is not configured yet
            return $this->generateFallback($topic, $category, $count);
        }

        try {
            $prompt = "Anda adalah asisten penulisan artikel profesional. Buatkan {$count} artikel draf lengkap berformat Markdown dengan topik '{$topic}' dan kategori '{$category}'. "
                ."Formatkan respons HANYA dalam JSON array tanpa markdown code block, dengan struktur: [{\"title\": \"...\", \"category\": \"{$category}\", \"excerpt\": \"...\", \"content\": \"...\"}].";

            $response = Http::withToken($apiKey)
                ->timeout(60)
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-4o-mini',
                    'messages' => [
                        ['role' => 'system', 'content' => 'Kembalikan respons valid JSON array saja.'],
                        ['role' => 'user', 'content' => $prompt],
                    ],
                    'temperature' => 0.7,
                ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content');
                // Clean potential markdown wrapper
                $cleanedJson = preg_replace('/^```(?:json)?\s*|\s*```$/i', '', trim($content));
                $items = json_decode($cleanedJson, true);

                if (is_array($items)) {
                    $results = [];
                    foreach ($items as $item) {
                        $results[] = new GeneratedPostItem(
                            title: $item['title'] ?? "Artikel: {$topic}",
                            category: $category,
                            excerpt: $item['excerpt'] ?? "Ringkasan draf artikel mengenai {$topic}.",
                            content: $item['content'] ?? "# {$topic}\n\nKonten draf...",
                        );
                    }

                    return $results;
                }
            }
        } catch (\Throwable $e) {
            Log::error('OpenAI Generation Error: '.$e->getMessage());
        }

        return $this->generateFallback($topic, $category, $count);
    }

    /**
     * @return array<GeneratedPostItem>
     */
    protected function generateFallback(string $topic, string $category, int $count): array
    {
        $items = [];
        for ($i = 1; $i <= $count; $i++) {
            $suffix = $count > 1 ? " Bagian {$i}" : '';
            $title = "Mendalami {$topic}{$suffix}";
            $excerpt = "Eksplorasi mendalam dan analisis praktis mengenai {$topic} dalam konteks perkembangan {$category}.";
            $content = "# {$title}\n\n"
                ."Dalam era perkembangan digital modern, topik mengenai **{$topic}** memegang peranan krusial dalam domain {$category}.\n\n"
                ."## 1. Latar Belakang & Urgensi\n"
                ."Memahami dinamika {$topic} membuka peluang inovasi dan pertumbuhan baru bagi praktisi maupun akademisi.\n\n"
                ."## 2. Implementasi & Studi Kasus\n"
                ."Penerapan terstruktur dan pemahaman mendasar membantu meminimalisasi risiko sekaligus memaksimalkan dampak positif.\n\n"
                ."## 3. Kesimpulan\n"
                ."Melalui pendekatan yang tepat, penguasaan atas {$topic} akan memberikan keunggulan kompetitif jangka panjang.";

            $items[] = new GeneratedPostItem(
                title: $title,
                category: $category,
                excerpt: $excerpt,
                content: $content,
            );
        }

        return $items;
    }
}

