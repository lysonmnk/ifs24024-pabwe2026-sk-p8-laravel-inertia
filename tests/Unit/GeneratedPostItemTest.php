<?php

namespace Tests\Unit;

use App\Features\Ai\DTO\GeneratedPostItem;
use PHPUnit\Framework\TestCase;

class GeneratedPostItemTest extends TestCase
{
    public function test_to_array_returns_correct_associative_array(): void
    {
        $dto = new GeneratedPostItem(
            title: 'Judul Uji',
            category: 'Teknologi',
            excerpt: 'Ringkasan DTO',
            content: '# Konten DTO',
        );

        $array = $dto->toArray();

        $this->assertSame([
            'title' => 'Judul Uji',
            'category' => 'Teknologi',
            'excerpt' => 'Ringkasan DTO',
            'content' => '# Konten DTO',
        ], $array);
    }
}

