<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChatEvent;

class ChatController extends Controller
{
    public function SendMessage(Request $request)
    {
        try {
            $message = $request->input('message');
            $sessionId = $request->input('sessionId');

            $event = new ChatEvent($message, $sessionId);

            event($event);

            return response()->json(['message' => 'Mesaj başarıyla gönderildi.']);
        } catch (Exception $e) {
            // Hata durumunda buraya düşer
            return response()->json(['error' => 'Mesaj gönderilirken bir hata oluştu: ' . $e->getMessage()], 500);
        }
    }
}