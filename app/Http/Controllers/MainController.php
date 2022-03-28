<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dictionary;
use App\Models\DictionaryWords;

class MainController extends Controller {
    //
    public function home() {
        return view('home');
    }
    public function about() {
        return view('about');
    }
    public function rewiew() {
        return view('rewiew');
    }
    public function rewiew_check(Request $request) {

        $dictionary = new Dictionary();
        $dictionary->name = "test1";
        $dictionary->save();

        $dictionary_word = new DictionaryWords();
        $dictionary_word->id_dictionary = $dictionary->id;
        $dictionary_word->english_word = "ENGLISH";
        $dictionary_word->russian_word = "Английский";
        $dictionary_word->save();
        dd($request); //вывод
        return "rewiew check";
    }
}
