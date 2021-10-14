<?php

namespace App\Http\Controllers;

use App\Models\Playback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Validator;

class PlaybackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = DB::table("playbacks")
            ->select('trackId', DB::raw('count(*) as total'))
            ->groupBy("trackId")
            ->get();
        $response = [
            'success' => true,
            'data' => $result,
        ];

        return response()->json($response, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $input["ip"] = $request->ip();
        $geoPluginData = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip=' . $request->ip()));
        $input["latitude"] = $geoPluginData["geoplugin_latitude"];
        $input["longitude"] = $geoPluginData["geoplugin_longitude"];
        $playback = Playback::create($input);

        return response()->json([
            "success" => true,
            "message" => "Playback stored successfully.",
            "data" => $playback
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Playback  $playback
     * @return \Illuminate\Http\Response
     */
    public function show(Playback $playback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Playback  $playback
     * @return \Illuminate\Http\Response
     */
    public function edit(Playback $playback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Playback  $playback
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Playback $playback)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Playback  $playback
     * @return \Illuminate\Http\Response
     */
    public function destroy(Playback $playback)
    {
        //
    }
}
