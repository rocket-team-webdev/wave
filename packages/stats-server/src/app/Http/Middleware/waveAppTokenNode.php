<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class waveAppTokenNode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->headers->get('x-api-token') != env('API_KEY_NODE')) {
            return response()->json('Unauthorized', 401);
        }

        return $next($request);
    }
}
