import React, { useState, useEffect } from 'react';
import AddDictionaryComponent from "./AddDictionary"
import ChoseDictionaryComponent from "./ChoseDictionary"
export interface IUser {
    name: string;
    age: number;
}
const App = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [list_dictionary, setListDicionary] = useState<[]>([]);
    const [mode_dictionary, setModeDictionary] = useState<string>("add");
    const [mode_translate_word, setModeTranslateWord] = useState<string>("english");
    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount", mode_dictionary, mode_translate_word)
        let response = fetch('/load_dictionary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({})
        }).then(answer => {
            console.log("answer")
        });
    }, [mode_dictionary, mode_translate_word]);
    function postJSON(url: any, args: any) {

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
            alert("Error11 " + err.toString());
            return null;
        }
    }
    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount", mode_dictionary, mode_translate_word)
        postJSON('/dictionary/load', {})
            .then((answer: any) => {
                console.log("answer", answer)
            });
    }, []);
    return (
        <div className="container d-flex p-2 justify-content-center flex-column">

            <ul className="nav nav-tabs">
                <li className="nav-item" onClick={() => { setModeDictionary("chose") }}>
                    <a className={mode_dictionary == "chose" ? "nav-link active" : "nav-link"} aria-current="page" href="#">Выбрать словарь</a>
                </li>
                <li className="nav-item" onClick={() => { setModeDictionary("add") }}>
                    <a className={mode_dictionary == "add" ? "nav-link active" : "nav-link"} href="#">Добавить словарь</a>
                </li>
            </ul>


            {mode_dictionary == "add" ? <AddDictionaryComponent /> : <ChoseDictionaryComponent list_dicionary={list_dictionary} setModeDictionary={setModeDictionary} />}

            <div className="form-check form-switch col-1">
                <label className="form-check-label" >
                    <input className="form-check-input" onChange={(ev) => { setModeTranslateWord(ev.target.checked ? "english" : "russian") }} type="checkbox" />Rus/Eng</label>
            </div>

            <div>
                <p>word1</p>
                <p>*****</p>
            </div>
            <div>
                <button>Показать перевод</button>
                <button>Следующее слово</button>
            </div>
            <p>Текущий словарь</p>
        </div>
    );
};

export default App;