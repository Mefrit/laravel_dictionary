<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
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
    function convert($str) {
        return iconv("Windows-1251", "UTF-8", $str);
    }
    public function addDictionary(Request $request) {
        $request->validate([
            "name_dictionary"=>"required|min:2",
            "file_dictionary"=>"required",
        ]);

        if ($request->file('file_dictionary')->isValid()) {
               $dictionary = new Dictionary();
                $dictionary->name =  $request->input("name_dictionary") ?  $request->input("name_dictionary") : "Неизвестно";
                $dictionary->save();
                $index_english_word = 0;
                $index_russian_word = 1;
              
            $row = 1;
            $path_info = pathinfo($request->file('file_dictionary')->getClientOriginalName());
            if (($handle = fopen($request->file('file_dictionary')->getRealPath(), "r")) !== FALSE && $path_info["extension"] == "csv") {
                while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                    $data = array_map(array($this, 'convert'), $data);
                    $num = count($data);
                    for ($c = 0; $c < $num; $c++) {
                        $exploded_data = explode(";", $data[$c]);
                        if ($exploded_data[0] == 'RUS' || $exploded_data[0] == 'ENG') {
                            if ($exploded_data[0] == 'RUS') {
                                $index_english_word = 1;
                                $index_russian_word = 0;
                            }
                        } else {
                   
                            $dictionary_word = new DictionaryWords();
                            $dictionary_word->id_dictionary = $dictionary->id;
                            $dictionary_word->english_word = $exploded_data[$index_english_word];
                            $dictionary_word->russian_word = $exploded_data[$index_russian_word];
                            $dictionary_word->save();
                        }
                    }
                    $row++;
                }
                fclose($handle);
            }
        }
        return redirect('/');;
    }
    public function loadDictionaries(Request $request) {
        $dictionaries = DB::table('dictionaries')->get();
        return json_encode(["result" => true, "list" => $dictionaries]);
    }
    public function loadDictionaryWords(Request $request){
        $id_dictionary = $request->input("id_dictionary");
        $listwords = DB::table('dictionary_words')->where('id_dictionary', '=',  $id_dictionary)->get();
        return json_encode(["result" => true, "list" =>  $listwords]);
    }
}
