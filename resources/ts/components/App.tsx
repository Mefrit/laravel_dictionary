import React, { useState, useEffect } from 'react';
export interface IUser {
    name: string;
    age: number;
}
const App = (props) => {
    const [search_value, setSearchValue] = useState("");
    const [search_insert_value, setInsertValue] = useState("");
    const [list_words, setListWords] = useState([]);
    const [mode_dictionary, setModeTranslateWord] = useState<string>("russian");
    const [list_title, setListTitle] = useState("Случайный набор слов");

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
            alert("Error! " + err.toString());
            return null;
        }
    }

    function getJSON(url: string): any {
        try {
            return fetch(url, {

                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then((response) => {
                if (response.status == 401) {
                    return { result: false, message: "Произошла непредвиденная ошибка" }
                } else {
                    return response.json();
                }
            })
                .then((data) => {
                    return data;
                });
        } catch (err: any) {
            alert("Error! " + err.toString());
            return null;
        }
    }
    function GetRandomWords(){
        setTimeout(() => {
            getJSON('/GetRandomWords')
            .then((answer: any) => {
                if (answer.result) {
                    setListWords(answer.list)
                }
            });      
        }, 700);
    }
    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        GetRandomWords()
    }, []);

    const addWordToDictionary = () => {
        // Обновляем название докуммента, используя API браузера
        postJSON('/addWordToDictionary', 
        {
            rus_value: search_value,
            chinese_value: search_insert_value 
        })
            .then((answer: any) => {
                if (answer.result) {
                    alert('Слово добавлено')
                }
            });
    };

    const setFindTranslate = () => {
        postJSON('/FindTranslate', {search_value: search_value, mode: mode_dictionary})
            .then((answer: any) => {
                
                if (answer.result) {
                    setListWords(answer.list);
                    setListTitle("Найденные слова:");
                }
            });
    };
    function renderWordList(){
        let list_words_elements = list_words.map(elem=>{
            return <li className='d-flex d-flex justify-content-between list-group-item '>
                <span>{elem.rus_value}</span>  <span>{elem.chinese_value}</span> 
            </li>
        })
        return <ul className="list-group list-group-flush" >
            {list_words_elements}
        </ul>
    }
    return (
        <div className="container d-flex mt-5 p-3 w-100 justify-content-center flex-column ">
            <div className='w-100 mt-1  container' style={{'max-width': '600px'}}>
                <div class="row w-100 d=flex">
                    <div className="form-check form-switch col-2 pt-2 pl-6 mt-1 " style={{'min-width': '70px'}}>
                        <label  className="form-check-label" >
                            <input className="form-check-input col-form-label-lg p-1" onChange={(ev) => {
                                  setModeTranslateWord(ev.target.checked ? "chinese" : "russian") }
                            } type="checkbox" />Rus/Ch</label>
                    </div>
                    <input 
                        type="text"
                        className="form-control m-2 col "
                        style={{'max-width': '400px'}}
                        placeholder={mode_dictionary == 'russian'?'Введите слово':'输入单词'}
                        value={search_value} 
                        onChange={(ev)=>{setSearchValue(ev.target.value)}}
                    />  
                  
                    {props.mode == 'admin'?  
                            <button 
                                className='btn btn-small btn-primary  m-1 col'
                                onClick={() => { addWordToDictionary() }}
                            >
                                Добавить слово в словарь
                            </button>     
                        : '' 
                    }
                    {props.mode == 'admin'?  
                        <input 
                            type="text"
                            placeholder={props.mode == 'admin' && mode_dictionary == 'russian'? '输入单词': 'Введите слово'}
                            className={ 'form-control m-1 col'}
                            value={search_insert_value} 
                            onChange={(ev)=>{setInsertValue(ev.target.value)}}
                        />  
                        : '' 
                    }
                </div>
                <div class='row d-flex justify-content-center mt-4'>
                    <button className='btn  btn-primary m-1 w-50 col' style={{'max-width': '300px'}} onClick={() => { setFindTranslate() }}>Перевод</button>
                </div>
                <div className='mt-4 row w-100 d-flex justify-content-center'  style={{'max-width': '500px'}}>
                    <h4>{list_title}</h4>
                    {renderWordList()}
                </div>
            </div>
        </div >
    );
};

export default App;