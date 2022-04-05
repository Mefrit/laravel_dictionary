import React, { useState, useEffect } from 'react';
import AddDictionaryComponent from "./AddDictionary"
import ChoseDictionaryComponent from "./ChoseDictionary"
import WordsChoser from "./WordsChoser";

const App = () => {
    const [list_dictionary, setListDicionary] = useState([]);
    const [list_words, setListWords] = useState([]);
    const [mode_dictionary, setModeDictionary] = useState<string>("chose");

    useEffect(() => {

        fetch('/load_dictionary', {
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
    const renderMenu = (mode_dictionary: any) => {
        return <ul className="nav nav-tabs">
            <li className="nav-item" onClick={() => { setModeDictionary("chose") }}>
                <a className={mode_dictionary == "chose" ? "nav-link active" : "nav-link"} aria-current="page" href="#">Выбрать словарь</a>
            </li>
            <li className="nav-item" onClick={() => { setModeDictionary("add") }}>
                <a className={mode_dictionary == "add" ? "nav-link active" : "nav-link"} href="#">Добавить словарь</a>
            </li>
        </ul>
    }
    return (
        <div className="container d-flex mt-5 p-2 justify-content-center flex-column ">
            {renderMenu(mode_dictionary)}
            <div style={{ height: "550px" }} className="border border-top-0">
                {mode_dictionary == "add" ?
                    <AddDictionaryComponent /> :
                    <div className='d-flex flex-row p-2 h-100 mt-3 '>
                        <ChoseDictionaryComponent list_dictionary={list_dictionary} choseDictionary={choseDictionary} setModeDictionary={setModeDictionary} />
                        <WordsChoser list_words={list_words} />
                    </div>}
            </div>
        </div >
    );
};

export default App;