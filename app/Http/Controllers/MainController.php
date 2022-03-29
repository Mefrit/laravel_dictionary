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
    function convert($str){
        return iconv("Windows-1251", "UTF-8", $str);
    }
    public function addDictionary(Request $request) {

        $dictionary = new Dictionary();
        $dictionary->name =  $request->input("name_dictionary");
        $dictionary->save();

        $index_english_word = 0;
        $index_russian_word = 1;
        $file = $request->file_dictionary;
     
        if ($request->file('file_dictionary')->isValid()) {
                $row = 1;

                if (($handle = fopen($request->file('file_dictionary')->getRealPath(), "r")) !== FALSE) {
                    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                        $data = array_map(array($this,'convert'), $data);
                        $num = count($data);

                        for ($c=0; $c < $num; $c++) {
                       
                            $exploded_data = explode(";", $data[$c]);
                            var_dump($c);
                          
                            if( $exploded_data[0] =='RUS' || $exploded_data[0] =='ENG' ){
                                if($exploded_data[0] =='RUS' ){
                                      $index_english_word = 1;
                                    $index_russian_word = 0;
                                }
                              
                            } else {
                                var_dump($exploded_data[$index_english_word ],$exploded_data[$index_russian_word]);
                                $dictionary_word = new DictionaryWords();
                                $dictionary_word->id_dictionary = $dictionary->id;
                                $dictionary_word->english_word = $exploded_data[$index_english_word ];
                                $dictionary_word->russian_word = $exploded_data[$index_russian_word];
                                $dictionary_word->save();
                            }

                        }
                        $row++;
                    }
                    fclose($handle);
                }
            // dd($request); //вывод
           
        }
      
      
        return view('home');
    }
    public function loadDictionaries(Request $request){
        return json_encode(["result"=>true, "list"=>[]]);
    }
}
