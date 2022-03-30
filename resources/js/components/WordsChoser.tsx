import React, { useState, useEffect } from 'react';

const WordsChoser = (props: any) => {
    const [show_translate, setShowTranslate] = useState(false);

    const [index_word, setIndexWord] = useState(0);
    const [mode_translate_word, setModeTranslateWord] = useState<string>("russian");
    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount", props)
    }, [index_word]);
    const renderInterface = (index_word: number, list_words: any) => {
        // return list_dictionary.map((elem: any) => {
        //     return <li onClick={() => { props.choseDictionary(elem.id) }
        //     }>{<input type="button" value={elem.name} className="btn btn-secondary rounded-1" />}</li>
        // })
        return <div>
            <div className="form-check form-switch col-1">
                <label className="form-check-label" >
                    <input className="form-check-input" onChange={(ev) => { setShowTranslate(false); setModeTranslateWord(ev.target.checked ? "english" : "russian") }} type="checkbox" />Rus/Eng</label>
            </div>
            <div className='d-flex flex-column p-1 '>
                <input type="button" disabled value={mode_translate_word == 'english' ? list_words[index_word].english_word : list_words[index_word].russian_word} className="btn btn-primary disabled" />
                <input type={show_translate ? "button" : "password"} disabled value={mode_translate_word == 'english' ? list_words[index_word].russian_word : list_words[index_word].english_word} className="btn btn-primary disabled" />
            </div>

            <div className='d-flex'>
                <button onClick={() => { setShowTranslate(false); setIndexWord(index_word > 0 ? index_word - 1 : props.list_words.length - 1) }}>Назад</button>
                <button onClick={() => { setShowTranslate(!show_translate) }}>{show_translate ? "Скрыть перевод" : "Показать перевод"}</button>
                <button onClick={() => { setShowTranslate(false); setIndexWord(index_word < props.list_words.length - 1 ? index_word + 1 : 0) }}>Вперед</button>
            </div>

        </div>
    }

    return (
        // justify-content-around
        <div className=" col-5 d-flex ">
            {/* <ul>{renderlistDictionary(props.list_dictionary)}</ul> */}

            {props.list_words.length == 0 ? <h5>Список слов пуст. Выберите словарь</h5> : renderInterface(index_word, props.list_words)}
        </div>

    );
};

export default WordsChoser;