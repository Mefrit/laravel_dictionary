import React, { useState, useEffect } from 'react';
import AddDictionaryComponent from "./AddDictionary"
import ChoseDictionaryComponent from "./ChoseDictionary"
import WordsChoser from "./WordsChoser";
export interface IUser {
    name: string;
    age: number;
}
const App = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [list_dictionary, setListDicionary] = useState([]);
    const [list_words, setListWords] = useState([]);
    const [mode_dictionary, setModeDictionary] = useState<string>("chose");

    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount11111111", mode_dictionary, list_words)
        let response = fetch('/load_dictionary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({})
        }).then((answer: any) => {
            if (answer.result) {
                setListDicionary(answer.list)
            }
        });
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
            alert("Error11 " + err.toString());
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
    const choseDictionary = (id_dictionary: any) => {
        postJSON('/dictionary/loadDictionaryWords', { id_dictionary: id_dictionary })
            .then((answer: any) => {
                console.log("/dictionary/loadDictionaryWords", answer);
                if (answer.result) {
                    setListWords(answer.list);
                }
            });
    };

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


            {mode_dictionary == "add" ? <AddDictionaryComponent /> : <ChoseDictionaryComponent list_dictionary={list_dictionary} choseDictionary={choseDictionary} setModeDictionary={setModeDictionary} />}
            <WordsChoser list_words={list_words} />



        </div>
    );
};

export default App;