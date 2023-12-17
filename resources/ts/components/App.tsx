import React, { useState, useEffect } from 'react';
export interface IUser {
    name: string;
    age: number;
}
const App = (props) => {
    const [search_value, setSearchValue] = useState("");
    const [search_insert_value, setInsertValue] = useState("");
    const [list_words, setListWords] = useState([]);
    const [edit_word_id, setEditId] = useState(-1);
    const [mode_dictionary, setModeTranslateWord] = useState<string>("russian");
    const [mode_search, setModeWordSearch] = useState<string>("translate");
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
        if (search_value.trim() == '' || search_insert_value.trim() =='') {
            alert('Введите значение перевода')
        }
        postJSON('/addWordToDictionary', 
        {
            rus_value: mode_dictionary == 'russian'? search_value: search_insert_value,
            chinese_value: mode_dictionary == 'russian'? search_insert_value: search_value
        })
            .then((answer: any) => {
                if (answer.result) {
                    alert('Слово добавлено')
                }
            });
    };

    const changeWord = (edit_word_id) => {
        // Обновляем название докуммента, используя API браузера
        
        postJSON('/editWord', 
        {
            rus_value: mode_dictionary == 'russian'? search_value: search_insert_value,
            chinese_value: mode_dictionary == 'russian'? search_insert_value: search_value,
            word_id: edit_word_id
        })
            .then((answer: any) => {
                if (answer.result) {
                    alert('Слово изменено')
                }
            });
    };

    const setFindTranslate = () => {
        if (search_value == '') {
            alert('Введите значение перевода')
        }
        postJSON('/FindTranslate', {search_value: search_value, mode: mode_dictionary})
            .then((answer: any) => {
                
                if (answer.result) {
                    setListWords(answer.list);
                    setListTitle("Найденные слова:");
                }
            });
    };
    const setToEditWord = (id)=>{
        let new_word_list = list_words.filter(elem=> elem.id == id)
        console.log(new_word_list, new_word_list[0].chinese_value)
        if (new_word_list.length > 0) {
            setSearchValue(
                mode_dictionary == 'russian'? new_word_list[0].rus_value: new_word_list[0].chinese_value
            )
            setInsertValue(
                mode_dictionary == 'russian'?  new_word_list[0].chinese_value: new_word_list[0].rus_value
            )
            setModeWordSearch('edit')
            setEditId(id)
        }
    }
    const deleteWord = (id)=>{
        postJSON('/Delete', {word_id: id})
        .then((answer: any) => {
            let new_word_list = list_words.filter(elem=> elem.id != answer.word.id)
            setListWords(new_word_list);
        });
    }
    function renderWordList(){
        let list_words_elements = list_words.map(elem=>{
            return <li key={elem.id} className='d-flex d-flex justify-content-between list-group-item '>
                <span>{elem.rus_value}</span>  
                <div>
                    <span>{elem.chinese_value}</span> 
          
                        <button 
                            class="btn btn-outline-secondary btn-sm m-2 mb-0 mt-0"
                            value={elem.id} 
                            onClick={
                                (ev)=>{setToEditWord(ev.currentTarget.value)}
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" maxWidth="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </button>
              
                        <button 
                            class="btn btn-outline-secondary btn-sm  mb-0 mt-0"
                            value={elem.id} 
                            onClick={
                                (ev)=>{deleteWord(ev.currentTarget.value)}
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" maxWidth="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                   
                </div>
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
                                onClick={() => { mode_search == 'translate'? addWordToDictionary(): changeWord(edit_word_id) }}
                            >
                               {mode_search == 'translate'?' Добавить слово в словарь': 'Сохранить значения'}
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