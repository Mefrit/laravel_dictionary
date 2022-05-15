import React, { useState, useEffect } from 'react';
import AddDictionaryComponent from "./AddDictionary"
import ChoseDictionaryComponent from "./ChoseDictionary"
import WordsChoser from "./WordsChoser";
import { EditDictionary } from "./EditDictionary"
const App = () => {
    const [list_dictionary, setListDicionary] = useState([]);
    const [list_words, setListWords] = useState([]);
    const [mode_dictionary, setModeDictionary] = useState<string>("chose");
    const [id_dictionary, setIdChosenDictionary] = useState(-1);
    useEffect(() => {
    }, [mode_dictionary, list_words]);
    function postJSON(url: any, args: any): any {
        try {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({ ...args }),
            }).then((response) => {
                if (response.status == 401) {
                    return { result: false, message: "Вы не вошли в систему, пожалуйста, авторизуйтесь" }
                } else {
                    return response.json();
                }
            })
                .then((data) => {
                    return data;
                });
        } catch (err: any) {
            alert("Error " + err.toString());
            return null;
        }
    }
    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        postJSON('/dictionary/load', {})
            .then((answer: any) => {
                if (answer.result) {
                    setListDicionary(answer.list)
                }
            });
    }, []);
    const getDictionaryNameById = (list_dictionary: any[], id_dictionary: number) => {
        let name = 'Не найденно';
        list_dictionary.forEach((elem: any) => {
            if (elem.id_dictionary == id_dictionary) {
                name = elem.name;
            }
        })
        return name;
    }
    const choseDictionary = (id_dictionary: any) => {
        postJSON('/dictionary/loadDictionaryWords', { id_dictionary: id_dictionary })
            .then((answer: any) => {
                if (answer.result) {
                    setIdChosenDictionary(id_dictionary)
                    setListWords(answer.list);
                }
            });
    };
    const renderMenu = (mode_dictionary: any) => {
        return <ul className="nav nav-tabs">
            <li className="nav-item" onClick={() => { setModeDictionary("chose") }}>
                <a className={mode_dictionary == "chose" ? "nav-link active" : "nav-link"} aria-current="page" href="#">Выбрать словарь</a>
            </li>
            <li className="nav-item" onClick={() => { setModeDictionary("add") }}>
                <a className={mode_dictionary == "add" ? "nav-link active" : "nav-link"} href="#">Добавить словарь</a>
            </li>
            <li className="nav-item" onClick={() => { setModeDictionary("edit") }}>
                <a className={mode_dictionary == "add" ? "nav-link active" : "nav-link"} href="#">Изменить словарь</a>
            </li>
        </ul>
    }
    const createWordObject = (russian_word: any, english_word: any, id_dictionary: any) => {
        return {
            english_word: english_word,
            russian_word: russian_word,
            id_dictionary: id_dictionary
        }
    }
    const addWord2ListEvent = (list_dictionary: any[], word_obj: any) => {
        var list_dictionary_copy = list_dictionary.slice();
        list_dictionary_copy.push(word_obj);
        return list_dictionary_copy;
    }
    const addId2Wordobj = (word_obj: any, id_word: number) => {
        return { ...word_obj, id: id_word }
    }
    const addWord2List = (russian_word: string, english_word: string) => {
        setModeDictionary("chose")
        const word_obj = createWordObject(russian_word, english_word, id_dictionary)
        postJSON('/dictionary/addWord', { word_obj: word_obj })
            .then((answer: any) => {
                if (answer.result) {
                    const word_obj_with_id = addId2Wordobj(word_obj, answer.id_word)
                    const new_word_list: any = addWord2ListEvent(list_words, word_obj_with_id)
                    setListWords(new_word_list);
                }
            });
    }
    return (
        <div className="container d-flex mt-5 p-2 justify-content-center flex-column ">
            {renderMenu(mode_dictionary)}
            <div style={{ height: "550px" }} className="border border-top-0">
                {mode_dictionary == "add" ?
                    <AddDictionaryComponent /> :
                    ""}

                {mode_dictionary == "chose" ?
                    <div className='d-flex flex-row p-2 h-100 mt-3 '>
                        <ChoseDictionaryComponent chosen_id_dictionary={id_dictionary} list_dictionary={list_dictionary} choseDictionary={choseDictionary} setModeDictionary={setModeDictionary} />
                        <WordsChoser list_words={list_words} />
                    </div> :
                    ""}
                {mode_dictionary == "edit" ?
                    <div className='d-flex flex-row p-2 h-100 mt-3 '>
                        <ChoseDictionaryComponent chosen_id_dictionary={id_dictionary} list_dictionary={list_dictionary} choseDictionary={choseDictionary} setModeDictionary={setModeDictionary} />
                        <EditDictionary id_dictionary={id_dictionary} addWord2List={addWord2List} name_dictionary={getDictionaryNameById(list_dictionary, id_dictionary)} />
                    </div> :
                    ""}

            </div>
        </div >
    );
};

export default App;