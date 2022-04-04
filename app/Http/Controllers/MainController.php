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
    function getValidateSettings(){
        return [
            "name_dictionary"=>"required|min:2",
            "file_dictionary"=>"required",
        ];
    }


    function makeNewDictionary($name_dictionary){
        $dictionary = new Dictionary();
        $dictionary->name = $name_dictionary?  $name_dictionary : "Неизвестно";
        return $dictionary;
    }
    function createNewDictionary($name_dictionary){
        $dictionary = $this->makeNewDictionary($name_dictionary);
        $dictionary->save();
        return $dictionary;
    }
    function makeWordItem( $dictionary_id, $english_word,$russian_word){
        $dictionary_word = new DictionaryWords();
        $dictionary_word->id_dictionary = $dictionary_id;
        $dictionary_word->english_word = $english_word;
        $dictionary_word->russian_word = $russian_word;
        return $dictionary_word;
    }
    function saveWordItem($dictionary_id, $english_word, $russian_word){
        $dictionary_word = $this->makeWordItem($dictionary_id, $english_word, $russian_word);
        $dictionary_word->save();
    }


    function converData($data){
        $new_data = clone($data);
        return array_map(array($this, 'convert'), $new_data);
    }
    function getFileData($real_path, $extension){
        $data = [];
        $num = 0;
        if (($handle = fopen($real_path, "r")) !== FALSE && $extension == "csv") {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $result = array_map(array($this, 'convert'), $data);
                $num = count($result);
            }
            fclose($handle);
        }
        return [$result, $num];
    }
    function getWordsPosition($exploded_data){
        $index_english_word = $exploded_data[0] == 'RUS' ?1: 0;
        $index_russian_word = $exploded_data[0] == 'RUS' ?0: 1;
        return [$index_english_word,$index_russian_word];
    }
    function saveWordsfromFile($dictionary, $path_info, $real_path){
        [$data, $num] = $this->getFileData($real_path, $path_info["extension"]);
        [$index_english_word,$index_russian_word] = $this->getWordsposition(explode(";", $data[0]));
        for ($c = 1; $c < $num; $c++) {
            $exploded_data = explode(";", $data[$c]);
            $this->saveWordItem($dictionary->id,$exploded_data[$index_english_word], $exploded_data[$index_russian_word]);
        }
    }

    public function addDictionary(Request $request) {
        $request->validate($this->getValidateSettings());

        if ($request->file('file_dictionary')->isValid()) {
            $dictionary = $this->saveNewDictionary($request->input("name_dictionary"));
            $path_info = pathinfo($request->file('file_dictionary')->getClientOriginalName());
            $real_path = $request->file('file_dictionary')->getRealPath();
            $this->saveWordsfromFile($dictionary, $path_info, $real_path);
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
