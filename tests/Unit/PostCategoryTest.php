<?php

namespace Tests\Unit;

use App\Features\Post\Enums\PostCategory;
use PHPUnit\Framework\TestCase;

class PostCategoryTest extends TestCase
{
    public function test_post_category_cases_and_values(): void
    {
        $values = PostCategory::values();

        $this->assertContains('Teknologi', $values);
        $this->assertContains('Pendidikan', $values);
        $this->assertContains('Gaya Hidup', $values);
        $this->assertContains('Bisnis', $values);
        $this->assertContains('Opini', $values);
        $this->assertContains('Umum', $values);
        $this->assertCount(6, $values);
    }
}

