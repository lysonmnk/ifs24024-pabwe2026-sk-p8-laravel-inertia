<?php

namespace Tests\Unit;

use App\Features\Post\Models\Post;
use App\Features\Post\Policies\PostPolicy;
use App\Models\User;
use PHPUnit\Framework\TestCase;

class PostPolicyTest extends TestCase
{
    public function test_post_policy_methods(): void
    {
        $policy = new PostPolicy;

        $admin = new User;
        $admin->id = 1;
        $admin->role = 'Admin';

        $member = new User;
        $member->id = 2;
        $member->role = 'Member';

        $otherMember = new User;
        $otherMember->id = 3;
        $otherMember->role = 'Member';

        $post = new Post;
        $post->user_id = 2;

        $this->assertTrue($policy->viewAny($member));
        $this->assertTrue($policy->create($member));
        $this->assertFalse($policy->create($admin));

        // View policy
        $this->assertTrue($policy->view($admin, $post));
        $this->assertTrue($policy->view($member, $post));
        $this->assertFalse($policy->view($otherMember, $post));

        // Update policy
        $this->assertTrue($policy->update($member, $post));
        $this->assertFalse($policy->update($otherMember, $post));

        // Delete policy
        $this->assertTrue($policy->delete($member, $post));
        $this->assertFalse($policy->delete($otherMember, $post));
    }
}

