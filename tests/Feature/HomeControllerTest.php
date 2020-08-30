<?php

namespace Tests\Feature;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Slider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HomeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex(): void
    {
        //Arrange.
        $education = factory(Education::class)->create();
        $experience = factory(Experience::class)->create(['string_year' => null]);
        $portfolio = factory(Portfolio::class)->create();
        factory(Page::class)->create(['name' => 'home']);
        factory(Slider::class)->create(['name' => 'home']);

        //Act.
        $response = $this->get('/');

        //Assert.
        $response->assertStatus(200);

        //Assert portfolio is visible.
        $response->assertSee($portfolio->name);

        //Assert education is visible.
        $response->assertSee($education->organization);
        $response->assertSee($education->description);

        //Assert experience is visible.
        $response->assertSee($experience->position);
        $response->assertSee($experience->company);
        $response->assertSee($experience->location);
        $response->assertSee($experience->start_year);
        $response->assertSee($experience->end_year);
        //$response->assertSee($experience->string_year);
        $response->assertSee($experience->description);
    }
}
